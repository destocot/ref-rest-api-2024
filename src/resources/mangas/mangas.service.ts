import { eq } from "drizzle-orm";
import type {
  CreateMangaSchema,
  DeleteMangaSchema,
  FindOneMangaSchema,
  UpdateMangaSchema,
} from "./mangas.schema";

import { MangaTable } from "@/drizzle/schema";
import db from "@/drizzle";

class MangasService {
  async findAll() {
    return await db.query.MangaTable.findMany();
  }

  async findOne(mangaId: FindOneMangaSchema["params"]["mangaId"]) {
    const manga = await db.query.MangaTable.findFirst({
      where: eq(MangaTable.mangaId, mangaId),
    });

    if (!manga) return null;

    return manga;
  }

  async create(values: CreateMangaSchema["body"]) {
    return await db
      .insert(MangaTable)
      .values({
        title: values.title,
        authorFname: values.authorFname,
        authorLname: values.authorLname,
        status: values.status,
        publishedAt: new Date(values.publishedAt),
      })
      .returning({ mangaId: MangaTable.mangaId });
  }

  async update(
    mangaId: UpdateMangaSchema["params"]["mangaId"],
    values: UpdateMangaSchema["body"]
  ) {
    const { publishedAt, ...rest } = values;

    return await db
      .update(MangaTable)
      .set({
        ...rest,
        publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      })
      .where(eq(MangaTable.mangaId, mangaId))
      .returning({ mangaId: MangaTable.mangaId });
  }

  async remove(mangaId: DeleteMangaSchema["params"]["mangaId"]) {
    return await db
      .delete(MangaTable)
      .where(eq(MangaTable.mangaId, mangaId))
      .returning({ mangaId: MangaTable.mangaId });
  }
}

export default MangasService;
