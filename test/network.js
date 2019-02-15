require('mocha')
require('mocha-sinon')

const expect = require('chai').expect
const network = require('../app/network.js')
const logging = require('../app/logging.js')

describe('network.js', function () {
  it('should export init()', function () {
    expect(network.init).to.not.be.undefined
  })
  it('should export connect', function () {
    expect(network.connect).to.not.be.undefined
  })
  it('should export client', function () {
    expect(network.client).to.not.be.undefined
  })
  it('should export processPacket()', function () {
    expect(network.processPacket).to.not.be.undefined
  })
  //TODO Add network exersise tests
})
