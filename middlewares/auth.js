'use strict';
const h = require('../common/helper');
const redis = require('../common/redis');
const User = require('../models').User;
/*
*   Auth user by token, get user info from redis. set user to req.user, if user is not logined response code is 3
*/
module.exports = async (ctx, next) => {
    const token = ctx.request.headers.authorization;
    h.assert(token, "LoginRequired");

    let info = await redis.get(token);
    h.assert(info, "LoginRequired");

    const userInfo = JSON.parse(info)
    ctx.user = await User.findById(userInfo.id);
    await next();
};
