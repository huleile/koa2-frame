"use strict";

const test = {
  apps : [
    {
      name      : 'test',
      script    : 'bin/www',
      env: {
        NODE_ENV: "test"
      }
    }
  ]
}

module.exports = test;
