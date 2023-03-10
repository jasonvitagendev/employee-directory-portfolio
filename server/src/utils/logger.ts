import winston from "winston";
import ecsFormat from "@elastic/ecs-winston-format";

export const logger = winston.createLogger({
    format: ecsFormat(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "combined.log",
        }),
    ],
});
