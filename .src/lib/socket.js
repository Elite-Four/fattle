import EmuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'
import io from 'socket.io-client'

let socket = io.connect('http://socket.fattle.online/')
socket.on('screen', screen => {
  let blob = new Blob([screen], {type: 'image/png'})
  let imageData = URL.createObjectURL(blob)
  Actions.emuUpdateScreen(imageData)
})

// socket.emit('player', 0)

export default socket
