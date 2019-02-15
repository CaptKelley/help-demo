require('mocha')
require('mocha-sinon')
const expect = require('chai').expect
const ui = require('../app/ui.js')

describe('ui.js', function () {
  it('writePrompt() should write a string to the console', function () {
    ui.writePrompt()
    expect(console.log.calledWith('Press T)ime, C)ount, or Q)uit:')).to.be.true
  })
  it('processKey() should request a count on a c key', function () {
    let key = { name: 'c', ctrl: false }
    let client = { write: function () {} }
    ui.processKey(key, client, '12345')
    expect(console.log.calledWith('Requesting Count')).to.be.true
  })
  it('processKey() should request the time on the t key', function () {
    let key = { name: 't', ctrl: false }
    let client = { write: function () {} }
    ui.processKey(key, client, '12345')
    expect(console.log.calledWith('Requesting Time')).to.be.true
  })
  it('processKey() should quit the app on the q key', function () {
    let key = { name: 'q', ctrl: false }
    let client = { destroy: function () {} }
    ui.processKey(key, client, '12345')
    expect(console.log.calledWith('Quitting, thanks for playing.')).to.be.true
  })
  beforeEach(function () {
    this.sinon.stub(console, 'log')
    this.sinon.stub(process, 'exit')
  })
})
