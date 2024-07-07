import app from "@/server";
import { createServer } from "node:http";
import type { Server } from "node:http";
import logger from "@/lib/logger";

const port = process.env.PORT ?? 5001;

let server: Server;

function main() {
  server = createServer(app);
  server.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

main();

process.on("unhandledRejection", (err: Error) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  throw err;
});

process.on("uncaughtException", (err: Error) => {
  logger.error(err.name + " - " + err.message);

  console.log(err);

  logger.error("UNHANDLED EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

process.on("SIGTERM", (err: Error) => {
  server.close(() => {
    logger.info("SIGTERM RECEIVED. Shutting down gracefully");
  });
});
