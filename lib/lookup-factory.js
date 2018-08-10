var rules = require('./rules')

function lookupFactory(rulesArr) {
  var current = rules(rulesArr)

  return function (path,verb) {
    var found = current.find(function (el) {
      if ( el.regexp.exec(path) && el.verbs.includes(verb) ) {
        return true
      }
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
