import {belongsTo, createServer, hasMany, Model, RestSerializer,} from "miragejs"

export default function () {
    createServer({

            models: {
                user: Model.extend({
                   assetModels: hasMany(),
                }),
                assetModel: Model.extend({
                    modelPositions: hasMany(),
                    user: belongsTo(),
                }),
                modelPosition: Model.extend({
                    assetModel: belongsTo(),
                })
            },
            serializers: {
                assetModel: RestSerializer.extend({
                    include: ["modelPositions"],
                }),
                user: RestSerializer.extend({
                    include: ["assetModels"]
                })
            },
            routes() {
                this.namespace = "api"
                this.post("/user/assetModels/:id", (schema, request) => {
                    schema.assetModels.create({userId: request.params.id, label: "Name Me", description: "Describe me"})
                    return schema.assetModels.all()
                })

                this.get("/assetModels", (schema, request) => {
                    return schema.users.all()
                })
                this.post("/assetModels", (schema, request) => {
                    schema.assetModels.create()
                    return schema.assetModels.all()
                })
                this.get("/assetModels/:id", (schema, request) => {
                    let assetModelId = request.params.id
                    return schema.assetModels.find(assetModelId)
                })
                this.post("/assetModels/:id", (schema, request) => {
                    let assetModel = schema.assetModels.find(request.params.id)
                    assetModel.update({ label: request.requestBody['name']})
                    return assetModel
                })
                this.post("/assetModels/:id/modelPositions", (schema, request) => {
                    let assetModelId = request.params.id

                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            schema.modelPositions.find(item.id).destroy();
                            return
                        }

                        item.assetModelId = assetModelId
                        schema.modelPositions.create(item)

                    })
                    return schema.assetModels.find(assetModelId)
                })
            },
            seeds(server) {
                let user_alpha = server.create("user", {
                    label: "Jon Galt",
                })
                let usa_model = server.create("assetModel", {
                    label: "USA",
                    keywords: ["USA"],
                    allocation: "null",
                    description: "Strategy for the USA",
                    is_public: "false",
                    user: user_alpha,
                })
                server.create("modelPosition", {
                        assetModel: usa_model,
                        symbol: "AGG",
                        weight: 0.2,
                        id: 1
                    }
                )
            },
        }
    )
}