import type { NextFunction, Request, Response } from "express";
import UsersService from "@/resources/users/users.service";
import { CreateUserSchema } from "@/resources/users/users.schema";
import { SigninUserSchema } from "./auth.schema";
import AuthService from "./auth.service";
import { PostgresError } from "postgres";
import { ConflictError } from "@/lib/errors";

class AuthController {
  private readonly usersService: UsersService;
  private readonly authService: AuthService;

  constructor(usersService: UsersService, authService: AuthService) {
    this.usersService = usersService;
    this.authService = authService;
  }

  signup = async (
    req: Request<{}, {}, CreateUserSchema["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const body = req.body;

      const [newUser] = await this.usersService.create(body);

      res
        .status(201)
        .json({ data: { acknowledged: true, insertedId: newUser.userId } });
    } catch (err) {
      if (err instanceof PostgresError) {
        switch (err.code) {
          case "23505":
            return next(new ConflictError("Email already exists"));
        }
      }

      next(err);
    }
  };

  signin = async (
    req: Request<{}, {}, SigninUserSchema["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accessToken = await this.authService.signin(req.body);

      res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  signout = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}

export default AuthController;
