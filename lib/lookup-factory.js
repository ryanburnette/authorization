var rules = require('./rules')

function _find(rule,path,verb) {
  if ( rule.regexp.exec(path) && rule.verbs.includes(verb) ) {
    return true
  }
}

function lookupFactory(rulesArr) {
  var current = rules(rulesArr)

  return function (path,verb) {
    var found = current.find(function (rule) {
      return _find(rule,path,verb)
    })

    if ( found ) {
      return found.roles
    }
    else {
      throw new Error(`no defined rule matches ${path}`)
    }
  }
}

module.exports = lookupFactory
