import { findById, updateClientBalance } from "../../repositories/clients.repository";

import type { Client } from "../../dtos/Client.dto";
import type { TransactionOperation } from "../../dtos/Transaction.dto";
import { findClient } from "./findClient.handler";
import { registerTransactions } from "../../repositories/transactions.repository";

export const executeTransaction = async (clientId: number, operation: TransactionOperation) => {
    try {
        const client: Client | null = await findClient(clientId);
        if (!client) {
            return { status: 404, message: 'Client not registered' };
        }

        let result;
        if (operation.tipo === "c") {
            result = await creditOperation(client, operation);
        } else {
            result = await debitOperation(client, operation);
        }

        return {
            status: result.status,
            limite: result.limite,
            saldo: result.saldo,
            error: result.error
        };
    } catch (error) {
        console.error("Error executing transaction:", error);
        return { status: 500, error: 'Internal server error' };
    }
};





export const debitOperation = async (client: Client, operation: any): Promise<{ status: number, limite?: number, saldo?: number, error?: string }> => {
    try {
        const newBalance = client.saldo - operation.valor;
        if (newBalance < -client.limite) {
            return { status: 422, error: 'Transaction would leave balance inconsistent' };
        }
        await registerTransactions({ cliente_id: client.id, ...operation });
        const updatedClient = await updateClientBalance(client.id, newBalance);
        if (!updatedClient) {
            return { status: 500, error: 'Client not updated successfully' };
        }
        return {
            status: 200,
            limite: updatedClient.limite,
            saldo: updatedClient.saldo
        };
    } catch (error) {
        console.error("Error processing debit transaction:", error);
        return { status: 500, error: 'Internal server error' };
    }
};



const creditOperation = async (client: Client, operation: TransactionOperation): Promise<{ status: number, limite?: number, saldo?: number, error?: string }> => {
    try {
        await registerTransactions({ cliente_id: client.id, ...operation });
        const newBalance = client.saldo + operation.valor;
        const updatedClient = await updateClientBalance(client.id, newBalance);
        if (!updatedClient) {
            throw new Error("Client not updated successfully");
        }
        return { status: 200, ...updatedClient };
    } catch (error) {
        console.error("Error processing credit transaction:", error);
        throw error;
    }
};