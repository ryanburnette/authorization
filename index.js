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
        next(new Error('UNAUTHORIZED_FOR_HTTP_METHOD'));
        return;
      }
      if (!intersection(opts.roles, req.user.roles).length) {
        next(new Error('UNAUTHORIZED_FOR_USER_ROLE'));
        return;
      }
    }
    next();
  };
}

module.exports = authorization;
