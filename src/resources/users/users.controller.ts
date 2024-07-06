import type { Request, Response } from "express";
import db from "@/drizzle";
import { UserTable } from "@/drizzle/schema";
import UsersService from "./users.service";

const usersService = new UsersService(db, UserTable);

class UsersController {
  async findAll(req: Request, res: Response) {
    const users = await usersService.findAll();
    res.status(200).json({ data: users });
  }

  async findOne(req: Request, res: Response) {
    const userId = req.params.userId;

    const user = await usersService.findOne(userId);

    res.status(200).json({ data: user });
  }

  async create(req: Request, res: Response) {
    const body = req.body;

    await usersService.create(body);

    res.status(201).json({ data: { success: true } });
  }

  async update(req: Request, res: Response) {
    const userId = req.params.userId;
    const body = req.body;

    await usersService.update(userId, body);
    res.status(200).json({ data: { success: true } });
  }

  async remove(req: Request, res: Response) {
    const userId = req.params.userId;

    await usersService.remove(userId);
    res.status(200).json({ data: { success: true } });
  }
}

export default UsersController;
