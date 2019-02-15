const readline = require('readline')

function init () {
  readline.emitKeypressEvents(process.stdin)
  process.stdin.setRawMode(true)
}

function writePrompt () {
  console.log('Press T)ime, C)ount, or Q)uit:')
}

function processKey (key, client, processid) {
  if (key.ctrl && key.name === 'c') {
    process.exit()
  } else {
    switch (key.name) { // TODO: Better to set timeout and block, or allow stacking requests?
      case 'c':
        console.log('Requesting Count')
        client.write(`{ "request" : "count", "id" : "${processid}" }`)
        break
      case 't':
        console.log('Requesting Time')
        client.write(`{ "request" : "time", "id" : "${processid}" }`)
        break
      case 'q':
        client.destroy()
        console.log('Quitting, thanks for playing.')
        process.exit()
      default:
        break
    }
  }
}

module.exports = { init, writePrompt, processKey }
