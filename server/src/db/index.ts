import * as schema from "@server/db/schema";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";

config({ path: ".env" });

// const client = postgres(process.env.DATABASE_URL!);
// export const db = drizzle({ client });
export const db = drizzle(process.env.DATABASE_URL!, { schema });
