import '../stylus/main.styl'
import React from 'react'
import ReactDOM from 'react-dom'
import Keypad from '../components/keypad.js'
import Screen from '../components/screen.js'
import injectTapEventPlugin from 'react-tap-event-plugin'
import '../lib/socket.js'
import '../lib/firebase.js'
injectTapEventPlugin();

document.ontouchstart = e => {
  e.preventDefault()
}
document.ontouchmove = e => {
  e.preventDefault()
}
document.ontouchend = e => {
  e.preventDefault()
}
document.oncontextmenu = e => {
  return false
}
document.onmousedown = e => {
  if(e.button == 2 || e.button == 3){
    e.preventDefault()
    e.stopPropagation()
  }
}
ReactDOM.render(
  <div>
    <Screen />
    <Keypad />
  </div>,
  document.getElementById('app'))
