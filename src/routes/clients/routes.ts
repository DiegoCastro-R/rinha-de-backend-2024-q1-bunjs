import { Elysia, } from "elysia";
import Joi from "joi";
import { executeTransaction } from "../../handlers/clients/transaction.handler";
import { getClientStatement } from "../../handlers/clients/statement.handler";

const transactionSchema = Joi.object({
    valor: Joi.number().required(),
    tipo: Joi.string().required(),
    descricao: Joi.string().required()
});

const ROUTE_PATH = '/clientes';

export const ClientRouter = (app: Elysia) => (
    app.post(`${ROUTE_PATH}/:id/transacoes`, async ({ set, params, body }) => {

        const { error, value } = validateTransaction(body);
        if (error) {
            return respondWithError(set, 400, error.message);
        }
        const operation = {
            valor: value.valor,
            tipo: value.tipo,
            descricao: value.descricao
        };
        const response = await executeTransaction(Number(params.id), operation);
        console.log(response)
        set.status = response?.status;
        return {
            limite: response?.limite,
            saldo: response?.saldo,
            error: response?.error,
        };

    }),

    app.get(`${ROUTE_PATH}/:id/extrato`, async ({ set, params }) => {
        try {
            const clientId = Number(params.id);
            const response = await getClientStatement(clientId);
            set.status = response.status;
            return {
                saldo: response.saldo,
                ultimas_transacoes: response.ultimas_transacoes,
                error: response.error
            };
        } catch (error) {
            console.error("Error fetching client statement:", error);
            set.status = 500;
            return { error: 'Internal server error' };
        }
    })
)


function validateTransaction(body: any) {
    return transactionSchema.validate(body, { abortEarly: false });
}


function respondWithError(set: any, status: number, message: string) {
    set.status = status;
    return { error: message };
}
