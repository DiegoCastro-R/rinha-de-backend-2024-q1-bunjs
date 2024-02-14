import type { Client } from "../../dtos/Client.dto";
import { findById } from "../../repositories/clients.repository";

export const findClient = async (id: number): Promise<Client | null> => {
    try {
        const client: Client | null = await findById(id);
        if (client && client.id === id) {
            return client;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error finding client:", error);
        return null;
    }
};
