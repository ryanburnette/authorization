var mocha = require('mocha')
var describe = mocha.describe
var chai = require('chai')
var expect = chai.expect
var lookupFactory = require('../index.js')

var Rules = [
  ['/api/items','GET','user,admin'],
  ['/api/items','POST','admin'],
  ['/api/(.*)','*','guest,user,admin']
]

var lookup = lookupFactory(Rules)

describe('#lookup()', function () {
  it('returns roles for an exactly matched path',function () {
    expect(lookup('/api/items','GET')).to.eql(['user','admin'])
  })

  it('returns roles for a regexp matched path',function () {
    expect(lookup('/api/items/','GET')).to.eql(['user','admin'])
  })

  it('throws an error if no path is matched',function () {
    expect(() => lookup('foobar')).to.throw()
  })
})
