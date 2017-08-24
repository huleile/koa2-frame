"use strict";
const router = require('koa-router')();
const uploader = require('../middlewares/uploader');
const path = require('path');
const uploadFolder = require('config').uploadFolder;


/*
  let form = new FormData();
  form.append("image", "iu1.jpg");
 */
router.post('/image', uploader.single('image'), async(ctx, next) => {
  let {req: {file}} = ctx;
  h.assert(ctx.req.file, "PleaseUploadFile");
  const ext = path.extname(file.filename);
  const base = path.basename(file.filename, ext);
  const filepath = file.path;
  ctx.body = h.Success;
});



module.exports = router;
