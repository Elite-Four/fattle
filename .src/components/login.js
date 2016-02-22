import React from 'react'
import Reflux from 'reflux'
import Paper from 'material-ui/lib/paper'
import ChatBar from './chat-bar.js'
import TextField from 'material-ui/lib/text-field'
import LoginStore from '../stores/login.js'
import Actions from '../stores/actions.js'

export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      value: ''
    }
  }
  changeValue = (e) => {
    this.setState({value: e.target.value})
  }
  login = e => {
    if (e.target.value) {
      Actions.login(true)
      this.setState({value: ''})
    }
  }
render () {
    return (<TextField
      hintText = "Enter Your name to play & chat"
      value = {this.state.value}
      onChange = {this.changeValue}
      fullWidth = {true}
      onEnterKeyDown = {this.login}/>)
  }
}
