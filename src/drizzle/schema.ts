import { relations, sql } from "drizzle-orm";
import { pgEnum, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { pgTable, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
  userId: uuid("user_id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),

  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
});

export const UserTableRelations = relations(UserTable, ({ many }) => ({
  favorites: many(FavoriteTable),
}));

export const StatusEnum = pgEnum("status_enum", ["publishing", "finished"]);

export const MangaTable = pgTable("mangas", {
  mangaId: uuid("manga_id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),

  title: varchar("title").notNull(),
  authorFname: varchar("author_fname").notNull(),
  authorLname: varchar("author_lname").notNull(),
  status: StatusEnum("status").notNull(),
  publishedAt: timestamp("published_at", { mode: "date" }).notNull(),
  image: varchar("image"),
});

export const MangaTableRelations = relations(MangaTable, ({ many }) => ({
  favorites: many(FavoriteTable),
}));

export const FavoriteTable = pgTable(
  "favorites",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UserTable.userId),
    mangaId: uuid("manga_id")
      .notNull()
      .references(() => MangaTable.mangaId),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.mangaId] }),
  })
);

export const FavoriteTableRelations = relations(FavoriteTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [FavoriteTable.userId],
    references: [UserTable.userId],
  }),
  manga: one(MangaTable, {
    fields: [FavoriteTable.mangaId],
    references: [MangaTable.mangaId],
  }),
}));
