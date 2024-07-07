import Argon2Utils from "@/utils/argon";
import { eq } from "drizzle-orm";

import { UserTable } from "@/drizzle/schema";
import db from "@/drizzle";
import { SigninUserSchema } from "./auth.schema";
import JwtUtils from "@/utils/jwt";
import logger from "@/lib/logger";
import { NotFoundError, UnauthorizedError } from "@/lib/errors";

class AuthService {
  async signin(body: SigninUserSchema["body"]) {
    const user = await db.query.UserTable.findFirst({
      columns: { userId: true, email: true, password: true },
      where: eq(UserTable.email, body.email),
    });

    if (!user) {
      logger.debug(`User with email ${body.email} not found`);
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await Argon2Utils.verify(
      user.password,
      body.password
    );

    if (!isPasswordValid) {
      logger.debug(`Invalid password for user with email ${body.email}`);
      throw new UnauthorizedError("Invalid credentials");
    }

    const accessToken = JwtUtils.sign({ userId: user.userId });

    return accessToken;
  }
}

export default AuthService;
