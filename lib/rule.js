'use strict';

var regexp = require('path-to-regexp');
var _verbs = require('./verbs');
var split = require('./split');

module.exports = function(path, verbs, roles) {
  return {
    regexp: regexp(path),
    verbs: _verbs(verbs),
    roles: split(roles)
  };
};
