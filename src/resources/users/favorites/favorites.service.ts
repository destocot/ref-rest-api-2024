import { eq } from "drizzle-orm";

import { FavoriteTable } from "@/drizzle/schema";
import db from "@/drizzle";

class FavoritesService {
  async findAll(userId: string) {
    return await db.query.FavoriteTable.findMany({
      columns: {},
      where: eq(FavoriteTable.userId, userId),
      with: { manga: true },
    });
  }
}

export default FavoritesService;
