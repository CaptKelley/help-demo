require('mocha')
require('mocha-sinon')
const expect = require('chai').expect
const config = require('../app/config.js')

describe('config.js', function () {
  it('should export username', function () {
    expect(config.username).to.not.be.undefined
  })
  it('should export host', function () {
    expect(config.host).to.not.be.undefined
  })
  it('should export port', function () {
    expect(config.port).to.not.be.undefined
  })
  it('should export logglytoken', function () {
    expect(config.logglytoken).to.not.be.undefined
  })
  it('should export logglysubdomain', function () {
    expect(config.logglysubdomain).to.not.be.undefined
  })
})
