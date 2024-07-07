import ArgonUtils from "@/utils/argon";
import { eq } from "drizzle-orm";
import type {
  CreateUserSchema,
  DeleteUserSchema,
  FindOneUserSchema,
  UpdateUserSchema,
} from "./users.schema";

import { UserTable } from "@/drizzle/schema";
import db from "@/drizzle";

class UsersService {
  async findAll() {
    return await db.query.UserTable.findMany();
  }

  async findOne(userId: FindOneUserSchema["params"]["userId"]) {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.userId, userId),
    });

    if (!user) return null;

    return user;
  }

  async create(body: CreateUserSchema["body"]) {
    const hashedPassword = await ArgonUtils.hash(body.password);

    return await db
      .insert(UserTable)
      .values({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      })
      .returning({ userId: UserTable.userId });
  }

  async update(
    userId: UpdateUserSchema["params"]["userId"],
    body: UpdateUserSchema["body"]
  ) {
    if (body.password) {
      const hashedPassword = await ArgonUtils.hash(body.password);
      body.password = hashedPassword;
    }

    return await db
      .update(UserTable)
      .set(body)
      .where(eq(UserTable.userId, userId))
      .returning({ userId: UserTable.userId });
  }

  async remove(userId: DeleteUserSchema["params"]["userId"]) {
    return await db
      .delete(UserTable)
      .where(eq(UserTable.userId, userId))
      .returning({ userId: UserTable.userId });
  }
}

export default UsersService;
