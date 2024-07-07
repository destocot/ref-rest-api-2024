import env from "@/lib/env-config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import logger from "@/lib/logger";

async function main() {
  const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
  const db = drizzle(migrationClient);

  try {
    logger.info("Migrating database...");
    await migrate(db, { migrationsFolder: "migrations" });
    logger.info("Database migrated successfully!");
  } catch (err) {
    logger.error("Error migrating database:", err);
  } finally {
    await migrationClient.end();
  }
}

main();
