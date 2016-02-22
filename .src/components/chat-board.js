import React from 'react'
import Reflux from 'reflux'
import Snackbar from 'material-ui/lib/snackbar'
import ChatStore from '../stores/chat.js'
export default class ChatBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: {text: ''},
      showMessage: false
    }
    Reflux.listenTo(ChatStore, 'onStatusChange')
  }
  onStatusChange = messages => {
    this.setState({messages: messages, showMessage: true})
  }
  handleRequestClose = () => {
    this.setState({
      showMessage: false,
    });
  }
  componentDidMount () {
    this.unsubscribe = ChatStore.listen(this.onStatusChange)
  }
  componentWillUnmount () {
    this.unsubscribe()
  }
  render () {
    return (
      <Snackbar
        open={this.state.showMessage}
        message={this.state.messages.text}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}/>
      )
  }
}
