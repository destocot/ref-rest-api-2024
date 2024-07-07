import _morgan from "morgan";
import logger from "@/lib/logger";

const stream = {
  write: (message: string) => {
    logger.http(message);
  },
};

type Format = "combined" | "common" | "dev" | "short" | "tiny";

const morgan = (format: Format) => {
  return _morgan(format, { stream });
};

export default morgan;
