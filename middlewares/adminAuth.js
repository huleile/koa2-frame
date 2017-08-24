'use strict';
const h = require('../common/helper');
const User = require('../models').User;

module.exports = async (ctx, next) => {
    const user = ctx.user;
    h.assert(user, "LoginRequired");

    let info = await User.findById(user.id);
    h.assert(info, "LoginRequired");

    h.assert(info.name == "admin" && info.phone == "000000", 'AdminRequired');

    await next();
};
