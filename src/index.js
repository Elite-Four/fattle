import './stylus/main.styl'
import React from 'react'
import ReactDOM from 'react-dom'
import MainNav from './jsx/main-nav.jsx'
import Screen from './jsx/screen.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <div>
    <MainNav />
    <Screen />
  </div>,
  document.getElementById('app'))
