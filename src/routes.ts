import { Router } from "express";
import usersRouter from "@/resources/users/users.routes";
import authRouter from "@/resources/auth/auth.routes";
import { NotFoundError } from "@/lib/errors";

const router = Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.use("/api/auth", authRouter);
router.use("/api/users", usersRouter);

router.all("*", (req, res) => {
  throw new NotFoundError("Route not found");
});

export default router;
