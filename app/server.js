import {belongsTo, createServer, hasMany, Model, RestSerializer,} from "miragejs"

export default function () {
    createServer({

            models: {
                assetModel: Model.extend({
                    modelPositions: hasMany(),
                }),
                modelPosition: Model.extend({
                    assetModel: belongsTo(),
                })
            },
            serializers: {
                assetModel: RestSerializer.extend({
                    include: ["modelPositions"],
                }),
            },
            routes() {
                this.namespace = "api"

                this.get("/assetModels", (schema, request) => {
                    return schema.assetModels.all()
                })
                this.post("/assetModels", (schema, request) => {
                    return schema.assetModels.create()
                })
                this.get("/assetModels/:id", (schema, request) => {
                    let assetModelId = request.params.id
                    return schema.assetModels.find(assetModelId)
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
                let usa_model = server.create("assetModel", {
                    label: "USA",
                    keywords: ["USA"],
                    allocation: "null",
                    description: "Strategy for the USA",
                    is_public: "false",
                    user_id: "100001",

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