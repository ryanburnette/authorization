'use strict';

var express = require('express');
var authorization = require('./index.js');
var axios = require('axios');

var app = express();

app.get(
  '/api/foo',
  function (req, res, next) {
    req.user = {};
    req.user.roles = ['user'];
    next();
  },
  authorization({ methods: ['GET'], roles: ['admin'] }),
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
  authorization({ methods: ['GET'], roles: ['admin', 'user'] }),
  function (req, res) {
    res.sendStatus(200);
  }
);

app.use(function (err, req, res, next) {
  if (err.code === 'UNAUTHORIZED') {
    res.statusCode = 401;
    res.json({ message: err.message });
    return;
  }
  res.statusCode = 500;
  res.end();
  console.error(err);
});

app.listen(3000);

[
  async function () {
    console.log(
      'TEST: Get without having allowed role, should in caught error that we handle and return 401 in this test'
    );
    var response = await axios
      .get('http://127.0.0.1:3000/api/foo')
      .catch((error) => error.response);

    if (response.status === 401) {
      console.log('  PASS');
    } else {
      console.log('  FAIL');
    }
  },
  async function () {
    console.log('TEST: Get with appropriate role, should result in 200');
    var response = await axios
      .get('http://127.0.0.1:3000/api/bar')
      .catch((error) => error.response);

    if (response.status === 200) {
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
