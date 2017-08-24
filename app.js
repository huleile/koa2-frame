"use strict";
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const koalogger = require('koa-logger');
const cors = require('koa2-cors');
const CONFIG = require('config');
const fs = require('fs');
const clogger = require('./common/logger.js').clogger;
const errorHandle = require('./middlewares/error-handle');
const index = require('./routes/index');
//create the upload folder
fs.existsSync(CONFIG.uploadFolder) || fs.mkdirSync(CONFIG.uploadFolder);
// error handler
onerror(app);
// middlewares
app.use(bodyparser);
app.use(json());
app.use(cors());
app.use(koalogger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(errorHandle);
app.use(views(__dirname + '/views', {extension: 'ejs'}));

// routes
app.use(index.routes(), index.allowedMethods());

process.on('uncaughtException', function(err) {
    console.error(err.stack);
    clogger.error(err.message, {
        stack: err.stack
    });
});
process.on('unhandledRejection', function(err, p) {
    console.error(err.stack);
    clogger.error("Unhandled Rejection", {promise: p, message: err.message, stack: err.stack});
});


module.exports = app;
