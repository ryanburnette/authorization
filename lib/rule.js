var regexp = require('path-to-regexp')
var _verbs = require('./verbs')
var split = require('./split')

function rule(path,verbs,roles) {
  return {
    regexp: regexp(path),
    verbs: _verbs(verbs),
    roles: split(roles)
  }
}

module.exports = rule
