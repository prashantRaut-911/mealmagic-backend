const winston = require('winston');
const path = require('path');

const logger = new winston.Logger({
    transports : [
        new winston.transports.Console({
            name : 'console-log',
            colorize: true,
            timestamp : true
        }),
        new winston.transports.File({
            name : 'info-file',
            filename: path.join(__dirname,'../logs/app.log'),
            level :'info'
        }),
        new winston.transports.File({
            name : 'error-file',
            filename : path.join(__dirname,'../logs/error.log'), 
            level: 'error'})
    ]
});

logger.stream = {
    write : (message) => {
        logger.info(message.trim());
    }
};

module.exports = logger;
