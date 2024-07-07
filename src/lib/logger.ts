import winston, { format, LoggerOptions } from "winston";
import env from "@/lib/env-config";

const { combine, colorize, align, printf, timestamp } = format;

const loggerLevel = env.NODE_ENV === "development" ? "debug" : "info";

const loggerFormat = combine(
  format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  })(),
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const options: LoggerOptions = {
  level: loggerLevel,
  format: loggerFormat,
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(options);

export default logger;
