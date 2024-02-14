import type { Transaction } from "../dtos/Transaction.dto";
import { dbConnection } from "../database/db"
import { sql } from "drizzle-orm"
import { transacoes } from "../../drizzle/schema"

export const registerTransactions = async ({ cliente_id, valor, tipo, descricao }: { cliente_id: number, valor: any, tipo: any, descricao: any }) => {
    try {
        const query = sql`
            INSERT INTO ${transacoes} (cliente_id,valor, tipo, descricao)
            VALUES (${cliente_id}, ${valor}, ${tipo}, ${descricao})
        `;
        await dbConnection.execute(query);
        return true;
    } catch (error) {
        console.error("Error inserting transaction:", error);

    }
}

export const getTransactionHistory = async (clientId: number): Promise<Transaction[]> => {
    try {

        const query = sql`SELECT * FROM transacoes WHERE cliente_id = ${clientId} LIMIT 10`;
        const transactionsData = await dbConnection.execute(query);
        const transactions: Transaction[] = transactionsData.map((row: any) => ({
            id: row.id,
            cliente_id: row.cliente_id,
            valor: row.valor,
            tipo: row.tipo,
            descricao: row.descricao,
            realizada_em: new Date(row.realizada_em)
        }));

        return transactions;
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        throw new Error("Failed to fetch transaction history");
    }
};