import EmuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'
import io from 'socket.io-client'
import CONFIG from '../config.json'

let socket = io.connect(CONFIG.gameUrl)
// let socket = io.connect('https://fattle-gerhut.c9users.io/')
socket.on('screen', screen => {
  let blob = new Blob([screen], {type: 'image/png'})
  let imageData = URL.createObjectURL(blob)
  Actions.emuUpdateScreen(imageData)
})

export default socket
