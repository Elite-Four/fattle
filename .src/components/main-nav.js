import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppBar from 'material-ui/lib/app-bar';
import ChatBar from './chat-bar.js'

import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CommunicationChat from 'material-ui/lib/svg-icons/communication/chat'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close'

export default class MainNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      chatbar: false
    }
  }
  // handleToggle = () => {
  //   this.setState({open: !this.state.open})
  // }
  // handleClose = () => {
  //   this.setState({open: false})
  // }
  handleChat = () => {
    this.setState({chatbar: !this.state.chatbar})
  }
  render() {
    return (
      <div>
        <AppBar
          title={this.state.chatbar ? <ChatBar />: 'Fattle'}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<IconButton onClick={this.handleChat}>
            {this.state.chatbar ? <NavigationClose /> : <CommunicationChat />}
          </IconButton>}/>
      </div>
    );
  }
}
