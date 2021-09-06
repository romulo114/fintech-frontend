import {belongsTo, createServer, hasMany, Model, RestSerializer,} from "miragejs"

export default function () {
    createServer({
            models: {
                user: Model.extend({
                    assetModels: hasMany(),
                }),
                assetModel: Model.extend({
                    modelPositions: hasMany(),
                    portfolios: hasMany(),
                    user: belongsTo(),
                }),
                modelPosition: Model.extend({
                    assetModel: belongsTo(),
                }),
                portfolio: Model.extend({
                    accounts: hasMany(),
                    trade: belongsTo(),
                    assetModel: belongsTo()
                }),
                account: Model.extend({
                    accountPositions: hasMany(),
                    portfolio: belongsTo()
                }),
                accountPosition: Model.extend({
                    account: belongsTo()
                }),
                trade: Model.extend({
                    portfolios: hasMany()
                }),
            },
            serializers: {
                application: RestSerializer,
                assetModel: RestSerializer.extend({
                    include: ["modelPositions", "portfolios"],
                }),
                user: RestSerializer.extend({
                    include: ["assetModels"]
                }),
                portfolio: RestSerializer.extend({
                        include: ["accounts", "assetModels"]
                    }
                ),
                account: RestSerializer.extend({
                    include: ["accountPositions"]
                }),
                trade: RestSerializer.extend({
                        include: ["portfolios"]
                    }
                )
            },
            routes() {
                this.namespace = "api"
                this.post("/users/login", (schema) => {
                    // log in for 24 hours
                    let now = new Date()
                    let cookieExpiration = new Date(now.getTime() + 24 * 3600 * 1000)
                    document.cookie = `remember_me=cookie-content-here; domain=.dev-domain; path=/; expires=${cookieExpiration.toUTCString()};`

                    return schema.users.find(1)
                })

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
                this.resource("portfolios", {except: ["index", "update"]})
                this.post("/portfolios/:id", (schema, request) => {
                    return schema.portfolios.find(request.params.id).update({label: request.requestBody.name})
                })
                this.get("/portfolios", (schema, request) => {
                    if ('tradeId' in request.queryParams) {
                        if ('not' in request.queryParams) {
                            return schema.portfolios.where(portfolio => portfolio.tradeId != request.queryParams.tradeId)
                        }
                        return schema.portfolios.where(portfolio => portfolio.tradeId == request.queryParams.tradeId)
                    } else {
                        return schema.portfolios.all()
                    }

                })
                this.post("/portfolios/unassign/:id", (schema, request) => {
                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            let account = schema.accounts.find(item.id)
                            schema.accounts.find(item.id).update({portfolioId: null})
                        }
                    })
                    return
                })
                this.post("/portfolios/assign/:id", (schema, request) => {
                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            let account = schema.portfolios.find(item.id)
                            schema.portfolios.find(item.id).update({tradeId: request.params.id})
                        }
                    })
                    return
                })
                this.post("/portfolios/assignModel", (schema, request) => {
                    let portfolio = schema.portfolios.find(request.requestBody.portfolioId).update({
                        assetModelId: request.requestBody.modelId} )
                })


                //Account routes
                this.resource("accounts", {except: ["index", "update"]})
                this.post("/accounts/:id", (schema, request) => {
                    return schema.accounts.find(request.params.id).update({label: request.requestBody.name})
                })
                this.get("/accounts", (schema, request) => {
                    if ('portfolioId' in request.queryParams) {
                        if ('not' in request.queryParams) {
                            return schema.accounts.where(account => account.portfolioId != request.queryParams.portfolioId)
                        }
                        return schema.accounts.where(account => account.portfolioId == request.queryParams.portfolioId)
                    } else {
                        return schema.accounts.all()
                    }

                })
                this.post("/accounts/assign/:id", (schema, request) => {

                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            let account = schema.accounts.find(item.id)
                            schema.accounts.find(item.id).update({portfolioId: request.params.id})
                        }
                    })

                    return
                })

                this.post("/accounts/:id/positions", (schema, request) => {
                    let account = schema.accounts.find(request.params.id)

                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            schema.accountPositions.find(item.id).destroy();
                            return
                        }

                        item.account = account
                        schema.accountPositions.create(item)

                    })
                    return schema.accounts.find(request.params.id)
                })

                //Trade routes
                this.resource("trades", {except: ["update"]})
                this.post("/trades/:id", (schema, request) => {
                    return schema.trades.find(request.params.id).update({label: request.requestBody.name})
                })
                this.post("/trades/unassign/:id", (schema, request) => {
                    request.requestBody.forEach((item, index) => {
                        if (item.delete_row == true) {
                            let portfolio = schema.portfolios.find(item.id)
                            schema.portfolios.find(item.id).update({tradeId: null})
                        }
                    })
                    return
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
                    }
                )
                let first_trade = server.create("trade", {label: "First Trade"})
                let index_portfolio = server.create("portfolio", {label: "Index Portfolio", trade: first_trade, assetModel: usa_model})
                let robinHeed = server.create("account", {portfolio: index_portfolio, label: "Robinheed"})
                server.create("accountPosition", {account: robinHeed, symbol: "AGG", shares: 10})
                server.create("account", {label: "TOAmTrade"})
            },
        }
    )
}