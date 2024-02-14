import { ClientRouter } from "./routes/clients/routes";
import { Elysia } from "elysia";
import { RootRouter } from "./routes/root.routes";
import { logger } from '@bogeychan/elysia-logger';
async function startServer() {
    const app = new Elysia();
    app.use(logger({}))
    app.use(RootRouter);
    app.use(ClientRouter);
    app.listen(process.env.PORT || 3000, () => {
        console.info("🚧🚀 API is up and running on PORT " + (process.env.PORT));
    });
}

startServer().catch(error => {
    console.error("Error starting server:", error);
});
