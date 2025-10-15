import { z } from "zod";

export const TypeSchema = z.enum(["FULLTIME", "PARTTIME", "FREELANCE"]);
export const StatusSchema = z.enum([
	"APPLIED",
	"INTERVIEWING",
	"ASSESSMENT",
	"OFFER",
	"REJECTED",
	"WITHDRAWN",
	"HIRED",
]);

export const JobSchema = z.object({
	id: z.uuid(),
	company: z.string().min(1, "Company name is required"),
	position: z.string().min(1, "Position is required"),
	platform: z.string().min(1, "Platform is required"),
	email: z.email(),
	link: z.string(),
	type: TypeSchema,
	status: StatusSchema,
	createdAt: z.string().nullable(),
	updatedAt: z.string().nullable(),
	deletedAt: z.string().nullable(),
});

export const CreateJobSchema = z.object({
	company: z.string().min(1, "Company name is required"),
	position: z.string().min(1, "Position is required"),
	platform: z.string().min(1, "Platform is required"),
	email: z.email("Invalid email"),
	link: z.string().nullable(),
	type: TypeSchema,
	status: StatusSchema,
});

export const UpdateJobSchema = CreateJobSchema.partial();

export type JobType = z.infer<typeof TypeSchema>;
export type JobStatus = z.infer<typeof StatusSchema>;

export type Job = z.infer<typeof JobSchema>;
export type CreateJob = z.infer<typeof CreateJobSchema>;
export type UpdateJob = z.infer<typeof UpdateJobSchema>;

// CONSTANT
export const typeLabels: Record<JobType, string> = {
	FULLTIME: "Full Time",
	PARTTIME: "Part Time",
	FREELANCE: "Freelance",
};

export const statusLabels: Record<JobStatus, string> = {
	APPLIED: "Applied",
	INTERVIEWING: "Interviewing",
	ASSESSMENT: "Assessment",
	OFFER: "Offer",
	REJECTED: "Rejected",
	WITHDRAWN: "Withdrawn",
	HIRED: "Hired",
};
