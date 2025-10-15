import { zValidator } from '@hono/zod-validator';
import { db } from '@server/db';
import { jobs as jobsTable } from '@server/db/schema/jobs';
import { makeRoute } from '@server/utils/inputValidator';
import { desc, eq } from 'drizzle-orm';
import { Hono, type MiddlewareHandler } from 'hono';
import { CreateJobSchema, UpdateJobSchema } from 'shared/dist';

export const jobs = new Hono();

jobs.get('/', async (c) => {
  const jobList = await db
    .select()
    .from(jobsTable)
    .orderBy(desc(jobsTable.createdAt));

  return c.json({ data: jobList, message: 'successfully fetched jobs data' });
});
jobs.post(
  '/',
  zValidator('json', CreateJobSchema) as unknown as MiddlewareHandler,
  makeRoute(CreateJobSchema, async (c, validated) => {
    const [newJob] = await db.insert(jobsTable).values(validated).returning();
    return c.json({ message: 'Job created successfully', data: newJob }, 201);
  })
);
jobs.put(
  '/:id',
  zValidator('json', UpdateJobSchema) as unknown as MiddlewareHandler,
  makeRoute(UpdateJobSchema, async (c, validated) => {
    const id = c.req.param('id');
    if (!id) {
      return c.json({ message: 'No job application found', data: null });
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
      { message: 'Application updated successfully', data: job },
      200
    );
  })
);
