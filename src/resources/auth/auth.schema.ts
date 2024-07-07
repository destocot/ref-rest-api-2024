import * as v from "valibot";

const signinUserBody = v.object({
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.nonEmpty()),
});

export const signinUserSchema = v.object({
  body: signinUserBody,
});

export type SigninUserSchema = v.InferInput<typeof signinUserSchema>;
