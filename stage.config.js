"use strict";

const stage = {
  apps : [
    {
      name      : 'test1',
      script    : 'bin/www',
      env: {
        NODE_ENV: "stage"
      }
    }
  ]
}

module.exports = stage;
