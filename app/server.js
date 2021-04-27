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
                            ["Model 6", "Model 2",
                                "Model 3"
                            ]
                        )
                    ),
                    this.get("/api/accounts/account_summary", () => (
                            [
                                {
                                    account_id: "ID-012345",
                                    broker: "Fast Broker",
                                    portfolio_id: "PortId-9876",
                                    actions: "Save, Edit"
                                },
                            ]
                        )
                    )
            }

        }
    )
}