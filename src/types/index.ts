import { MangaTable, UserTable } from "@/drizzle/schema";

type SelectUser = typeof UserTable.$inferSelect;

export type InsertManga = typeof MangaTable.$inferInsert;

import type { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export type JwtPayload = Pick<DefaultJwtPayload, "iat" | "exp"> & {
  userId: SelectUser["userId"];
};
