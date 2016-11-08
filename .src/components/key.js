import React from 'react'
import Reflux from 'reflux'
import emuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'
import socket from '../lib/socket.js'

export default class Key extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      button: props.button,
      label: props.label,
      isPressed: false
    }
  }
  pressButton = () => {
    !this.state.isPressed && (() => {
      socket.emit('press', this.state.button)
      this.setState({isPressed: true})
    })()
  }
  depressButton = () => {
    this.state.isPressed && (() => {
      socket.emit('depress', this.state.button)
      this.setState({isPressed: false})
    })()
  }
  render () {
    return <a type="button"
      className={`key ${this.props.button.toLowerCase()} ${this.props.type}`}
      onMouseUp = {this.depressButton}
      onMouseDown = {this.pressButton}
      onMouseLeave = {this.depressButton}
      onTouchStart = {this.pressButton}
      onTouchEnd = {this.depressButton}>{this.props.label}</a>
  }
}
