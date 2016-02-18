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
      label: props.label,
      isPressed: false
    }
  }
  pressButton = () => {
    !this.state.isPressed && (() => {
      socket.emit('press', this.state.button)
      this.setState({isPressed: true})
      console.log('Press:', this.state.button)
    })()
  }
  depressButton = () => {
    this.state.isPressed && (() => {
      socket.emit('depress', this.state.button)
      this.setState({isPressed: false})
      console.log('Unpress:', this.state.button)
    })()
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
