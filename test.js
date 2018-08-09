var mocha = require('mocha')
var describe = mocha.describe
var chai = require('chai')
var expect = chai.expect
var pathRoles = require('./index.js')

var rules = {
  '/foo': 'user',
  '/bar/': 'user',
  '/admin/foo': 'superadmin',
  '/admin/*': 'admin',
}

var lookup = pathRoles(rules)

describe('#pathRoles()', function () {
  it('#1',function () {
    expect(lookup('/foo')).to.eql(['user'])
  })
})
