'use strict'

const path = require('path')
const fs = require('fs')

const info = require('debug')('fattle:info')
const error = require('debug')('fattle:error')

const Game = require('./game/nes')
const Server = require('./server')

const rom = fs.readFileSync(path.join(__dirname, 'rom.nes'))
const cartridge = new Uint8Array(rom).buffer

const game = new Game(cartridge)
const server = new Server()

server.on('press', (index, button) => game.press(index, button))
server.on('depress', (index, button) => game.depress(index, button))

setInterval((game, server) => {
  server.broadcastScreen(game.screen)
}, 100, game, server)

server.listen(process.env.PORT)

info(`server listenning on ${process.env.PORT}`)

process.on('uncaughtException', err => info(`uncaught exception: "${err.message}" at ${err.stack}`))
process.on('unhandledRejection', err => info(`unhandle rejection: "${err.message}" at ${err.stack}`))
