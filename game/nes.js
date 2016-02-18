'use strict'

const info = require('debug')('fattle:game:info')
const debug = require('debug')('fattle:game:debug')
const NesNes = require('nesnes')

module.exports = class Game {
  constructor (cartridge) {
    const emulator = new NesNes()

    emulator.output.audio.setEnabled(false)
    emulator.config.input = [{
			"type": "standard",
			"input": "keyboard"
		}, {
			"type": "standard",
			"input": "keyboard"
		}]
		emulator.input.initConfig()

    emulator.initCartridge(cartridge)

    this.emulator = emulator
  }
  run () {
    const emulator = this.emulator

    if (emulator.running) return

		emulator.running = true;
		emulator.paused = false;

		setImmediate(function frame() {
      if (!emulator.paused) emulator.runFrame()
      setImmediate(frame)
		})

    info('game started')
  }
  get screen () {
    return this.emulator.output.video.data
  }
  press (index, button) {
    this.emulator.controllers.get(index).press(button)
    info(`player ${index + 1} pressed ${button}`)
  }
  depress (index, button) {
    this.emulator.controllers.get(index).depress(button)
    info(`player ${index + 1} depressed ${button}`)
  }
}
