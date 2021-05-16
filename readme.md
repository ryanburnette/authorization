# [pathroles][1]

[![repo](https://img.shields.io/badge/repository-Github-black.svg?style=flat-square)](https://github.com/ryanburnette/pathroles)
[![npm](https://img.shields.io/badge/package-NPM-green.svg?style=flat-square)](https://www.npmjs.com/package/@ryanburnette/pathroles)

One strategy for NodeJs HTTP authorization middleware.

## Usage

```js
app.get('/api/foo', pathroles({ methods: ['GET'], roles: ['user'] }), ...);
app.get('/api/bar', pathroles({ /* methods defaults to all */ roles: ['admin'] }), ...);
```

[1]: https://github.com/ryanburnette/pathroles
