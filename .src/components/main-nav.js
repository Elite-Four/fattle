import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import AppBar from 'material-ui/lib/app-bar';
import ChatBar from './chat-bar.js'
import Actions from '../stores/actions.js'
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import CommunicationChat from 'material-ui/lib/svg-icons/communication/chat'

export default class MainNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      tools: false
    }
  }
  toggleTools = () => {
    Actions.toolsToggle()
    this.setState({tools: !this.state.tools})
  }
  render() {
    return (
      <div>
        <AppBar
          title='Fattle'
          onLeftIconButtonTouchTap={this.toggleTools}
          iconElementLeft={<IconButton>
            <CommunicationChat />
          </IconButton>}/>
      </div>
    );
  }
}
