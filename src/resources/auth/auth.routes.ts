import { Router } from "express";
import AuthController from "./auth.controller";
import UsersService from "@/resources/users/users.service";
import validateResource from "@/middleware/validate-resource";
import { createUserSchema } from "@/resources/users/users.schema";
import { signinUserSchema } from "./auth.schema";
import AuthService from "./auth.service";

const authRouter = Router();

const usersService = new UsersService();
const authService = new AuthService();
const authController = new AuthController(usersService, authService);

authRouter.post(
  "/signup",
  validateResource(createUserSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  validateResource(signinUserSchema),
  authController.signin
);

authRouter.get("/signout", authController.signout);

export default authRouter;
