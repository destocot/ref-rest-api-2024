import { UnauthorizedError } from "@/lib/errors";
import logger from "@/lib/logger";
import { JwtPayload } from "@/types";
import JwtUtils from "@/utils/jwt";
import type { Request, Response, NextFunction } from "express";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    throw new UnauthorizedError("Access token is required");
  }

  try {
    const payload = JwtUtils.verify(accessToken);

    logger.debug(payload);

    req.user = payload as JwtPayload;
  } catch (err) {
    throw new UnauthorizedError("Invalid access token");
  }

  next();
};

export default authGuard;
