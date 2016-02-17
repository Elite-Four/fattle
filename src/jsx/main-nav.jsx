import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import RaisedButton from 'material-ui/lib/raised-button';
import AppBar from 'material-ui/lib/app-bar';
export default class MainNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {open: false}
  }
  handleToggle = () => {
    this.setState({open: !this.state.open})
  }
  handleClose = () => {
    this.setState({open: false})
  }
  render() {
    return (
      <div>
        <AppBar
          title="Fattle Online"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({open})}>
          <MenuItem onTouchTap={this.handleClose}>GAME</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>CHAT</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>RECORD</MenuItem>
        </LeftNav>
      </div>
    );
  }
}
