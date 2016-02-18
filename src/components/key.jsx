import React from 'react'
import RaisedButton from 'material-ui/lib/raised-button'
import Reflux from 'reflux'
import emuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'
import socket from '../lib/socket.js'

export default class Key extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      button: props.button,
      label: props.label
    }
  }
  pressButton = () => {
    socket.emit('press', this.state.button)
  }
  depressButton = () => {
    socket.emit('depress', this.state.button)
  }
  render () {
    return (
        <RaisedButton
          label = {this.props.label}
          onMouseUp = {this.depressButton}
          onMouseDown = {this.pressButton}
          onMouseLeave = {this.depressButton}
          onTouchStart = {this.pressButton}
          onTouchEnd = {this.depressButton} />)
  }
}
