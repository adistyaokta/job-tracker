import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { jobs } from "./routes/jobs";
import { serveStatic } from "hono/bun";

config();

export const app = new Hono()

	.use(logger())
	.use(cors())

	.route("/api/jobs", jobs)

	.use("*", serveStatic({ root: "./static" }))

	.get("*", async (c, next) => {
		return serveStatic({ root: "./static", path: "index.html" })(c, next);
	});

export default {
	port: Number(process.env.PORT) || 3001,
	host: process.env.HOST,
	fetch: app.fetch,
};
// export default app;
