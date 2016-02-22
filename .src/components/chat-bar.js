import React from 'react'
import Reflux from 'reflux'
import TextField from 'material-ui/lib/text-field'
import ChatStore from '../stores/chat.js'
import {sendMessage} from '../lib/firebase.js'
import LoginStore from '../stores/login.js'
export default class ChatBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      username: 'unnamed'
    }
  }
  changeValue = (e) => {
    this.setState({value: e.target.value})
  }
  sendMessage = () => {
    if (this.state.value) {
      sendMessage(this.state.username, this.state.value)
      this.setState({value: ''})
    }
  }
  setUsername = username => {
    console.log(username)
    this.setState({username: username})
  }
  componentDidMount () {
    this.unsubscribeLogin = LoginStore.listen(this.setUsername)
  }
  componentWillUnmount () {
    this.unsubscribeLogin()
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
