"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/core/database/drizzle";
import { userTable } from "@/core/database/drizzle/schemas/drizzle-user-table.schema";

export async function deleteUserAction(id: string) {
	await db.delete(userTable).where(eq(userTable.id, id));
	revalidatePath("/");
}
