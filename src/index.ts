import { ClientRouter } from "./routes/clients/routes";
import { Elysia } from "elysia";
import { RootRouter } from "./routes/root.routes";

async function startServer() {
    const app = new Elysia();
    app.use(RootRouter);
    app.use(ClientRouter);
    app.listen(Bun.env.PORT || 9000, () => {
        console.info("🚧🚀 API is up and running on PORT " + Bun.env.PORT || 9000);
    });
}

startServer().catch(error => {
    console.error("Error starting server:", error);
});
