"use strict";
const {secret: SECRET, redis: redisConfig} = require('config');
const redis = require('redis');
const _ = require("lodash");
const socketioJwt = require('socketio-jwt');
const Debugger = require('debug');
const slogger = require('../common/logger').slogger;
const models = require("../models");
const shp = require("../common/socketHelper");

const debug = Debugger('events');


module.exports = function(io) {
  h.IO = io;

  io.on('connection', socketioJwt.authorize({
    secret: SECRET,
    timeout: 15000
  })).on('authenticated', async (socket) => {
    socket.on('ping', data => socket.emit('pong', data)); // ping pong 机制

    let user = socket.decoded_token;
    user = await models.User.findById(user.uid);
    const userInfo = _.pick(user, ['id', 'name']);
    socket._user = userInfo; // save user info to socket
    // 连接 redis
    const sub = redis.createClient(redisConfig);
    sub.select(redisConfig.redisdb, () => console.log('redis db changed'));
    slogger.info('Socket Conneted', {user: userInfo, sid: socket.id});
    debug('connetced');

    sub.subscribe(h.userSub(user.id));// subscribe user's sub, unsub channel
    sub.subscribe(h.userChannel(user.id)); // subscribe user channel

    //============  message handler
    sub.on('message', (channel, message) => {
      debug('message from redis', userInfo, message);
      const chanType = channelType(channel);
      message = JSON.parse(message);

      if(chanType === 'group' || chanType === 'user') {
        socket.emit("message", message);
      }else if (chanType === 'userSub') {
        // (取消)订阅频道 需要 target 频道目标类型， targetId 频道目标
        let toUpdate = "";
        if(message.target === 'group') {
          toUpdate = h.groupChannel(message.targetId);
        }else if (message.target == 'period') {
            toUpdate = h.periodChannel(message.targetId);
        }
        // type 为订阅，取消订阅
        if (message.type === 'sub') {
            // TODO whether need check the groupId
            sub.subscribe(toUpdate);
        } else if (message.type === 'unsub') {
            sub.unsubscribe(toUpdate);
        }
      }
    });

    socket.on('disconnect', () => {
      shp.redisUnset(userInfo);
      sub.end(true);
      slogger.info("Socket Disconnected", {user: userInfo, sid: socket.id});
      debug('disconnect');
    })
  })
};


// get the part before @ of channel
function channelType (channel) {
    return channel.split('@')[0];
}
