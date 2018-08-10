var mocha = require('mocha')
var describe = mocha.describe
var chai = require('chai')
var expect = chai.expect
var rule = require('../../lib/rule')

describe('#rule()', function () {
  it('is a function',function () {
    expect(rule).to.be.a('function')
  })

  describe('returns object',function () {
    var obj = rule('/foo','GET','user')
    it('with a regexp',function () {
      expect(Object.keys(obj)).to.include('regexp')
    })
    it('with a verbs',function () {
      expect(Object.keys(obj)).to.include('verbs')
    })
    it('with a roles',function () {
      expect(Object.keys(obj)).to.include('roles')
    })
  })

  describe('regexp',function () {
    it('works',function () {
      var obj = rule('/foo','GET','user')
      expect(obj.regexp.exec('/foo')[0]).to.eql('/foo')
    })
  })

  describe('verbs',function () {
    it('works with one verb',function () {
      var obj = rule('/foo','GET','user')
      expect(obj.verbs).to.be.an('array')
      expect(obj.verbs).to.include('GET')
    })
    it('works with multiple verbs',function () {
      var obj = rule('/foo','GET,OPTIONS','user')
      expect(obj.verbs).to.be.an('array')
      expect(obj.verbs).to.include('GET')
      expect(obj.verbs).to.include('OPTIONS')
    })
  })

  describe('roles',function () {
    it('works',function () {
      var obj = rule('/foo','GET','user')
      expect(obj.roles).to.be.an('array')
      expect(obj.roles).to.include('user')
    })
  })
})
