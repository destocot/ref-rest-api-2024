import * as v from "valibot";

const Status = ["publishing", "finished"] as const;

const createMangaBody = v.object({
  title: v.pipe(v.string(), v.nonEmpty()),
  authorFname: v.pipe(v.string(), v.nonEmpty()),
  authorLname: v.pipe(v.string(), v.nonEmpty()),
  status: v.picklist(Status),
  publishedAt: v.union([v.date(), v.pipe(v.string(), v.isoTimestamp())]),
  image: v.optional(v.pipe(v.string(), v.nonEmpty())),
});

const updateMangaBody = v.pipe(
  v.object({
    title: v.optional(v.pipe(v.string(), v.nonEmpty())),
    authorFname: v.optional(v.pipe(v.string(), v.nonEmpty())),
    authorLname: v.optional(v.pipe(v.string(), v.nonEmpty())),
    status: v.optional(v.picklist(Status)),
    publishedAt: v.optional(
      v.union([v.date(), v.pipe(v.string(), v.isoTimestamp())])
    ),
    image: v.optional(v.pipe(v.string(), v.nonEmpty())),
  }),
  v.check((input) => {
    return Object.keys(input).length > 0;
  }, "At least one field must be provided to update (title, authorFname, authorLname, status, publishedAt, image)")
);

const mangaParams = v.object({
  mangaId: v.pipe(v.string(), v.uuid()),
});

export const findOneMangaSchema = v.object({
  params: mangaParams,
});

export const createMangaSchema = v.object({
  body: createMangaBody,
});

export const updateMangaSchema = v.object({
  body: updateMangaBody,
  params: mangaParams,
});

export const deleteMangaSchema = v.object({
  params: mangaParams,
});

export type FindOneMangaSchema = v.InferInput<typeof findOneMangaSchema>;
export type CreateMangaSchema = v.InferInput<typeof createMangaSchema>;
export type UpdateMangaSchema = v.InferInput<typeof updateMangaSchema>;
export type DeleteMangaSchema = v.InferInput<typeof deleteMangaSchema>;
