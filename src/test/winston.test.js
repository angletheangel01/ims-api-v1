const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format:winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
    
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.Console({
        format:winston.format.simple()
    }),
    new winston.transports.File({filename:'./src/test/test.log'})
  ],
});
logger.info("test")