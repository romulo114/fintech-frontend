import {createServer, Model} from "miragejs"

export default function () {
    createServer(
        {
            models: {
                user: Model
            },
            seeds(server) {
                server.create("user", {text: "User_1"})
            },
            routes() {
                this.get("/api/portfolios", () => (
                        ["Portfolio 1", "Portfolio 2", "            "
                        ]
                    )
                ),
                    this.get("/api/model/model_summary", () => (
                            [{
                                label: "Model-001",
                                id: "100001",
                                description: "Strategy for the ages",
                                is_public: "false"
                            },]
                        )
                    ),
                    this.get("/api/accounts/account_summary", () => (
                            [
                                {
                                    account_number: "ID-012345",
                                    broker_name: "Fast Broker",
                                },
                            ]
                        )
                    ),
                    this.get("/api/model/model_detail/:id", () => (
                            [{
                                id: "100001",
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
                            }]
                        )
                    )
            }

        }
    )
}