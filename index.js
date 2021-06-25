'use strict';

module.exports = function authorization(opts) {
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
    opts.roles = ['user'];
  }

  return function authorize(req, res, next) {
    if (opts.methods.includes(req.method)) {
      if (!req.user) {
        let err = new Error('Unauthorized: req.user is required');
        err.code = 'UNAUTHORIZED';
        next(err);
        return;
      }
      var allowedRoles = opts.roles.filter(function (role) {
        return req.user.roles.includes(role);
      });
      if (!allowedRoles.length) {
        let err = new Error('Unauthorized: user does not have required role');
        err.code = 'UNAUTHORIZED';
        next(err);
        return;
      }
    }
    next();
  };
};
