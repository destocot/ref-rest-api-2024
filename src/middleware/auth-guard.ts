import { JwtPayload } from "@/types";
import JwtUtils from "@/utils/jwt";
import type { Request, Response, NextFunction } from "express";

const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) return res.sendStatus(401);

  try {
    const payload = JwtUtils.verify(accessToken);

    console.log("payload", payload);

    req.user = payload as JwtPayload;
  } catch (err) {
    return res.sendStatus(500);
  }

  next();
};

export default authGuard;
