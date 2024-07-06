import * as v from "valibot";

const envSchema = v.object({
  PORT: v.pipe(v.string(), v.nonEmpty()),
  DATABASE_URL: v.pipe(v.string(), v.nonEmpty()),
});

const parsedEnv = v.safeParse(envSchema, process.env);

if (!parsedEnv.success) {
  console.error(v.flatten(parsedEnv.issues));
  process.exit(1);
}

export default parsedEnv.output;
