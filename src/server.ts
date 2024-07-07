import express from "express";
import morgan from "@/middleware/morgan";
import router from "./routes";
import valibotErrorHandler from "@/middleware/valibot-error-handler";
import errorHandler from "@/middleware/error-handler";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use(valibotErrorHandler);
app.use(errorHandler);

export default app;
