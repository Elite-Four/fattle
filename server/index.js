'use strict'

const EventEmitter = require('events')

const debug = require('debug')('fattle:server:debug')
const info = require('debug')('fattle:server:info')
const error = require('debug')('fattle:server:error')
const IO = require('socket.io')

const encode = require('./encode')


module.exports = class Server extends EventEmitter {
  constructor () {
    super()

    const io = new IO({ serveClient: false })
    io.on('connect', socket => this.connect(socket))

    this.io = io
    this.players = [null, null]
    this.waitings = []
  }
  listen (port) {
    this.io.listen(port)
  }

  connect (socket) {
    info(`client ${socket.id} connected`)

    socket.on('disconnect', () => this.disconnect(socket))

    this.waitings.push(socket.id)

    while (true) if (!this.assignPlayer()) break
  }
  disconnect (socket) {
    info(`client ${socket.id} disconnected`)

    const waitingsIndex = this.waitings.indexOf(socket.id)
    if (waitingsIndex > -1) this.waitings.splice(waitingsIndex, 1)

    if (this.players[0] === socket.id) this.players[0] = null
    if (this.players[1] === socket.id) this.players[1] = null

    while (true) if (!this.assignPlayer()) break
  }

  assignPlayer() {
    const playerIndex = this.getNoControlledPlayerIndex()
    if (playerIndex === null) return false

    const waitingSocket = this.getFirstWaitingSocket()
    if (waitingSocket === null) return false

    this.assignSocketToPlayer(waitingSocket, playerIndex)
    return true
  }
  getNoControlledPlayerIndex() {
    if (this.players[0] === null) return 0
    if (this.players[1] === null) return 1
    return null
  }
  getFirstWaitingSocket() {
    while (this.waitings.length > 0) {
      const waitingId = this.waitings.shift()
      const waitingSocket = this.io.sockets.connected[waitingId]
      if (waitingSocket != null) return waitingSocket
    }
    return null
  }
  assignSocketToPlayer(socket, index) {
    info(`client ${socket.id} is player ${index + 1}`)

    socket.on('press', button => this.press(socket, index, button))
    socket.on('depress', button => this.depress(socket, index, button))

    socket.emit('player', index)
  }

  press (socket, index, button) {
    if (this.players[index] !== socket.id) return

    debug(`client ${socket.id}(player ${index + 1}) press ${button}`)
    this.emit('press', index, button)
  }
  depress (socket, index, button) {
    if (this.players[index] !== socket.id) return

    debug(`client ${socket.id}(player ${index + 1}) depress ${button}`)
    this.emit('depress', index, button)
  }
  broadcastScreen (screen) {
    encode(screen).then(buffer => {
      //debug(`screen encoded into ${buffer.length} bytes.`)
      this.io.emit('screen', buffer)
    }, err => {
      error(`screen encoded failed: ${err.message}`)
    })
  }
}
