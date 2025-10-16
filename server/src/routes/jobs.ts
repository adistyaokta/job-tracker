import { zValidator } from '@hono/zod-validator';
import { db } from '@server/db';
import { interview as interviewTable } from '@server/db/schema/interview';
import { jobs as jobsTable } from '@server/db/schema/jobs';

import { makeRoute } from '@server/utils/inputValidator';
import { and, count, eq, ilike, or } from 'drizzle-orm';
import { Hono, type MiddlewareHandler } from 'hono';
import { CreateJobSchema, UpdateJobSchema, type JobStatus } from 'shared/dist';

export const jobs = new Hono();

jobs.get('/', async (c) => {
  // PAGINATION
  const page = Number(c.req.query('page')) || 1;
  const limit = Number(c.req.query('limit')) || 10;
  const offset = (page - 1) * limit;

  const search = c.req.query('search')?.trim();
  const status = c.req.query('status') as JobStatus;

  const filters = [];

  if (status) {
    filters.push(eq(jobsTable.status, status));
  }

  if (search) {
    filters.push(
      or(
        ilike(jobsTable.company, `%${search}%`),
        ilike(jobsTable.position, `%${search}%`),
        ilike(jobsTable.platform, `%${search}%`)
      )
    );
  }

  const whereClause = filters.length > 0 ? and(...filters) : undefined;

  const jobList = await db.query.jobs.findMany({
    where: whereClause,
    orderBy: (jobs, { desc }) => [desc(jobs.updatedAt), desc(jobs.createdAt)],
    limit,
    offset,
    with: {
      interview: true,
    },
  });

  const [countTotal] = await db
    .select({ count: count() })
    .from(jobsTable)
    .where(whereClause);

  return c.json({
    data: jobList,
    message: 'successfully fetched jobs data',
    meta: {
      page,
      limit,
      total: Number(countTotal?.count || 0),
      totalPages: Math.ceil(Number(countTotal?.count || 0) / limit),
    },
  });
});
jobs.put(
  '/:id',
  zValidator('json', UpdateJobSchema) as unknown as MiddlewareHandler,
  makeRoute(UpdateJobSchema, async (c, validated) => {
    const { interview, ...rest } = validated;
    const idParam = c.req.param('id');

    console.log('run?');

    if (!idParam) {
      return c.json(
        { message: 'No job application id provided', data: null },
        400
      );
    }

    const jobId = idParam;

    try {
      const job = await db.transaction(async (tx) => {
        if (interview) {
          const [updatedInterview] = await tx
            .update(interviewTable)
            .set({ note: interview.note })
            .where(eq(interviewTable.id, String(interview.id)));

          if (!updatedInterview) {
            return c.json({ message: 'No interview data found' });
          }
        }

        const [updatedJob] = await tx
          .update(jobsTable)
          .set({
            status: rest.status,
            type: rest.type,
          })
          .where(eq(jobsTable.id, jobId))
          .returning();

        if (!updatedJob) {
          return c.json({ message: 'No jobs application found' });
        }
        return updatedJob;
      });
      return c.json(
        { message: 'Job application updated successfully', data: job },
        200
      );
    } catch (err: any) {
      console.error(err);
      if (
        err.message === 'No jobs application found' ||
        err.message === 'No interview data found'
      ) {
        return c.json({ message: err.message, data: null }, 404);
      }
      return c.json(
        { message: 'Failed to update application', data: null },
        500
      );
    }
  })
);
jobs.post(
  '/',
  zValidator('json', CreateJobSchema) as unknown as MiddlewareHandler,
  makeRoute(CreateJobSchema, async (c, validated) => {
    const { interview, ...jobData } = validated;
    const [newJob] = await db.insert(jobsTable).values(jobData).returning();

    let newInterview = null;
    if (interview) {
      const [interviewData] = await db
        .insert(interviewTable)
        .values({
          // ...interview,
          jobId: newJob?.id,
          type: interview.type,
          date: interview.date ? new Date(interview.date ?? '') ?? null : null,
        })
        .returning();
      newInterview = interviewData;
    }

    return c.json(
      {
        message: 'Job created successfully',
        data: { ...newJob, newInterview },
      },
      201
    );
  })
);
