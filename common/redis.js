'use strict';
const  redis = require('redis');
const promisify = require('es6-promisify');
const redisConfig = require('config').redis;
const client = redis.createClient(redisConfig);
const _ = require('lodash');
const logger = require('./logger');
// select db
client.select(redisConfig.redisdb, function(){
    logger.clogger.info('select redis db' + redisConfig.redisdb);
});

client.on("error", function (err) {
    logger.clogger.error("redis error " + err);
});

client.on('ready', function () {
    logger.clogger.info('redis ready');
});

client.on('connect', function () {
    logger.clogger.info('redis connect');
});


module.exports.client = client;
module.exports.set = promisify(client.set, client);
module.exports.get = promisify(client.get, client);
module.exports.del = promisify(client.del, client);

module.exports.refreshRedisUser = async (user) => {
    if (user.authToken) {
        await module.exports.set(user.authToken, JSON.stringify(_.pick(user, ['id'])));
    }
}
