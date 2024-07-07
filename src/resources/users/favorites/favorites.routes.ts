import { Router } from "express";
import FavoritesController from "./favorites.controller";
import FavoritesService from "./favorites.service";

const favoritesRouter = Router({ mergeParams: true });

const favoritesService = new FavoritesService();
const favoritesController = new FavoritesController(favoritesService);

favoritesRouter.get("/", favoritesController.findAll);

export default favoritesRouter;
