import { Router } from "express";
import userRouter from "@/resources/users/users.routes";
import authRouter from "@/resources/auth/auth.routes";
import mangaRouter from "@/resources/mangas/mangas.routes";
import { NotFoundError } from "@/lib/errors";
import authGuard from "./middleware/auth-guard";

const router = Router();

router.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

router.use("/api/auth", authRouter);
router.use("/api/users", userRouter);
router.use("/api/mangas", authGuard, mangaRouter);

router.all("*", (req, res) => {
  throw new NotFoundError("Route not found");
});

export default router;
