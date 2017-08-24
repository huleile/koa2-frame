"use strict";
const models = require("../models");

(async() => {
    await models.Book.sync({force: true});
    console.log("Finished");
})();
