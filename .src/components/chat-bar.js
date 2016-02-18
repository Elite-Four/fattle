import React from 'react'
import TextField from 'material-ui/lib/text-field'
import {sendMessage} from '../lib/firebase.js'
export default class ChatBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  changeValue = (e) => {
    this.setState({value: e.target.value})
  }
  sendMessage = (e) => {
    sendMessage('username', e.target.value)
    this.setState({value: ''})
  }
  render () {
    return (
      <TextField
        hintText = "Chat"
        value = {this.state.value}
        onChange = {this.changeValue}
        underlineShow = {false}
        onEnterKeyDown = {this.sendMessage}/>
      )
  }
}
