"use strict";
const multer = require('koa-multer');
const config = require('config');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.uploadFolder);
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    let basename = path.basename(file.originalname, ext);
    let filename = `${file.fieldname}-${basename}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const uploader = multer({storage});

module.exports = uploader;
