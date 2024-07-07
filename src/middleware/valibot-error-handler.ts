import { BadRequestError } from "@/lib/errors";
import logger from "@/lib/logger";
import type { Request, Response, NextFunction } from "express";
import { flatten, ValiError } from "valibot";

const valibotErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValiError) {
    logger.debug(`${err.name} - ${err.message}`);

    const errors = flatten(err.issues);
    throw new BadRequestError("Invalid data", errors);
  }

  next(err);
};

export default valibotErrorHandler;
