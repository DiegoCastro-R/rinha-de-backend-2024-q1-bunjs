import { Elysia } from "elysia";
import { executeTransaction } from "../../handlers/clients/transaction.handler";}
const ROUTE_PATH = '/clientes'
export const ClientRouter = (app: Elysia) => (
    app.post(`${ROUTE_PATH}/:id/transacoes`, async ({ set }) => {
        // const clientExists = ...
        // if (!clientExists) = set.status = 404}
        // const clientBalance = ...
        // (!clientBalance = ...
        // set.status = 422
        const response = await executeTransaction()
        if (response) {
            set.status = 200
        }

        return response
    }),
    app.get(`${ROUTE_PATH}/:id/extrato`, async ({ }) => {
        // const clientExists = ...
        // if (!clientExists) = set.status = 404}
        return ({

        })
    })
)
