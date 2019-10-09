'use strict';

var split = require('./split');
var clone = require('./clone');

var VERBS = [
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'PATCH'
];

function verbs(str) {
  if (str === '*') {
    return clone(VERBS);
  }
  return split(str);
}

module.exports = verbs;
