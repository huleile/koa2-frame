"use strict";

const production = {
  apps : [
    {
      name      : 'production',
      script    : 'bin/www',
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}

module.exports = production;
