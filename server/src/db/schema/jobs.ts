import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import type { StatusSchema, TypeSchema } from "shared/dist";
import type z from "zod";

export const jobs = pgTable("jobs", {
	id: serial("id").primaryKey(),
	company: text("company").notNull(),
	position: text("position").notNull(),
	platform: text("platform").notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	link: text("link"),
	type: text("type").$type<z.infer<typeof TypeSchema>>(),
	status: text("status").$type<z.infer<typeof StatusSchema>>(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
	deletedAt: timestamp("deleted_at"),
});
