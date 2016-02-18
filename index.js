'use strict'

const ChildProcess = require('child_process')

const error = require('debug')('fattle:server:error')

const Server = require('./server')

const server = new Server()

const gameProcess = ChildProcess.fork('./game-process')

server.on('press', (index, button) => gameProcess.send([true, index, button]))
server.on('depress', (index, button) => gameProcess.send([false, index, button]))

server.listen(process.env.PORT)

gameProcess.on('message', message => {
  server.broadcastScreen(message)
})

process.on('uncaughtException', err => error(`uncaught exception: ${err.stack}`))
process.on('unhandledRejection', err => error(`unhandle rejection: ${err.stack}`))
