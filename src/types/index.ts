import { UserTable } from "@/drizzle/schema";

type SelectUser = typeof UserTable.$inferSelect;

import type { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export type JwtPayload = Pick<DefaultJwtPayload, "iat" | "exp"> & {
  userId: SelectUser["userId"];
};
