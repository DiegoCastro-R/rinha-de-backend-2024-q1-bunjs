import { findById } from "../../repositories/clients.repository";
import { getTransactionHistory } from "../../repositories/transactions.repository";

export const getClientStatement = async (clientId: number) => {
    const client = await findById(clientId);
    if (!client) {
        return { status: 404, error: 'Client not found' };
    }
    const transactionHistory = await getTransactionHistory(clientId);
    const saldoTotal = client.saldo;
    const dataExtrato = new Date().toISOString();
    const limite = client.limite;
    const ultimasTransacoes = transactionHistory.slice(0, 10).map(transaction => ({
        valor: transaction.valor,
        tipo: transaction.tipo,
        descricao: transaction.descricao,
        realizada_em: transaction.realizada_em
    }));

    return {
        status: 200,
        saldo: {
            total: saldoTotal,
            data_extrato: dataExtrato,
            limite: limite
        },
        ultimas_transacoes: ultimasTransacoes
    };
};
