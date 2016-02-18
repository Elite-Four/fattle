'use strict'

const EventEmitter = require('events')

const info = require('debug')('fattle:server:info')
const debug = require('debug')('fattle:server:debug')
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
    info(`server listenning on ${port}`)
  }

  connect (socket) {
    info(`${socket.id} connected`)

    socket.on('disconnect', () => this.disconnect(socket))

    this.waitings.push(socket.id)

    this.assignPlayers()
  }
  disconnect (socket) {
    info(`${socket.id} disconnected`)

    const waitingsIndex = this.waitings.indexOf(socket.id)
    if (waitingsIndex > -1) this.waitings.splice(waitingsIndex, 1)

    if (this.players[0] === socket.id) this.players[0] = null
    if (this.players[1] === socket.id) this.players[1] = null

    this.assignPlayers()
  }

  assignPlayers() {
    while (true) {
      const playerIndex = this.getNoControlledPlayerIndex()
      if (playerIndex === null) return

      const waitingSocket = this.getFirstWaitingSocket()
      if (waitingSocket === null) return

      this.assignSocketToPlayer(waitingSocket, playerIndex)
    }
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
    this.players[index] = socket.id
    socket.on('press', button => this.press(socket, index, button))
    socket.on('depress', button => this.depress(socket, index, button))

    socket.emit('player', index)

    info(`${socket.id} is assigned to player ${index + 1}`)
  }

  press (socket, index, button) {
    if (this.players[index] !== socket.id) return

    this.emit('press', index, button)
    info(`${socket.id} pressed ${button}`)
  }
  depress (socket, index, button) {
    if (this.players[index] !== socket.id) return

    this.emit('depress', index, button)
    info(`${socket.id} depressed ${button}`)
  }
  broadcastScreen (screen) {
    return encode(screen).then(buffer => {
      // debug(`screen encoded into ${buffer.length} bytes.`)
      this.io.emit('screen', buffer)
    })
  }
}
