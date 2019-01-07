const winston = require('winston')
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()]
})

const loggerWrapper = {
  info: (message) => logger.info(message),
  error: (message) => logger.error(message)
}

module.exports = loggerWrapper
