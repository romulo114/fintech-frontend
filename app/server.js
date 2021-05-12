import {createServer, Model} from "miragejs"

export default function () {
    createServer({

            models: {
                assetModel: Model
            },
            routes() {
                this.namespace = "api"

                    this.get("/assetModels", (schema, request) => {
                        return schema.assetModels.all()
                    }),
                    this.get("/assetModels/:id", (schema, request) => {
                        let id = request.params.id

                        return schema.assetModels.find(id)
                    }),
                    this.get("/api/accounts/account_summary", () => (
                            [
                                {
                                    account_number: "ID-012345",
                                    broker_name: "Fast Broker",
                                },
                            ]
                        )
                    )

            },
            seeds(server) {
                server.create("assetModel",  {
                    label: "USA",
                    keywords: ["USA"],
                    allocation: "null",
                    description: "Strategy for the USA",
                    is_public: "false",
                    user_id: "100001",
                    positions: [{
                        "model_id": "100001",
                        symbol: "AGG",
                        weight: 0.2
                    }]
                })
            },
        }
    )
}