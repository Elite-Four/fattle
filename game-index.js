'use strict'

const path = require('path')
const fs = require('fs')

require('dotenv').config({slient: true})
const error = require('debug')('fattle:game:error')
const redis = require('redis')

const Game = require('./game/nes')

const rom = fs.readFileSync(path.join(__dirname, 'rom.nes'))
const cartridge = new Uint8Array(rom).buffer

const game = new Game(cartridge)
const client = redis.createClient(process.env.REDIS_URL)

game.on('frame', () => {
  const screenValue = JSON.stringify(Array.from(game.screen))
  client.set('screen', screenValue)
  client.lpop('input', (err, value) => {
    if (err) return error(err.message)
    if (value != null) {
      const input = JSON.parse(value)
      if (input.press) {
        game.press(value.index, value.button)
      } else {
        game.depress(value.index, value.button)
      }
    }
  })
})

game.start()

process.on('uncaughtException', err => error(`uncaught exception: ${err.stack}`))
process.on('unhandledRejection', err => error(`unhandle rejection: ${err.stack}`))
