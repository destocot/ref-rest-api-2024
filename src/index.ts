import app from "./server";
import { createServer } from "node:http";
import { type Server } from "node:http";

const port = process.env.PORT ?? 5001;

let server: Server;

function main() {
  server = createServer(app);

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

main();

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Closing server gracefully...");
  });
});
