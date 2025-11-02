import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { userTable } from "./drizzle-user-table.schema";

export const formTable = pgTable("forms", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	title: varchar("title", { length: 200 }).notNull(),
	description: text("description"),
	createdBy: text("created_by")
		.references(() => userTable.id, { onDelete: "cascade" })
		.notNull(),
	isActive: boolean("is_active").default(true),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const fieldTypeEnum = pgEnum("field_type", [
	"text",
	"textarea",
	"number",
	"select",
	"checkbox",
	"radio",
	"date",
]);

export const formFieldTable = pgTable("form_fields", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	formId: text("form_id")
		.references(() => formTable.id, { onDelete: "cascade" })
		.notNull(),
	label: text("label").notNull(),
	type: fieldTypeEnum(),
	isRequired: boolean("is_required").default(false),
	orderIndex: integer("order_index").default(0),
	options: jsonb("options"),
});

export const formResponseTable = pgTable("form_responses", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	formId: text("form_id")
		.references(() => formTable.id, { onDelete: "cascade" })
		.notNull(),
	submittedBy: text("submitted_by").references(() => userTable.id, {
		onDelete: "set null",
	}),
	submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const formFieldAnswerTable = pgTable("field_answers", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),
	responseId: text("response_id")
		.references(() => formResponseTable.id, { onDelete: "cascade" })
		.notNull(),
	fieldId: text("field_id")
		.references(() => formFieldTable.id, {
			onDelete: "cascade",
		})
		.notNull(),
	value: text("value").notNull(),
});

// Relations
export const formsRelations = relations(formTable, ({ many, one }) => ({
	creator: one(userTable, {
		fields: [formTable.createdBy],
		references: [userTable.id],
	}),
	fields: many(formFieldTable),
	responses: many(formResponseTable),
}));

export const formFieldsRelations = relations(formFieldTable, ({ one }) => ({
	form: one(formTable, {
		fields: [formFieldTable.formId],
		references: [formTable.id],
	}),
}));

export const formResponsesRelations = relations(
	formResponseTable,
	({ one, many }) => ({
		form: one(formTable, {
			fields: [formResponseTable.formId],
			references: [formTable.id],
		}),
		user: one(userTable, {
			fields: [formResponseTable.submittedBy],
			references: [userTable.id],
		}),
		answers: many(formFieldAnswerTable),
	}),
);

export const fieldAnswersRelations = relations(
	formFieldAnswerTable,
	({ one }) => ({
		field: one(formFieldTable, {
			fields: [formFieldAnswerTable.fieldId],
			references: [formFieldTable.id],
		}),
		response: one(formResponseTable, {
			fields: [formFieldAnswerTable.responseId],
			references: [formResponseTable.id],
		}),
	}),
);
