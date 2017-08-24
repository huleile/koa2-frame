"use strict";
const router = require('koa-router')();
const Config = require('config');
const models = require('../models');
const {Book} = models;


router.get('/', async (ctx, next) => {
  const name = Config.config;
  await ctx.render('index', {
    title:  `Hello Koa 2! ${name}`
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = `koa2 string ${Config.config}`;
})

router.get('/json', async (ctx, next) => {
  let books = await Book.findAll();
  ctx.body = {
    title: 'koa2 json',
    config: Config.config,
    books
  }
});

module.exports = router;
