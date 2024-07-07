import Argon2Utils from "@/utils/argon";
import { eq } from "drizzle-orm";

import { UserTable } from "@/drizzle/schema";
import db from "@/drizzle";
import { SigninUserSchema } from "./auth.schema";
import JwtUtils from "@/utils/jwt";

class AuthService {
  async signin(body: SigninUserSchema["body"]) {
    const user = await db.query.UserTable.findFirst({
      columns: { userId: true, email: true, password: true },
      where: eq(UserTable.email, body.email),
    });

    if (!user) return null;

    const isPasswordValid = await Argon2Utils.verify(
      user.password,
      body.password
    );

    if (!isPasswordValid) return null;

    const accessToken = JwtUtils.sign({ userId: user.userId });

    return accessToken;
  }
}

export default AuthService;
