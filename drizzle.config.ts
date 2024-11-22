import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const SUPABASE_URL = process.env.SUPABASE_URL;
if (!SUPABASE_URL) {
  throw new Error("database url is not set");
}

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: SUPABASE_URL,
  },
});
