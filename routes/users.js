"use strict";
const router = require('koa-router')();
const _ = require('lodash');

const auth = require('../middlewares/auth');
const clogger = require('../common/logger').clogger;
const adminAuth = require('../middlewares/adminAuth');
const models = require('../models');

// 设置路由的前缀
// get('/') 则为 /users,此处在 index.js 中已设置
// router.prefix('/users')

router.get('/', auth, adminAuth, async (ctx, next) => {
  let {user, query} = ctx;
  console.log("query: ", query, "user: ", user);
  let users = await models.User.findAll();
  ctx.body = h.r(users);
});

router.post('/', auth, adminAuth, async (ctx, next) => {
  let {name, password, phone, email} = ctx.request.body;
  h.assert(name && password && phone && email, 'ParameterLacked');
  h.assert(_.isString(name) && name.length <= 12 && name.length >= 4, "InvalidParameter");
  h.assert(_.isString(password) && password.length <= 15 && password.length >= 6, "InvalidPassword");
  h.assert(_.isString(phone) && h.mobileReg.test(phone), "InvalidPhone");
  h.assert(_.isString(email) && h.emailReg.test(email), "InvalidEmail");
  const user = await models.User.create({name, password, phone, email});
  ctx.body = h.r(user);
});

/**
 * @api {POST} /users/login Login
 * @apiName Login
 * @apiGroup User
 * @apiDescription 登录
 * @apiParam (body) {String} account 帐号
 * @apiParam (body) {Number} password 密码
 */
router.post('/login', async (ctx, next) => {
  let {noRefresh} = ctx.query;
  let {body} = ctx.body;
  let {account, password} = body;

  h.assert(account && password, "InvalidParameter");

  let refresh = noRefresh ? false : true;
  let user = await models.User.login(account, password, refresh);

  user = user.toJSON();
  user = _.omit(user, ['password']);

  clogger.info('User login', {id: user.id, name: user.name});
  ctx.body = h.r(user);
});

module.exports = router
