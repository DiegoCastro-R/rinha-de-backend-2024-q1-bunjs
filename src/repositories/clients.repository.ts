import type { Client } from "../dtos/Client.dto"
import { clientes } from "../../drizzle/schema"
import { dbConnection } from "../database/db"
import { sql } from "drizzle-orm"

export const findById = async (id: number): Promise<Client | null> => {
    try {
        const [result] = await dbConnection.execute(sql`SELECT * FROM ${clientes} WHERE id = ${id} LIMIT 1;`);
        if (result.length === 0) {
            return null;
        }
        const clientData: Record<string, unknown> = result;
        const client: Client = {
            id: clientData.id as number,
            limite: clientData.limite as number,
            saldo: clientData.saldo as number
        };
        return client;
    } catch (error) {
        console.error("Error finding client by id:", error);
        return null;
    }
};

export const updateClientBalance = async (id: number, balance: number): Promise<Client | null> => {
    try {
        const [updatedClient] = await dbConnection
            .execute(sql`UPDATE ${clientes}  
                        SET saldo = ${balance} 
                        WHERE id = ${id} 
                        RETURNING *;`);
        if (!updatedClient) {
            console.error("Client not updated successfully");
            return null;
        }
        const client: Client = {
            id: updatedClient.id as number,
            limite: updatedClient.limite as number,
            saldo: updatedClient.saldo as number
        };
        return client;
    } catch (error) {
        console.error("Error updating client balance:", error);
        return null;
    }
};

