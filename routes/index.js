"use strict";
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');

const join = path.join;
const basename = path.basename;
const bname = basename(module.filename);


fs.readdirSync(__dirname)
  .filter(f => f.indexOf(".") !== 0 && f !== bname)
  .forEach(f => {
    const subRouter = require(join(__dirname, f));
    const prefix = (f === 'home.js') ? '/' : `/${basename(f, '.js')}`;
    router.use(prefix, subRouter.routes(), subRouter.allowedMethods());
  })

module.exports = router;
