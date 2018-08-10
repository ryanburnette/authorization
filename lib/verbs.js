var split = require('./split')
var clone = require('./clone')

var Verbs = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH'
]

function verbs(str) {
  if ( str === '*' ) {
    return clone(Verbs)
  }
  return split(str)
}

module.exports = verbs
