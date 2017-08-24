"use strict";
const router = require('koa-router')();
const Config = require('config');
const models = require('../models');


/**
 * @api {POST} /books		 CreateBook
 * @apiName 			CreateBook
 * @apiGroup 			Book
 * @apiDescription   	创建图书
 * @apiPermission 		token
 * @apiParam   (body) 	  {String}    name         书名
 * @apiParam   (body)     {String}    authot       作者
 * @apiParam   (body)     {Number}    count        发行量
 * @apiSuccess (response) {Number} 		code           消息号
 * @apiSuccess (response) {String} 		message        消息内容
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
    {
	  	"code": 200,
	  	"message": "Success"
   	}
 */
router.post('/', async (ctx, next) => {
  let {name, author, count} = ctx.request.body;
  let book = await models.Book.create({name, author, count});
  ctx.body = {book};
});


/**
 * @api {GET} /rooms/creation		 MyCreatedRooms
 * @apiName 			MyCreatedRooms
 * @apiGroup 			Live
 * @apiDescription   	我创建的直播
 * @apiPermission 		token
 * @apiParam   (query) 	  {Number}    [page = 1] 分页
 * @apiParam   (query)    {Number}    [limit = 10] 每页数量
 * @apiParam   (query)    {String}    [search] 搜索关键字, 目前支持课程名称
 * @apiSuccess (response) {Number} 		code 消息号
 * @apiSuccess (response) {Object} 		data 消息内容
 * @apiSuccess (response) {Object[]} 	data.books            图书列表
 * @apiSuccess (response) {Number} 		data.books.id 				   图书 ID
 * @apiSuccess (response) {String} 		data.books.name     		 图书名称
 * @apiSuccess (response) {String} 		data.books.author			   图书作者
 * @apiSuccess (response) {Number} 		data.books.count		     图书发行量
 * @apiSuccess (response) {Number} 		data.bookCount 				图书数
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
    {
	  	"code": 200,
	  	"data": {
  			"bookCount": 666,
  			"books": [
  				{
  					"id": 123,
  					"name": "大数据分析",
  					"author": "王晶",
  					"count": 1501573670369
  				}
  			]
  		}
   	}
 */
router.get('/', async(ctx, next) => {
  let {page = 1, limit = 10} = ctx.query;
  let books = await models.Book.findAll();
  ctx.body = {books};
});


router.get('/index', async(ctx, next) => {
  const name = Config.config;
  await ctx.render('index', {
    title:  `Hello Koa 2! ${name}`
  });
});

router.put('/:id', async (ctx, next) => {
  let id = ctx.params.id;
  await models.Book.update({count: 10000}, {where: {id}});
  ctx.body = h.S;
});
module.exports = router;
