import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import type { StatusSchema, TypeSchema } from 'shared/dist';
import type z from 'zod';

export const jobs = pgTable('jobs', {
  id: uuid().primaryKey().defaultRandom(),
  company: text('company').notNull(),
  position: text('position').notNull(),
  platform: text('platform').notNull(),
  email: varchar('email', { length: 255 }),
  link: text('link'),
  type: text('type').$type<z.infer<typeof TypeSchema>>(),
  status: text('status').$type<z.infer<typeof StatusSchema>>(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at', { mode: 'date' }),
});
