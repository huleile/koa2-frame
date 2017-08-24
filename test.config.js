"use strict";

const test = {
  apps : [
    {
      name      : 'test1',
      script    : 'bin/www',
      env: {
        NODE_ENV: "test"
      }
    }
  ]
}

export test;
