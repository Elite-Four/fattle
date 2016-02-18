import '../stylus/main.styl'
import React from 'react'
import ReactDOM from 'react-dom'
import MainNav from '../components/main-nav.jsx'
import Game from '../components/game.jsx'
import Screen from '../components/screen.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin'
import '../lib/socket.js'
injectTapEventPlugin();

document.oncontextmenu = e => {
  return false
}
document.onmousedown = e => {
  if(e.button == 2 || e.button == 3){
    // event.cancelBubble = true
    // event.returnValue = false;
    // return false;
    e.preventDefault()
    e.stopPropagation()
  }
}

ReactDOM.render(
  <div>
    <MainNav />
    <Game />
  </div>,
  document.getElementById('app'))
