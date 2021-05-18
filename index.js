'use strict';

const { intersection } = require('lodash');

function authorization(opts) {
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
    if (opts.methods.includes(req.method)) {
      if (!req.user) {
        return res.sendStatus(401);
      }
      if (!intersection(opts.roles, req.user.roles).length) {
        return res.sendStatus(401);
      }
    }
    next();
  };
}

module.exports = authorization;
