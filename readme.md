# [pathroles][1]

[![npm version](https://badge.fury.io/js/%40ryanburnette%2Fpathroles.svg)](https://badge.fury.io/js/%40ryanburnette%2Fpathroles)

A strategy for looking up authorization roles by path.

Declaration of rules is in the form of an array of arrays, with each item in the
main array being an array with a three items: a path, verbs, and roles.

A path is a string that will be converted to a regexp by [path-to-regexp][1].

Verbs are declared as a comma-separated string.

Roles are also declared as a comma-separated string.

Declare rules in order of more specific to less specific. Roles will be returned
for the first rule that matches.

All paths must be explicity set. If no rules match, an error will be thrown.

## Usage

Create a lookup method by passing in rules.

```js
var pathroles = require('@ryanburnette/pathroles');

var lookup = pathroles([
  ['/api/items', 'GET', 'user,admin'],
  ['/api/items', 'POST', 'admin'],
  ['/api/(.*)', '*', 'guest,user,admin']
]);

lookup('/api/items', 'GET');
// ['user','admin']
```

Use the lookup in your authorization middleware to get the roles allowed for the
current path.

```js
app.use(function(req, res, next) {
  if (!lookup(req.originalUrl, req.method).includes(req.user.role)) {
    res.statusCode = 401;
    res.end();
    return;
  }
  next();
});
```

[1]: https://github.com/ryanburnette/pathroles
[2]: https://github.com/pillarjs/path-to-regexp
