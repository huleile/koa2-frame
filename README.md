# koa2-frame
  学习 koa2框架搭建一个常用的web 服务器模板

### 准备
  * Node 版本需要7.6之后，7.6之前的版本需要利用 babel 才可以
  若使用babel,首先要在我们的项目中安装babel和babel的几个模块,请自行查找babel的用法

  * 安装 koa 脚手架,利用脚手架生成 koa 项目
    ```js
    npm install koa-generator -g
    ```

  * 生成项目 koa2 test 即可生成 test 项目然后切换到目录并下载依赖

### 技术实现
  * Koa2
  * Socket.io
  * Redis
  * Postgresql
  * Grunt

### 功能实现
  * model,router 设计
  * redis: 存放用户登录的 token， 通过 subscribe/publish 机制配合 socket 实现 IM 功能
  * postgresql: pg, sequelize,squel
  * socket.io： 主要实现IM功能
  * logger: log4js实现 console info,socket file 日志
  * auth: 登录认证中间件
  * error: errors.json ,错误处理error-handle
  * apidoc: API 可视化管理
  * uploader:文件上传
  * config: 配置文件
  * mocha: 测试
  * grunt: 自动化构建
  * cors: 跨域请求


### 使用的第三方模块
  * koa
  * koa-bodyparser
  * koa-convert
  * koa-json
  * koa-logger
  * koa2-cors
  * koa-multer
  * koa-onerror
  * koa-router
  * koa-static
  * koa-views
  * es6-promisify
  * jsonwebtoken
  * sequelize
  * squel
  * socket.io
  * pg
  * redis
  * log4js
  * lodash  工具库
  * config
  * debug
  * crypto
  * ejs
  * grunt
  * mocha


### 如何引用
  * git clone https://github.com/huleile/koa2-frame.git
  * cd koa2-frame
  * npm install
  * npm start
