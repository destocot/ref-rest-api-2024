import env from "@/lib/env-config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const queryClient = postgres(env.DATABASE_URL);
const db = drizzle(queryClient, { schema });

export default db;
