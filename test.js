'use strict';

import express from 'express';
import Authorization from './index.js';

var app = express();

app.get(
  '/api/foo',
  function (req, res, next) {
    req.user = {};
    req.user.roles = ['user'];
    next();
  },
  Authorization.middleware({ methods: ['GET'], roles: ['admin'] }),
  function (req, res) {
    res.sendStatus(200);
  }
);

app.get(
  '/api/bar',
  function (req, res, next) {
    req.user = {};
    req.user.roles = ['user'];
    next();
  },
  Authorization.middleware({ methods: ['GET'], roles: ['admin', 'user'] }),
  function (req, res) {
    res.sendStatus(200);
  }
);

app.use(function (err, req, res, next) {
  if (err.code === 'E_FORBIDDEN') {
    res.statusCode = 403;
    res.json({ message: err.message });
    return;
  }
  res.statusCode = 500;
  res.end();
  console.error(err);
});

app.listen(3468);

[
  async function () {
    console.log(
      'TEST: Get without having allowed role, should in caught error that we handle and return 401 in this test'
    );
    let resp = await fetch('http://127.0.0.1:3468/api/foo');
    if (resp.status === 403) {
      console.log('  PASS');
    } else {
      console.log('  FAIL');
    }
  },
  async function () {
    let resp = await fetch('http://127.0.0.1:3468/api/bar');
    if (resp.status === 200) {
      console.log('  PASS');
    } else {
      console.log('  FAIL');
    }
  }
]
  .reduce(async function (last, test) {
    await last;
    return test();
  }, Promise.resolve())
  .then(function () {
    process.exit();
  });
