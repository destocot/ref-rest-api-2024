import * as schema from "@/drizzle/schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export type Schema = typeof schema;

export type Database = PostgresJsDatabase<Schema>;
