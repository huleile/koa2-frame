"use strict";

const Sequelize = require('sequelize');
const pgsql = require('config').postgres;
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(pgsql.database, pgsql.user, pgsql.password, {
  dialect: 'postgres',
  host: pgsql.host,
  port: pgsql.port,
  pool: {maxConnections: 40, minConnections: 5}, // 连接池
  logging: false
});

const db = {sequelize, Sequelize};


fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });


Object.keys(db).forEach(model => {
  if("associate" in db[model]) {
    db[model].associate(db);
  }
});

module.exports = db;
