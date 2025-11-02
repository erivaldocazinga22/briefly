import { createId } from "@paralleldrive/cuid2";
import { type InferInsertModel, relations } from "drizzle-orm";
import {
	boolean,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { authTokenTable } from "./drizzle-auth-token-table.schema";
import { formResponseTable, formTable } from "./drizzle-form-table.schema";

export const userRoleEnum = pgEnum("user_role", ["manager", "customer"]);

export const userTable = pgTable("users", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	email: varchar("email", { length: 150 }).unique().notNull(),
	password: text("password").notNull(),
	role: userRoleEnum().default("customer").notNull(),
	status: boolean("status").default(true),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export type CreateUserValues = InferInsertModel<typeof userTable>;
export const usertTableRelations = relations(userTable, ({ many }) => ({
	tokens: many(authTokenTable),
	forms: many(formTable),
	responses: many(formResponseTable),
}));
