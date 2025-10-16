import z from 'zod';

export const InterviewTypeSchema = z.enum(['ONLINE', 'OFFLINE']);

export const InterviewSchema = z.object({
  id: z.uuid().optional(),
  jobId: z.string().uuid().optional(),
  note: z.string().optional(),
  date: z.string().optional().nullable(),
  type: InterviewTypeSchema,
});

export type InterviewType = z.infer<typeof InterviewTypeSchema>;
export type Interview = z.infer<typeof InterviewSchema>;

// CONSTANT
export const InterviewTypeLabels: Record<InterviewType, string> = {
  ONLINE: 'Online',
  OFFLINE: 'Offline',
};
