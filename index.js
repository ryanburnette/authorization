'use strict';

var _rules = require('./lib/rules');
var find = require('./lib/find');

module.exports = function(rulesArr) {
  var rules = _rules(rulesArr);
  return function(path, verb) {
    var found = rules.find(function(rule) {
      return find(rule, path, verb);
    });
    if (found) {
      return found.roles;
    } else {
      throw new Error(`no defined rule matches ${path}`);
    }
  };
};
