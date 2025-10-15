import type { Context, Env } from "hono";
import type z from "zod";

type JsonInputSchema<T extends z.ZodType> = {
	in: { json: z.input<T> };
	out: { json: z.output<T> };
};

export function makeRoute<
	T extends z.ZodType,
	E extends Env = Env,
	P extends string = string,
>(
	schema: T,
	handler: (
		c: Context<E, P, JsonInputSchema<T>>,
		validated: z.output<T>,
	) => Promise<Response> | Response,
) {
	return async (c: Context<E, P, JsonInputSchema<T>>) => {
		const validated = c.req.valid("json");
		return handler(c, validated);
	};
}
