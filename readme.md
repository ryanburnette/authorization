# @ryanburnette/[pathroles][2]

A strategy for declaring authorization rules in the form of a path, HTTP verbs,
and roles.

Declaration of rules is in the form of an array of arrays, with each item in
the main array being an array with a three items: a path, verbs, and roles.

A path is a string that will be converted to a regexp by [path-to-regexp][1].

Verbs are declared as a comma-separated string.

Roles are also declared as a comma-separated string.

Declare rules in order of more specific to less specific. Roles will be
returned for the first rule that matches.

All paths must be explicity set. If no rules match, an error will be thrown.

## Usage

The library provides the `#lookupFactory()` method which creates
`#lookup()` methods based on the provided rules.

```js
var { lookupFactory } = require('@ryanburnette/pathroles');

var rules = [
  ['/api/items', 'GET', 'user,admin'],
  ['/api/items', 'POST', 'admin'],
  ['/api/(.*)', '*', 'guest,user,admin']
];

var lookup = lookupFactory(rules);

module.exports = lookup;

lookup('/api/items', 'GET');
// ['user','admin']
```

Use the lookup in your authorization middleware to get the roles
allowed for the current path.

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

## Test

```
npm install --no-save mocha chai
node_modules/.bin/mocha
```

[1]: https://github.com/pillarjs/path-to-regexp
[2]: https://code.ryanburnette.com/ryanburnette/pathroles
