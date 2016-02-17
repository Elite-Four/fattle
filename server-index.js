'use strict'

const error = require('debug')('fattle:server:error')
require('dotenv').config({slient: true})
const redis = require('redis')

const Server = require('./server')
const client = redis.createClient(process.env.REDIS_URL)

const server = new Server()

server.on('press', (index, button) => client.rpush('input', JSON.stringify({
  press: true,
  index: index,
  button: button
})))
server.on('depress', (index, button) => client.rpush('input', JSON.stringify({
  press: false,
  index: index,
  button: button
})))

server.listen(process.env.PORT)

void function broadcast() {
  client.get('screen', (err, value) => {
    if (err) return error(`read screen error: ${err.message}`)
    const screen = new Uint8Array(JSON.parse(value))
    server.broadcastScreen(screen)
      .then(() => setTimeout(broadcast, 100))
  })
} ()

process.on('uncaughtException', err => error(`uncaught exception: ${err.stack}`))
process.on('unhandledRejection', err => error(`unhandle rejection: ${err.stack}`))
