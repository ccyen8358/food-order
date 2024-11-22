import * as schema from "./schema-bundle";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const SUPABASE_URL = process.env.SUPABASE_URL;
if (!SUPABASE_URL) {
  throw new Error("database url is not set");
}
console.log("SUPABASE_URL: ", SUPABASE_URL);

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(SUPABASE_URL, { prepare: false, idle_timeout: 10 });
export const db = drizzle(client, {
  schema: { ...schema },
  logger: true,
});
