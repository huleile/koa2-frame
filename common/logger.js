'use strict';
const log4js = require('log4js');

log4js.configure({
    appenders: [
        {
            type: 'console',
            category: 'console'
        },
        {
            type: "file", // file
            category: 'console',
            filename: __dirname + '/../logs/info.log',
            maxLogSize: 1048000,
            backups: 100
        },
        {
            type: "file", // file
            category: 'socket',
            filename: __dirname + '/../logs/socket.log',
            maxLogSize: 1048000,
            backups: 100
        }
    ],
    replaceConsole: true
});

let SocketLogger = log4js.getLogger('socket');
let CommonLogger = log4js.getLogger('console');
let logger = {slogger: SocketLogger,  clogger: CommonLogger};

module.exports = logger;
