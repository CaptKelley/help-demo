const ui = require('./ui.js')
const logging = require('./logging.js')
const net = require('net')
const client = new net.Socket()

const config = require('./config.js')

let heartbeat
let waitforlogin

function connect () {
  logging.winston.log('info', `Help-Demo: connecting to ${config.host}:${config.port}`)
  client.connect({
    family: 'IPv4',
    host: config.host,
    port: config.port
  })
}

function logintimedout () {
  logging.winston.log('info', `Help-Demo: Login Timed Out, retrying`)
  clearTimeout(heartbeat)
  reconnect(config.host, config.port)
}

function reconnect () {
  clearTimeout(waitforlogin)
  logging.winston.log('info', `Help-Demo: re-connecting to ${config.host}:${config.port}`)
  client.destroy()
  connect(config.host, config.port)
}

function handleHeartbeat () {
  clearTimeout(heartbeat)
  heartbeat = setTimeout(reconnect, 2000)
}

function handleWelcome (message) {
  clearTimeout(waitforlogin)
  logging.winston.log('info', `Help-Demo: Successful Login ${message.msg}`)
  console.log(`Welcome message received: ${message.msg}`)
  ui.writePrompt()
}

function handleMsg (message, randomThreshold) {
  if (message.msg.count) {
    console.log(`Count: ${message.msg.count}`)
  } else if (message.msg.time) {
    console.log(`Time: ${message.msg.time}`)
    if (message.msg.random > randomThreshold) {
      console.log(`Random is larger than ${randomThreshold}, Random: ${message.msg.random} `)
    }
  }
  ui.writePrompt()
}

function processPacket (data, randomThreshold, processid) {
  let messages = data.split('\n')
  messages.every((message) => {
    try {
      let serverresponse = JSON.parse(message)
      switch (serverresponse.type) {
        case 'heartbeat':
          handleHeartbeat()
          break
        case 'welcome':
          handleWelcome(serverresponse)
          break
        case 'msg':
          if (message.includes(processid)) { // TODO: Find a better way to verify this is our packet.
            handleMsg(serverresponse, randomThreshold)
          }
          break
        default:
          console.log(serverresponse)
      }
    } catch (err) {
      logging.winston.log('info', `Help-Demo: Bad JSON Payload from host: ${message} ${err}`)
    }
  })
}

function init () {
  client.on('connect', () => {
    logging.winston.log('info', `Help-Demo: Server connected`)
    client.setEncoding('utf8')
    client.write(`{"name": "${config.username}"}`)
    waitforlogin = setTimeout(logintimedout, 5000)
  })

  connect()
}

module.exports = { init, connect, client, processPacket }
