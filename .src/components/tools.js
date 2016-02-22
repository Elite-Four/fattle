import React from 'react'
import Reflux from 'reflux'
import Paper from 'material-ui/lib/paper'
import ChatBar from './chat-bar.js'
import Login from './login.js'
import LoginStore from '../stores/login.js'
import ToolsStore from '../stores/tools.js'
import Actions from '../stores/actions.js'

export default class Tools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLogin: false,
      showTools: true
    }
    Reflux.listenTo(LoginStore, 'onHandlerLogin')
    // Reflux.listenTo(ToolsStore, 'onToolsToggle')
  }
  handlerLogin = bool => {
    this.setState({isLogin: bool})
  }
  handlerToolsToggle = bool => {
    this.setState({showTools: bool})
  }
  componentDidMount () {
    this.unsubscribeLogin = LoginStore.listen(this.onStatusChange)
    // this.unsubscribeTools = ToolsStore.listen(this.onStatusChange)
  }
  componentWillUnmount () {
    this.unsubscribeLogin()
    // this.unsubscribeTools()
  }
render () {
    return (
      (() => {
        if (this.state.showTools) {
          return (<Paper
            children = {
              (() => {
                if (this.state.isLogin) {
                  return <ChatBar />
                } else {
                  return <Login/>
                }
              })()
            }
          />)
        } else {
          return (<div></div>)
        }
      })()
    )
  }
}
