import { zValidator } from "@hono/zod-validator";
import { db } from "@server/db";
import { jobs as jobsTable } from "@server/db/schema/jobs";
import { makeRoute } from "@server/utils/inputValidator";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { Hono, type MiddlewareHandler } from "hono";
import { CreateJobSchema, UpdateJobSchema, type JobStatus } from "shared/dist";

export const jobs = new Hono();

jobs.get("/", async (c) => {
	// PAGINATION
	const page = Number(c.req.query("page")) || 1;
	const limit = Number(c.req.query("limit")) || 10;
	const offset = (page - 1) * limit;

	const search = c.req.query("search")?.trim();
	const status = c.req.query("status") as JobStatus;

	const filters = [];

	if (status) {
		filters.push(eq(jobsTable.status, status));
	}

	if (search) {
		filters.push(
			or(
				ilike(jobsTable.company, `%${search}%`),
				ilike(jobsTable.position, `%${search}%`),
				ilike(jobsTable.platform, `%${search}%`),
			),
		);
	}

	const whereClause = filters.length > 0 ? and(...filters) : undefined;

	const jobList = await db
		.select()
		.from(jobsTable)
		.where(whereClause)
		.orderBy(desc(jobsTable.updatedAt), desc(jobsTable.createdAt))
		.limit(limit)
		.offset(offset);

	const [countTotal] = await db
		.select({ count: count() })
		.from(jobsTable)
		.where(whereClause);

	return c.json({
		data: jobList,
		message: "successfully fetched jobs data",
		meta: {
			page,
			limit,
			total: Number(countTotal?.count || 0),
			totalPages: Math.ceil(Number(countTotal?.count || 0) / limit),
		},
	});
});

jobs.post(
	"/",
	zValidator("json", CreateJobSchema) as unknown as MiddlewareHandler,
	makeRoute(CreateJobSchema, async (c, validated) => {
		const [newJob] = await db.insert(jobsTable).values(validated).returning();
		return c.json({ message: "Job created successfully", data: newJob }, 201);
	}),
);
jobs.put(
	"/:id",
	zValidator("json", UpdateJobSchema) as unknown as MiddlewareHandler,
	makeRoute(UpdateJobSchema, async (c, validated) => {
		const id = c.req.param("id");
		if (!id) {
			return c.json({ message: "No job application found", data: null });
		}

		const [job] = await db
			.update(jobsTable)
			.set({
				status: validated.status,
				type: validated.type,
			})
			.where(eq(jobsTable.id, id))
			.returning();

		return c.json(
			{ message: "Application updated successfully", data: job },
			200,
		);
	}),
);
