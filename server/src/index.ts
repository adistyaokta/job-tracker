import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { jobs } from "./routes/jobs";

config();

export const app = new Hono()

	.use(logger())
	.use(cors())

	.route("/jobs", jobs);

export default {
	port: Number(process.env.PORT) || 3001,
	host: process.env.HOST,
	fetch: app.fetch,
};
// export default app;
