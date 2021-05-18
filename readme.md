# [authorization][1]

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/authorization)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/authorization)

A really simple Node.js authorization library.

## Usage

```js
var express = require('express');
var authorization = require('@ryanburnette/authorization');

var app = express();

app.use(
  '/api/widgets',
  authorization({ methods: ['GET', 'POST'], roles: ['user', 'admin'] }),
  authorization({ methods: ['DELETE'], roles: ['admin'] }),
  function (req, res) {
    res.sendStatus(200);
  }
);

app.get(
  '/api/employees',
  authorization({ roles: ['user', 'admin'] }),
  function (req, res) {
    res.sendStatus(200);
  }
);

app.post(
  '/api/employees/create',
  authorization({ roles: ['admin'] }),
  function (req, res) {
    res.sendStatus(200);
  }
);

app.listen(3000);
```

[1]: https://github.com/ryanburnette/authorization
