import "dotenv/config";
import * as schema from "@/db/schema-bundle";
import { User } from "@/db/schema-bundle";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import cuid2 from "@paralleldrive/cuid2";

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

const is_insert = false;

await (async function () {
  if (is_insert) {
    const user: typeof User.$inferInsert = {
      id: cuid2.createId(),
      name: "admin",
      email: "admin@example.com",
      email_verified: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    await db.insert(User).values(user);
    console.log("New user created!");
  }

  const users = await db.select().from(User);
  console.log("Getting all users from the database: ", users);
})();

console.log("Done!");
