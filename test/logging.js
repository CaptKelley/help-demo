require('mocha')
require('mocha-sinon')
const expect = require('chai').expect
const winston = require('winston')
const logging = require('../app/logging.js')

describe('logging.js', function () {
  it('should export init', function () {
    expect(logging.init).to.not.be.undefined
  })
  it('should export winston', function () {
    expect(logging.winston).to.not.be.undefined
  })
  it('should add the logley transport to winston', function () {
    logging.init()
    expect(winston.add.calledOnce).to.be.true
  })
  beforeEach(function () {
    this.sinon.stub(winston, 'add')
  })
})
