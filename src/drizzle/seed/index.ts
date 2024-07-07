import env from "@/lib/env-config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import logger from "@/lib/logger";
import { FavoriteTable, MangaTable, UserTable } from "../schema";
import { faker } from "@faker-js/faker";
import ArgonUtils from "@/utils/argon";
import fs from "node:fs";
import { mangaData } from "./manga-data";

const seedClient = postgres(env.DATABASE_URL, { max: 1 });
const db = drizzle(seedClient);

async function reset() {
  const resetArg = process.argv[2];

  if (resetArg === "--reset") {
    logger.info("Resetting database...");
    await db.delete(FavoriteTable);
    await db.delete(MangaTable);
    await db.delete(UserTable);
  }
}

function generateUser() {
  return {
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    password: faker.internet.password({ memorable: true }),
  };
}

async function main() {
  await reset();

  try {
    logger.info("Seeding users...");

    const users = Array.from({ length: 2 }, generateUser);

    const usersFile = "users.json";
    logger.info(`Writing users to ${usersFile}...`);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await ArgonUtils.hash(user.password);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    const seededUsers = await db
      .insert(UserTable)
      .values(hashedUsers)
      .returning({ userId: UserTable.userId });

    const userId1 = seededUsers[0].userId;
    const userId2 = seededUsers[1].userId;

    logger.info("Seeding manga...");

    const seededManga = await db
      .insert(MangaTable)
      .values(mangaData)
      .returning({ mangaId: MangaTable.mangaId });

    const toBeFavoritedByUser1: Array<{ mangaId: string; userId: string }> = [];
    const toBeFavoritedByUser2: Array<{ mangaId: string; userId: string }> = [];

    seededManga.forEach((manga) => {
      const randomForUser1 = Math.round(Math.random());
      const randomForUser2 = Math.round(Math.random());

      if (randomForUser1 === 1)
        toBeFavoritedByUser1.push({ mangaId: manga.mangaId, userId: userId1 });
      if (randomForUser2 === 1)
        toBeFavoritedByUser2.push({ mangaId: manga.mangaId, userId: userId2 });
    });

    logger.info("Seeding favorites...");

    await db.insert(FavoriteTable).values(toBeFavoritedByUser1);
    await db.insert(FavoriteTable).values(toBeFavoritedByUser2);

    logger.info(`Seeded ${toBeFavoritedByUser1.length} favorites for user 1`);
    logger.info(`Seeded ${toBeFavoritedByUser2.length} favorites for user 2`);

    logger.info("Database Seeded successfully!");
  } catch (err) {
    logger.error("Error Seeded database:", err);
  } finally {
    await seedClient.end();
  }
}

main();
