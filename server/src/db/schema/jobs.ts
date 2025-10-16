import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import type { JobStatus, JobType } from 'shared/dist';
import { interview } from './interview';

export const jobs = pgTable('jobs', {
  id: uuid().primaryKey().defaultRandom(),
  company: text('company').notNull(),
  position: text('position').notNull(),
  platform: text('platform').notNull(),
  location: text('location').notNull(),
  email: varchar('email', { length: 255 }),
  link: text('link'),
  type: text('type').$type<JobType>(),
  status: text('status').$type<JobStatus>(),
  createdAt: timestamp('created_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  })
    .notNull()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at', {
    mode: 'date',
    precision: 3,
    withTimezone: true,
  }),
});

export const jobRelations = relations(jobs, ({ one }) => ({
  interview: one(interview, {
    fields: [jobs.id],
    references: [interview.jobId],
  }),
}));
