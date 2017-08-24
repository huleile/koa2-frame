'use strict';
const _ = require('lodash');
const {client, get} = require('./redis');

/*
    h.IO.sockets.sockets  所有的sockets
*/
module.exports = {

    redisSet (socket, user) {
        const key = this._key(user.id);
        //TODO one user maybe have multiple connection, so use an redis list will be better
        client.set(key, JSON.stringify({socketId: socket.id}));
    },

    redisUnset (user) {
        const key = this._key(user.id);
        client.del(key);
    },

    _key (id) {
        return `socket:${id}`;
    },

    /*
    *   check用户是否连接socket
    *   @param {Int} userId
    *   @return {Boolean} true is connected
    */
    isUserConnected: async (userId) => {
        const u = await get(this._key(userId));
        return u ? true : false;
    },

    //  清除某个用户的连接socket
    clearSockets: async (userId) => {
        let u = await get(this._key(userId));
        if (u) {
            u = JSON.parse(u);
            // TODO here only clear sockets in current node instance, how to clear all
            const socket = _.find(h.IO.sockets.sockets, s => s.id === u.socketId);
            if (socket) {
                socket.disconnect();
            }
        }
    }
}
