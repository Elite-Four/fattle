'use strict'

const info = require('debug')('fattle:game:info')
const debug = require('debug')('fattle:game:debug')
const error = require('debug')('fattle:game:error')
const NesNes = require('nesnes')

module.exports = class Game {
  constructor (cartridge) {
    const emulator = new NesNes()

    emulator.output.audio.setEnabled(false)
    emulator.output.video.run = () => {}

    emulator.initCartridge(cartridge)

    this.emulator = emulator
  }
  run () {
    this.emulator.run()
    info('game started')
  }
  get screen () {
    return this.emulator.output.video.data
  }
  press (index, button) {
    try {
      debug(`Player ${index} press ${button}`)
      return this.emulator.controllers.get(index).press(button)
    } catch (err) {
      error(`Press failed: ${err.message}`)
    }
  }
  depress (index, button) {
    try {
      debug(`Player ${index} depress ${button}`)
      return this.emulator.controllers.get(index).depress(button)
    } catch (err) {
      error(`Depress failed: ${err.message}`)
    }
  }
}
