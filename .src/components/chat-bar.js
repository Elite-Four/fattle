import React from 'react'
import Reflux from 'reflux'
import TextField from 'material-ui/lib/text-field'
import ChatStore from '../stores/chat.js'
import {sendMessage} from '../lib/firebase.js'
export default class ChatBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    Reflux.listenTo(ChatStore, 'onStatusChange')
  }
  changeValue = (e) => {
    this.setState({value: e.target.value})
  }
  sendMessage = (e) => {
    if (e.target.value) {
      sendMessage('username', e.target.value)
      this.setState({value: ''})
    }
  }
  render () {
    return (
      <TextField
        hintText = "Chat"
        value = {this.state.value}
        onChange = {this.changeValue}
        underlineShow = {false}
        fullWidth = {true}
        onEnterKeyDown = {this.sendMessage}/>
      )
  }
}
