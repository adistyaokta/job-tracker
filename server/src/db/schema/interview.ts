import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import type { InterviewType } from 'shared/dist';
import { jobs } from './jobs';

export const interview = pgTable('interview', {
  id: uuid().primaryKey().defaultRandom(),
  note: text('note'),
  jobId: uuid('job_id')
    .references(() => jobs.id, { onDelete: 'cascade' })
    .unique(),
  type: text('interview_type').$type<InterviewType>(),
  date: timestamp('date', { mode: 'date' }),
});

export const interviewRelations = relations(interview, ({ one }) => ({
  job: one(jobs, {
    fields: [interview.jobId],
    references: [jobs.id],
  }),
}));
