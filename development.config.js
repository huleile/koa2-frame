"use strict";

const development = {
  apps : [
    {
      name      : 'test1',
      script    : 'bin/www',
      env: {
        NODE_ENV: "development"
      }
    }
  ]
}

module.exports = development;
