'use strict'

const error = require('debug')('fattle:game:error')

const path = require('path')
const fs = require('fs')

const Game = require('./game/nes')

const rom = fs.readFileSync(path.join(__dirname, 'rom.nes'))
const cartridge = new Uint8Array(rom).buffer

const game = new Game(cartridge)

if (process.send) {
  void function broadcast() {
    const message = Array.from(game.screen)
    process.send(message, () => setTimeout(broadcast, 100))
  }()
}

game.run()

process.on('message',
  message => game[message[0] ? 'press' : 'depress'](message[1], message[2]))

process.on('uncaughtException', err => error(`uncaught exception: ${err.stack}`))
process.on('unhandledRejection', err => error(`unhandle rejection: ${err.stack}`))