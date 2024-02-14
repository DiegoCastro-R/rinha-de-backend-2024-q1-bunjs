import type { Config } from "drizzle-kit";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const config = {
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
        connectionString: `${process.env.DATABASE_URL}`,
    }
} satisfies Config;



const queryClient = postgres(`${process.env.DATABASE_URL}`);
export const dbConnection = drizzle(queryClient);
export default config