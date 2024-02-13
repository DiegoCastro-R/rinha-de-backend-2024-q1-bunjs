import { ClientRouter } from "./routes/clients/routes";
import { Elysia } from "elysia";
import { RootRouter } from "./routes/root.routes";
new Elysia()
    .use(RootRouter, ClientRouter)
    .listen(Bun.env.PORT || 9000, () => {
        console.info("🚧🚀 API is up and running on PORT " + Bun.env.PORT || 9000)
    })