import { Router } from "express";
import usersRouter from "@/resources/users/users.routes";

const router = Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.use("/users", usersRouter);

export default router;
