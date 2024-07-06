import type { Database, Schema } from "@/lib/types";
import Argon2Utils from "@/utils/argon2.utils";
import { eq, getTableColumns } from "drizzle-orm";

class UsersService {
  private readonly db: Database;
  private readonly usersTable: Schema["UserTable"];

  constructor(db: Database, UserTable: Schema["UserTable"]) {
    this.db = db;
    this.usersTable = UserTable;
  }

  async findAll() {
    return await this.db.query.UserTable.findMany();
  }

  async findOne(userId: string) {
    const user = await this.db.query.UserTable.findFirst({
      where: eq(this.usersTable.userId, userId),
    });

    if (!user) return null;

    return user;
  }

  async create(body: any) {
    if (!body.name || !body.email || !body.password) return;

    const hashedPassword = await Argon2Utils.hashPassword(body.password);

    await this.db.insert(this.usersTable).values({
      name: body.name,
      email: body.email,
      hashedPassword,
    });
  }

  async update(userId: string, body: any) {
    if (!body.name && !body.email && !body.password) return;

    const usersTableColumns = getTableColumns(this.usersTable);

    const columns: Partial<typeof this.usersTable.$inferInsert> = {};

    for (const column in usersTableColumns) {
      if (body[column]) columns[column as keyof typeof columns] = body[column];
    }

    if (body.password) {
      columns.hashedPassword = await Argon2Utils.hashPassword(body.password);
    }

    console.log(columns);

    await this.db
      .update(this.usersTable)
      .set(columns)
      .where(eq(this.usersTable.userId, userId));
  }

  async remove(userId: string) {
    await this.db
      .delete(this.usersTable)
      .where(eq(this.usersTable.userId, userId));
  }
}

export default UsersService;
