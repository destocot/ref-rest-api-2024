import { Router } from "express";
import UsersController from "./users.controller";

const router = Router();

const usersController = new UsersController();

router.get("/", usersController.findAll);

router.get("/:userId", usersController.findOne);

router.post("/", usersController.create);

router.patch("/:userId", usersController.update);

router.delete("/:userId", usersController.remove);

export default router;
