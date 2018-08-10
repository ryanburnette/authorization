# Path Roles

A strategy for declaring authorization rules in the form of a path, HTTP verbs,
and roles.

## Usage

Declaration of rules is in the form of an array of arrays, with each item in
the main array being an array with a three items: a path, verbs, and roles.

A path is a string that will be converted to a regexp by [path-to-regexp][1].

Verbs are declared as a comma-separated string.

Roles are also declared as a comma-separated string.

Declare rules in order of more specific to less specific. Roles will be
returned for the first rule that matches.

If no rules match, an error will be thrown. This is intended to prevent having
a route that doesn't have an explicitly declared rule.

```javascript
var lookupFactory = require('path-roles')

var Rules = [
  ['/api/items','GET','user,admin'],
  ['/api/items','POST','admin'],
  ['/api/(.*)','*','guest,user,admin']
]

var lookup = lookupFactory(Rules)

lookup('/api/items','GET')
// ['user','admin']
```

## Implementation Example (Express)

```javascript
app.use(function (req,res,next) {
  if ( lookup(req.originalUrl,req.method).includes(session.role) ) {
    next()
  }
  else {
    throw new Error('unauthorized')
  }
})
```

[1]: https://github.com/pillarjs/path-to-regexp
