import { Router } from "express";
import MangasController from "./mangas.controller";
import validateResource from "@/middleware/validate-resource";
import {
  createMangaSchema,
  deleteMangaSchema,
  findOneMangaSchema,
  updateMangaSchema,
} from "./mangas.schema";
import MangasService from "./mangas.service";

const mangaRouter = Router();

const mangasService = new MangasService();
const mangasController = new MangasController(mangasService);

mangaRouter.get("/", mangasController.findAll);

mangaRouter.get(
  "/:mangaId",
  validateResource(findOneMangaSchema),
  mangasController.findOne
);

mangaRouter.post(
  "/",
  validateResource(createMangaSchema),
  mangasController.create
);

mangaRouter.patch(
  "/:mangaId",
  validateResource(updateMangaSchema),
  mangasController.update
);

mangaRouter.delete(
  "/:mangaId",
  validateResource(deleteMangaSchema),
  mangasController.remove
);

export default mangaRouter;
