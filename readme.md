# [authorization][1]

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/authorization)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/authorization)

An excruciatingly simple authorization strategy for Node.js http apps.

## Installation

```bash
npm install @ryanburnette/authorization
```

## Usage

```js
var authorization = require('@ryanburnette/authorization');

// use it on a group of endpoints
app.use(
  '/api/widgets',
  authorization({ methods: ['GET', 'POST'], roles: ['user', 'admin'] }),
  authorization({ methods: ['DELETE'], roles: ['admin'] }),
  function (req, res) {
    res.statusCode = 200;
    res.end();
    return;
  }
);

// use it on a single endpoint
app.get(
  '/api/employees',
  authorization({ roles: ['user', 'admin'] }),
  function (req, res) {
    res.statusCode = 200;
    res.end();
    return;
  }
);

app.use(function (err, req, res, next) {
  // catch errors from this strategy
  if (err.code === 'UNAUTHORIZED') {
    res.statusCode = 401;
    res.end();
    return;
  }
  console.error(err);
  res.statusCode = 500;
  res.end();
});
```

[1]: https://github.com/ryanburnette/authorization
