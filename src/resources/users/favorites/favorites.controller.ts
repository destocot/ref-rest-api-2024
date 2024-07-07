import type { Request, Response } from "express";
import FavoritesService from "./favorites.service";

class FavoritesController {
  private readonly favoritesService: FavoritesService;

  constructor(favoritesService: FavoritesService) {
    this.favoritesService = favoritesService;
  }

  findAll = async (req: Request, res: Response) => {
    const userId = req.params.userId;

    const favorites = await this.favoritesService.findAll(userId);

    res.status(200).json({ data: favorites });
  };
}

export default FavoritesController;
