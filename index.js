var pathToRegexp = require('path-to-regexp')
var map = require('lodash.map')
var find = require('lodash.find')

function toArray(r) {
  return typeof r === 'string' ? r.split() : r
}

function pathRoles(_rules) {
  var rules = map(Object.keys(_rules),key => {
    return {
      regexp: pathToRegexp(key),
      roles: toArray(_rules[key])
    }
  })

  return function (path) {
    var f = find(rules,r => r.regexp.exec(path))

    if ( f ) {
      return f.roles
    }

    return false
  }
}

module.exports = pathRoles
