"use server";

import { db } from "@/core/database/drizzle";
import { userTable } from "@/core/database/drizzle/schemas/drizzle-user-table.schema";

export async function findManyUserAction() {
	const data = await db.select().from(userTable);
	return data;
}
