import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas";

config({ path: ".env" });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
	process.exit(0);
}

const pool = new Pool({
	connectionString: DATABASE_URL,
});

export const db = drizzle(pool, { schema });
