import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";
import env from "./src/lib/env-config";

const config = {
  dialect: "postgresql",
  schema: "src/drizzle/schema.ts",
  out: "migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;

export default defineConfig(config);
