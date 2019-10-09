'use strict';

var rule = require('./rule');

function rules(arr) {
  return arr.map(function(el) {
    var [path, verbs, roles] = el;
    return rule(path, verbs, roles);
  });
}

module.exports = rules;
