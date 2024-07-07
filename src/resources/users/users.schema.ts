import * as v from "valibot";

const createUserBody = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.nonEmpty()),
});

const updateUserBody = v.pipe(
  v.object({
    name: v.optional(v.pipe(v.string(), v.nonEmpty())),
    email: v.optional(v.pipe(v.string(), v.email())),
    password: v.optional(v.pipe(v.string(), v.nonEmpty())),
  }),
  v.check((input) => {
    return Object.keys(input).length > 0;
  }, "At least one field must be provided to update (name, email, password)")
);

const userParams = v.object({
  userId: v.pipe(v.string(), v.uuid()),
});

export const findOneUserSchema = v.object({
  params: userParams,
});

export const createUserSchema = v.object({
  body: createUserBody,
});

export const updateUserSchema = v.object({
  body: updateUserBody,
  params: userParams,
});

export const deleteUserSchema = v.object({
  params: userParams,
});

export type FindOneUserSchema = v.InferInput<typeof findOneUserSchema>;
export type CreateUserSchema = v.InferInput<typeof createUserSchema>;
export type UpdateUserSchema = v.InferInput<typeof updateUserSchema>;
export type DeleteUserSchema = v.InferInput<typeof deleteUserSchema>;
