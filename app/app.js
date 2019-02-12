// Help-Demo, console application demonstrator.
const readline = require('readline')
const winston = require('winston')
const winlog = require('winston-loggly-bulk')
const net = require('net')
const client = new net.Socket()

const host = '35.226.214.55'
const port = 9432
const username = 'billmaness'

readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

winston.add(winston.transports.Loggly, {
  token: '2b0832b3-4943-48df-96a2-ed2b6a368906',
  subdomain: 'billmaness',
  tags: ['Winston-NodeJS', 'help-demo'],
  json: true
})

let heartbeat
let waitforlogin

function connect (host, port) {
  winston.log('info', `Help-Demo: connecting to ${host}:${port}`)
  client.connect({
    family: 'IPv4',
    host: host,
    port: port
  })
}

function reconnect () {
  clearTimeout(waitforlogin)
  winston.log('info', `Help-Demo: re-connecting to ${host}:${port}`)
  client.destroy()
  connect(host, port)
}

function logintimedout () {
  winston.log('info', `Help-Demo: Login Timed Out, retrying`)
  clearTimeout(heartbeat)
  reconnect()
}

function handleheartbeat () {
  clearTimeout(heartbeat)
  heartbeat = setTimeout(reconnect, 2000)
}

function handlewelcome (message) {
  clearTimeout(waitforlogin)
  winston.log('info', `Help-Demo: Successful Login ${message.msg}`)
  console.log(`Welcome message received: ${message.msg}`)
}

function processPacket (data) {
  let messages = data.split('\n')
  messages.every((message) => {
    try {
      let serverresponse = JSON.parse(message)
      switch (serverresponse.type) {
        case 'heartbeat':
          handleheartbeat()
          break
        case 'welcome':
          handlewelcome(serverresponse)
          break
        default:
          console.log(serverresponse)
      }
    } catch (err) {
      winston.log('info', `Help-Demo: Bad JSON Payload from host: ${message}`)
    }
  })
}

client.on('connect', () => {
  winston.log('info', `Help-Demo: Server connected`)
  client.setEncoding('utf8')
  client.write(`{"name": "${username}"}`)
  waitforlogin = setTimeout(logintimedout, 5000)
})

client.on('data', (data) => processPacket(data))

connect(host, port)

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } else {
    switch (key.name) {
      case 'c':
        console.log('Request Count')
        break
      case 't':
        console.log('Request Time')
        break
      case 'm':
        console.log('Manual Payload Entry')
        break
      case 'q':
        client.destroy()
        console.log('Quitting, thanks for playing.')
        process.exit()
      default:
        console.log('Command not recognized...')
        break
    }
  }
})
