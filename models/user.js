'use strict';
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const secret = require('config').secret;
const redis = require('../common/redis');
const h = require('../common/helper');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("User", {
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        password: {
            type: DataTypes.STRING,
            set: function (v) {
                this.setDataValue('password', h.md5(v));
            },
            allowNull: false
        },
        authToken: DataTypes.STRING,
        tokenExpire: DataTypes.DATE
    }, {
        schema: 'public',
        classMethods: {
            login: async function(account, password, refreshToken) {
                const or = Sequelize.or({name: account}, {email: account}, {phone: account});
                const where = Sequelize.and({password: h.md5(password)}, or);
                let user = await this.findOne({where});
                h.assert(user, 'PasswordWrongOrUserNotExist');
                if (refreshToken || !user.authToken) {
                    // clear user old info
                    if (user.authToken) {
                        await redis.del(user.authToken);
                    }
                    // generate new token
                    const playload = {uid: user.id, uname: user.name, ts: Date.now()};
                    user.authToken = jwt.sign(playload, secret);
                    await user.save();
                    await redis.refreshRedisUser(user);
                }
                return user;
            },
            /**
            *   @desc check token
            *   @param {String} authToken
            */
            checkToken (authToken) {
                let data;
                try {
                    data = jwt.verify(authToken, SECRET);
                } catch (e) {
                    return Promise.reject(e);
                }
                const opt = {where: {id: data.uid, authToken}};
                return this.find(opt).then(function (user) {
                    h.assert(user, 'InvalidToken');
                    // h.assert(Date.now() <= user.tokenExpire, '令牌过期');
                    return user;
                });
            },
        }
    });
};
