import { Elysia } from "elysia";

export const RootRouter = (app: Elysia) => (
    app.get('/', async ({ }) => {
        return ({
            Message: "Welcome to Diego's Rodrigues Submission to: Rinha backend Q1 - 2024",
            "Get In Touch": `https://linkedin.com/in/diegocastro-r | https://github.com/in/diegocastro-r`
        })
    })
)