"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
const winston = require("winston");
/**
 * Create a logger instance to write log messages in JSON format.
 *
 * @param loggerName - a name of a logger that will be added to all messages
 */
function createLogger(loggerName) {
    return winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { name: loggerName },
        transports: [
            new winston.transports.Console()
        ]
    });
}
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map