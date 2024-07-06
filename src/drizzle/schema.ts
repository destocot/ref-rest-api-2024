import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  userId: uuid("user_id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),

  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  hashedPassword: varchar("hashed_password").notNull(),
});
