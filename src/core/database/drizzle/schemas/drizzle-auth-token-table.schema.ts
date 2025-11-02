import { createId } from "@paralleldrive/cuid2";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { userTable } from "./drizzle-user-table.schema";

export const authTokenTable = pgTable("auth_token", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	userId: text("user_id")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	token: text("token").unique(),
	expiresAt: integer("expires_at").notNull(),
	revoked: boolean("revoked").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});
