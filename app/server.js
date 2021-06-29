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
                }),
                portfolio: Model.extend({
                    accounts: hasMany()
                }),
                account: Model.extend({
                    accountPositions: hasMany(),
                    portfolio: belongsTo()
                }),
                accountPosition: Model.extend({
                    account: belongsTo()
                }),
            },
            serializers: {
                application: RestSerializer,
                assetModel: RestSerializer.extend({
                    include: ["modelPositions"],
                }),
                user: RestSerializer.extend({
                    include: ["assetModels"]
                }),
                portfolio: RestSerializer.extend( {
                    include: ["accounts"] }
                ),
                account: RestSerializer.extend({
                    include: ["accountPositions"]
                })
            },
            routes() {
                this.namespace = "api"

                this.get("/assetModels", (schema, request) => {
                    return schema.users.all()
                })
                this.get("/assetModels/:id", (schema, request) => {
                    let assetModelId = request.params.id
                    return schema.assetModels.find(assetModelId)
                })
                this.post("/assetModels", function (schema, request) {
                    let user = schema.users.findBy({label: "Jon Galt"})
                    return schema.assetModels.create({user: user, label: "Name Me"})
                })
                this.post("/assetModels/:id", (schema, request) => {
                    let assetModel = schema.assetModels.find(request.params.id)
                    assetModel.update({label: request.requestBody['name']})
                    return assetModel
                })
                this.del("/assetModels/:id")
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

                //Portfolio routes
                this.resource("portfolios", { except: ["update"] })
                this.post("/portfolios/:id", (schema, request) => {
                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            schema.accounts.find(item.id).update({portfolio: null})
                        }
                    })
                    return
                })


                //Account routes
                this.resource("accounts")
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
                    }
                )
                let index_portfolio = server.create("portfolio", {label: "Index Portfolio"})
                let robinHeed = server.create("account", {portfolio: index_portfolio, label: "Robinheed"})
                server.create("accountPosition", {account: robinHeed, symbol: "AGG", shares: 10})
            },
        }
    )
}