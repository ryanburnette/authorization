'use strict';

var split = require('./split');

module.exports = function(str) {
  if (str === '*') {
    return [
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
  }
  return split(str);
};
