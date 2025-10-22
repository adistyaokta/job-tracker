import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { jobs } from "./routes/jobs";
import { serveStatic } from "hono/bun";
import { auth } from "./lib/auth";

config();

export const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>()

	.use(logger())
	.use(
		"*",
		cors({
			origin: "http://localhost:5173",
			allowHeaders: ["Content-Type", "Authorization"],
			allowMethods: ["GET", "POST", "OPTIONS"],
			exposeHeaders: ["Content-Length"],
			maxAge: 600,
			credentials: true,
		}),
	)
	.route("/api/jobs", jobs)

	.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw))

	.use("*", async (c, next) => {
		const session = await auth.api.getSession({ headers: c.req.raw.headers });
		if (!session) {
			c.set("user", null);
			c.set("session", null);
			return next();
		}
		c.set("user", session.user);
		c.set("session", session.session);
		return next();
	})
	.get("/session", (c) => {
		const session = c.get("session");
		const user = c.get("user");

		if (!user) return c.body(null, 401);

		return c.json({
			session,
			user,
		});
	})

	.use("*", serveStatic({ root: "./static" }))

	.get("*", async (c, next) => {
		return serveStatic({ root: "./static", path: "index.html" })(c, next);
	});

export default {
	port: Number(process.env.PORT) || 3001,
	hostname: "0.0.0.0",
	fetch: app.fetch,
};
