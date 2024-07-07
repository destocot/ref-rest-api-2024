import jwt from "jsonwebtoken";
import type { JwtPayload } from "@/types";
import env from "@/lib/env-config";

class JwtUtils {
  static sign(payload: JwtPayload) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "5m",
    });
  }

  static verify(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  }
}

export default JwtUtils;
