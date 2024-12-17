# [authorization][1]

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/authorization)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/authorization)

A stupid simple authorization strategy for APIs.

## Installation

```bash
npm install --save @ryanburnette/authorization
```

## Usage

This strategy makes a couple assumptions.

- `req.user` is an object that describes this user
- `req.user.roles` is an array of strings that describes the roles this user has

A basic implementation looks something like this.

```js
import Authorization from '@ryanburnette/authorization';

// use it on a group of endpoints
app.use(
  '/api/widgets',
  Authorization.middleware({ methods: ['GET', 'POST'], roles: ['user', 'admin'] }),
  Authorization.middleware({ methods: ['DELETE'], roles: ['admin'] }),
  function (req, res) {
    res.statusCode = 200;
    res.end();
    return;
  }
);

// use it on a single endpoint
app.get(
  '/api/employees',
  Authorization.middleware({ roles: ['user', 'admin'] }),
  function (req, res) {
    res.statusCode = 200;
    res.end();
    return;
  }
);

app.use(function (err, req, res, next) {
  // catch errors from this strategy
  if (err.code === 'E_FORBIDDEN') {
    res.statusCode = 403;
    res.end();
    return;
  }
  console.error(err);
  res.statusCode = 500;
  res.end();
});
```

## Test

```sh
npm install --no-save express
npm test
```

[1]: https://github.com/ryanburnette/authorization
