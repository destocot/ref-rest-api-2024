import type { NextFunction, Request, Response } from "express";
import UsersService from "@/resources/users/users.service";
import { CreateUserSchema } from "@/resources/users/users.schema";
import { SigninUserSchema } from "./auth.schema";
import AuthService from "./auth.service";

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
      next(err);
    }
  };

  signin = async (
    req: Request<{}, {}, SigninUserSchema["body"]>,
    res: Response
  ) => {
    const accessToken = await this.authService.signin(req.body);

    res.status(200).json({ accessToken });
  };

  signout = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };
}

export default AuthController;
