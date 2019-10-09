'use strict';

module.exports = function(s) {
  if (typeof s === 'string') {
    s = s.split(/\s*,\s*/g);
  }
  return s;
};
