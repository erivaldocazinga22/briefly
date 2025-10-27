import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/core/config/env.config";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

config({ path: ".env" });
export const db = drizzle(pool);
