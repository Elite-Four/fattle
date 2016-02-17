'use strict'

const EventEmitter = require('events')

const debug = require('debug')('fattle:server:debug')
const error = require('debug')('fattle:server:error')
const IO = require('socket.io')

const encode = require('./encode')


module.exports = class Server extends EventEmitter {
  constructor () {
    super()
    const io = new IO({ serveClient: false })
    io.on('connection', socket => this.connection(socket))
    this.io = io
  }
  listen (port) {
    this.io.listen(port)
  }
  connection (socket) {
    debug(`client ${socket.id} connected`)
    socket.on('press', (index, button) => this.emit('press', index, button))
    socket.on('depress', (index, button) => this.emit('depress', index, button))
  }
  broadcastScreen (screen) {
    encode(screen).then(buffer => {
      debug(`screen encoded into ${buffer.length} bytes.`)
      this.io.emit('screen', buffer)
    }, err => {
      error(`screen encoded failed: ${err.message}`)
    })
  }
}
