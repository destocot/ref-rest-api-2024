import { Router } from "express";
import UsersController from "./users.controller";
import validateResource from "@/middleware/validate-resource";
import {
  deleteUserSchema,
  findOneUserSchema,
  updateUserSchema,
} from "./users.schema";
import UsersService from "./users.service";

const userRouter = Router();

const usersService = new UsersService();
const usersController = new UsersController(usersService);

userRouter.get("/", usersController.findAll);

userRouter.get(
  "/:userId",
  validateResource(findOneUserSchema),
  usersController.findOne
);

userRouter.post("/", usersController.create);

userRouter.patch(
  "/:userId",
  validateResource(updateUserSchema),
  usersController.update
);

userRouter.delete(
  "/:userId",
  validateResource(deleteUserSchema),
  usersController.remove
);

export default userRouter;
