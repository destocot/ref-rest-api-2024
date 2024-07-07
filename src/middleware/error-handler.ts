import type { Request, Response, NextFunction } from "express";
import { CustomError } from "@/lib/errors";
import logger from "@/lib/logger";
import { DrizzleError } from "drizzle-orm";
import { PostgresError } from "postgres";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { message, errors } = err.serializeErrors();

    logger.debug(`${err.statusCode} - ${message}`);

    return res.status(err.statusCode).json({ message, errors });
  }

  if (err instanceof DrizzleError) {
    logger.debug("THROWING INSTANCE OF DRIZZLE ERROR");
  }

  if (err instanceof PostgresError) {
    logger.debug(`PostgresError: ${err.code} - ${err.message}`);

    switch (err.code) {
      case "23505":
        const field = err.detail?.match(/Key \((.*?)\)=/)?.[1] ?? "unknown";
        const value = err.detail?.match(/\((.*?)\)/)?.[1] ?? "unknown";
        const table = err.table_name ?? "unknown";
        const constraint = err.constraint_name ?? "unknown";

        return res.status(400).json({
          error: `Duplicate key value '${value}' violates unique constraint '${constraint}' on field '${field}' in table '${table}'`,
        });
      default:
        return res.status(400).json({ error: err.message });
    }
  }

  logger.error(`errorHandler: ${err}`);

  return res.status(500).json({ error: err.message });
};

export default errorHandler;
