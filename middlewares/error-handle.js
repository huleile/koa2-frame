'use strict';
const clogger = require('../common/logger').clogger;
const errors = require('../common/errors.json');
const h = require('../common/helper');

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        if (errors[e.message]) {
            ctx.body = h.error(e.message);
            clogger.info(e);
        } else {
            ctx.body = "Internal Server Error";
            ctx.status = 500;
            clogger.error(e);
        }
    }
}
