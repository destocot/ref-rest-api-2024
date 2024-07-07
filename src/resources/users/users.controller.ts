import type { Request, Response } from "express";
import UsersService from "./users.service";
import type {
  CreateUserSchema,
  DeleteUserSchema,
  FindOneUserSchema,
  UpdateUserSchema,
} from "./users.schema";
import { error } from "node:console";

class UsersController {
  private readonly usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  findAll = async (req: Request, res: Response) => {
    const users = await this.usersService.findAll();
    res.status(200).json({ data: users });
  };

  findOne = async (
    req: Request<FindOneUserSchema["params"]>,
    res: Response
  ) => {
    const userId = req.params.userId;

    const user = await this.usersService.findOne(userId);

    res.status(200).json({ data: user });
  };

  create = async (req: Request, res: Response) => {
    res.status(301).json({ data: { newUrl: "/api/auth/signup" } });
  };

  update = async (
    req: Request<UpdateUserSchema["params"], {}, UpdateUserSchema["body"]>,
    res: Response
  ) => {
    const userId = req.params.userId;
    const body = req.body;

    const [updatedUser] = await this.usersService.update(userId, body);
    res
      .status(200)
      .json({ data: { acknowledged: true, updatedId: updatedUser.userId } });
  };

  remove = async (req: Request<DeleteUserSchema["params"]>, res: Response) => {
    const userId = req.params.userId;

    const [deletedUser] = await this.usersService.remove(userId);
    res.status(200).json({
      data: {
        acknowledged: true,
        deletedId: deletedUser.userId,
      },
    });
  };
}

export default UsersController;
