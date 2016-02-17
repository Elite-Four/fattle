'use strict'

const path = require('path')
const fs = require('fs')

const error = require('debug')('fattle:global:error')

const Game = require('./game/nes')
const Server = require('./server')

const rom = fs.readFileSync(path.join(__dirname, 'rom.nes'))
const cartridge = new Uint8Array(rom).buffer

const game = new Game(cartridge)
const server = new Server()

server.on('press', (index, button) => game.press(index, button))
server.on('depress', (index, button) => game.depress(index, button))

void function broadcast() {
  server.broadcastScreen(game.screen)
    .then(() => setTimeout(broadcast, 100))
}()

server.listen(process.env.PORT)
game.run()

process.on('uncaughtException', err => error(`uncaught exception: ${err.stack}`))
process.on('unhandledRejection', err => error(`unhandle rejection: ${err.stack}`))
