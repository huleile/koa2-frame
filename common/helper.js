'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const CONFIG = require('config');
const Errors = require('./errors.json');


const h = {
  ONEDAY: 86400000,

  md5 (str) {
    if(typeof str != 'string') return str;
    // 转换为 BUFFER  处理中文的情况
    let buf = new Buffer(str);
    let content = buf.toString('binary');
    return crypto.createHash('md5').update(content).digest("hex");
  },

  base64 (str) {
    return new Buffer(str).toString('base64');
  },

  r (data) {
    return {code: 200, data};
  },

  Success: {code: 200, message: "Success"},

  assert(data, message, code) {
    if (!data) {
        const err = new Error(message);
        err.code = this.errCode(message);
        err.zh = this.errMessage(message);
        // if provide code, it will overwrite the pre one
        if (typeof code !== "undefined") {
            err.code = code;
        }
        throw err;
    }
  },

  errCode: function (name) {
      const info = Errors[name] || {code: 500000, zh: "服务发生内部错误"};
      return info.code;
  },

  errMessage: function(name) {
      const info = Errors[name] || {code: 500000, zh: "服务发生内部错误"};
      return info.zh;
  },

  error: function(err) {
    return Errors[err];
  },

  ltrim: function (str) {
      return str.replace(/(^s*)/g,"");
  },

  emailReg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,

  mobileReg: /^1\d{10}$/,

  isChinaPhone (phone) {
      // 最普通 11 位
      // +86
      // 中间带空格
      if (!phone) return false;
      phone = phone.replace('+86', '');
      phone = phone.replace(/\s+/g, '');
      return this.mobileReg.test(phone);
  },

  isPhone (val) {
      if (this.isChinaPhone(val)) {
          return true;
      } else {
          return /^\d{10}$/.test(val);  // 判断是否是10位数字
      }
  },

  uploadRoot: CONFIG.uploadFolder,

  // get the relative path to upload folder
  uploadPath (filePath) {
      return filePath.replace(this.uploadRoot, '');
  },
  // group socket平台
  groupChannel (groupId) {
      return `group@${groupId}`;
  },
  // period socket平台
  periodChannel (pid) {
      return `period@${pid}`;
  },

  userSub (uid) {
      return `userSub@${uid}`;
  },

  userChannel (uid) {
      return `user@${uid}`;
  }
}

global.h = h;

module.exports = h;
