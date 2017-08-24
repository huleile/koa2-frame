"use strict";
module.exports = function(sequelize, DataTypes) {
  let MS = sequelize.models;
  return sequelize.define("Book", {
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
      schema: 'public',
      classMethods: {
        associate: function(models) {

        },
      }
  })
}
