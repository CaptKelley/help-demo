// Help-Demo, console application demonstrator.
const uniqid = require('uniqid')

const processid = uniqid()
const randomThreshold = 30

const ui = require('./ui.js')
const logging = require('./logging.js')
const network = require('./network.js')

function app () {
  ui.init()
  logging.init()
  network.init()

  network.client.on('data', (data) => network.processPacket(data, randomThreshold, processid))

  process.stdin.on('keypress', (str, key) => ui.processKey(key, network.client, processid))
}

app()

module.exports = { app }