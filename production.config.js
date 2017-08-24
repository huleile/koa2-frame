"use strict";

const production = {
  apps : [
    {
      name      : 'test1',
      script    : 'bin/www',
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}

module.exports = production;
