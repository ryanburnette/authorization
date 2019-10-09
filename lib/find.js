'use strict';

module.exports = function(rule, path, verb) {
  if (rule.regexp.exec(path) && rule.verbs.includes(verb)) {
    return true;
  }
};
