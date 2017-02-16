const NesNes = require('nesnes')
require('raf').polyfill()
const sharp = require('sharp')
const WebSocket = require('ws')

const dummyCanvas = Object.create(null)
dummyCanvas.getContext = type => type === '2d' ? dummyCanvas : null
dummyCanvas.getImageData = () => dummyCanvas
dummyCanvas.putImageData = () => {}
dummyCanvas.data = dummyCanvas
dummyCanvas.set = bytes => dummyCanvas.bytes = bytes

const server = new WebSocket.Server({ port: process.env.PORT || 3000 })
const system = new NesNes(dummyCanvas)
system.load('rom.nes', true)

setTimeout(function tick () {
  const buffer = Buffer.from(dummyCanvas.bytes)
  const options = { raw: { width: 256, height: 224, channels: 4 } }
  sharp(buffer, options).jpeg().toBuffer().then(buffer => {
    for (let socket of server.clients) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(buffer)
      }
    }
    setTimeout(tick, 50)
  })
}, 100)