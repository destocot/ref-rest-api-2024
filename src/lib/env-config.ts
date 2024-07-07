import * as v from "valibot";
import logger from "@/lib/logger";

const envSchema = v.object({
  PORT: v.optional(v.pipe(v.string(), v.nonEmpty())),
  DATABASE_URL: v.pipe(v.string(), v.nonEmpty()),
  JWT_SECRET: v.pipe(v.string(), v.nonEmpty()),
  NODE_ENV: v.optional(v.pipe(v.string(), v.nonEmpty())),
});

const parsedEnv = v.safeParse(envSchema, process.env);

if (!parsedEnv.success) {
  logger.error(v.flatten(parsedEnv.issues));
  process.exit(1);
}

export default parsedEnv.output;
