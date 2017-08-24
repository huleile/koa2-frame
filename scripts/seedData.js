"use strict";
const models = require('../models');


const defaultUser = {
  name: "admin",
  email: "admin@test.com",
  phone: "000000",
  password: "admin666"
};


(async() => {
  let user = await models.User.findOne({where: {name: defaultUser.name, phone: defaultUser.phone}});
  if(!user) {
    user = await models.User.create(defaultUser);
  }

  console.log("Data seed successed");
})();
