import winston from "winston";
import ecsFormat from "@elastic/ecs-winston-format";
import expressWinston from "express-winston";

export const logger = winston.createLogger({
    format: ecsFormat({
        convertReqRes: true,
    }),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "combined.log",
        }),
    ],
});

export const expressLogger = expressWinston.logger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "express.log",
        }),
    ],
    meta: true,
});
