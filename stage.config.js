"use strict";

const stage = {
  apps : [
    {
      name      : 'stage',
      script    : 'bin/www',
      env: {
        NODE_ENV: "stage"
      }
    }
  ]
}

module.exports = stage;
