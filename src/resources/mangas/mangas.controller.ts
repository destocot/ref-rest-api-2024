import type { NextFunction, Request, Response } from "express";
import MangasService from "./mangas.service";
import type {
  CreateMangaSchema,
  DeleteMangaSchema,
  FindOneMangaSchema,
  UpdateMangaSchema,
} from "./mangas.schema";

class MangasController {
  private readonly mangasService: MangasService;

  constructor(mangasService: MangasService) {
    this.mangasService = mangasService;
  }

  findAll = async (req: Request, res: Response) => {
    const mangas = await this.mangasService.findAll();
    res.status(200).json({ data: mangas });
  };

  findOne = async (
    req: Request<FindOneMangaSchema["params"]>,
    res: Response
  ) => {
    const mangaId = req.params.mangaId;

    const manga = await this.mangasService.findOne(mangaId);

    res.status(200).json({ data: manga });
  };

  create = async (
    req: Request<{}, {}, CreateMangaSchema["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;

      const [newManga] = await this.mangasService.create(body);

      res
        .status(201)
        .json({ data: { acknowledged: true, insertedId: newManga.mangaId } });
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request<UpdateMangaSchema["params"], {}, UpdateMangaSchema["body"]>,
    res: Response
  ) => {
    const mangaId = req.params.mangaId;
    const body = req.body;

    const [updatedManga] = await this.mangasService.update(mangaId, body);
    res
      .status(200)
      .json({ data: { acknowledged: true, updatedId: updatedManga.mangaId } });
  };

  remove = async (req: Request<DeleteMangaSchema["params"]>, res: Response) => {
    const mangaId = req.params.mangaId;

    const [deletedManga] = await this.mangasService.remove(mangaId);
    res.status(200).json({
      data: {
        acknowledged: true,
        deletedId: deletedManga.mangaId,
      },
    });
  };
}

export default MangasController;
