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

setInterval(() => {
  const screenValue = JSON.stringify(Array.from(game.screen))
  client.set('screen', screenValue)
  client.lpop('input', (err, value) => {
    if (err) return error(err.message)
    if (value == null) return
    const input = JSON.parse(value)
    game[input.press ? 'press' : 'depress'](value.index, value.button)
  })
}, 50)

game.start()

process.on('uncaughtException', err => error(`uncaught exception: ${err.stack}`))
process.on('unhandledRejection', err => error(`unhandle rejection: ${err.stack}`))
