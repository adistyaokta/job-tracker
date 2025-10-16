import { z } from 'zod';
import { InterviewSchema } from './interview-schema';

export const TypeSchema = z.enum(['FULLTIME', 'PARTTIME', 'FREELANCE']);
export const StatusSchema = z.enum([
  'SAVED',
  'APPLIED',
  'INTERVIEWING',
  'ASSESSMENT',
  'OFFER',
  'REJECTED',
  'WITHDRAWN',
  'HIRED',
  'ON_HOLD',
]);

export const JobSchema = z.object({
  id: z.uuid(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().min(1, 'Location is required'),
  platform: z.string().min(1, 'Platform is required'),
  email: z.string().email().optional().nullable(),
  link: z.string().nullable(),
  type: TypeSchema,
  status: StatusSchema,
  createdAt: z.string().nullable(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),

  // RELATIONS
  interview: InterviewSchema.optional().nullable(),
});

export const CreateJobSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  platform: z.string().min(1, 'Platform is required'),
  location: z.string().min(1, 'Location is required'),
  email: z.string().email().optional().nullable(),
  link: z.string().nullable(),
  type: TypeSchema,
  status: StatusSchema,
  interview: InterviewSchema.optional().nullable(),
});

export const UpdateJobSchema = JobSchema.partial();

export type JobType = z.infer<typeof TypeSchema>;
export type JobStatus = z.infer<typeof StatusSchema>;

export type Job = z.infer<typeof JobSchema>;
export type CreateJob = z.infer<typeof CreateJobSchema>;
export type UpdateJob = z.infer<typeof UpdateJobSchema>;

// CONSTANT
export const typeLabels: Record<JobType, string> = {
  FULLTIME: 'Full Time',
  PARTTIME: 'Part Time',
  FREELANCE: 'Freelance',
};

export const statusLabels: Record<JobStatus, string> = {
  SAVED: 'Saved',
  APPLIED: 'Applied',
  INTERVIEWING: 'Interviewing',
  ASSESSMENT: 'Assessment',
  OFFER: 'Offer',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
  ON_HOLD: 'On Hold',
};

export const statusClasses: Record<JobStatus, string> = {
  SAVED: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  APPLIED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  INTERVIEWING:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  ASSESSMENT:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  OFFER: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  HIRED:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  WITHDRAWN: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  ON_HOLD:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
};
