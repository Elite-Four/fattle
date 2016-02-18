import '../stylus/main.styl'
import React from 'react'
import ReactDOM from 'react-dom'
import MainNav from '../components/main-nav.js'
import Game from '../components/game.js'
import ChatBoard from '../components/chat-board.js'
import Screen from '../components/screen.js'
import injectTapEventPlugin from 'react-tap-event-plugin'
import '../lib/socket.js'
import '../lib/firebase.js'
injectTapEventPlugin();

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
    <MainNav />
    <Game />
    <ChatBoard />
  </div>,
  document.getElementById('app'))
