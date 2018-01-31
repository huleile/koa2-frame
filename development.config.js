"use strict";

const development = {
  apps : [
    {
      name      : 'development',
      script    : 'bin/www',
      env: {
        NODE_ENV: "development"
      }
    }
  ]
}

module.exports = development;
