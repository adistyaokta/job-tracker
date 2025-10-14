import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { JobSchema } from "shared/dist";

export const jobs = new Hono();

jobs.post(
	"/",
	zValidator("json", JobSchema, (result, c) => {
		if (!result.success) {
			return c.text("Invalid!", 400);
		}
	}),
	async (c) => {
		const job = c.req.valid("json");
		console.log("🚀 ~ Received job:", job);

		return { message: "success" };
	},
);
