const winston = require('winston')
const winlog = require('winston-loggly-bulk')

const config = require('./config.js')

function init () {
  winston.add(winston.transports.Loggly, {
    token: config.logglytoken,
    subdomain: config.logglysubdomain,
    tags: ['Winston-NodeJS', 'help-demo'],
    json: true
  })
}

module.exports = { init, winston }
