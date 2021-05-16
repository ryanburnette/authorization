'use strict';

const { intersection } = require('lodash');

function pathroles(opts) {
  if (!opts) {
    opts = {};
  }

  if (!opts.methods) {
    opts.methods = [
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

  if (!opts.roles) {
    opts.roles = [];
  }

  return function (req, res, next) {
    if (
      req.user &&
      req.user.roles &&
      intersection(req.user.roles, opts.roles).length
    ) {
      return next();
    }
    res.sendStatus(401);
  };
}

module.exports = pathroles;
