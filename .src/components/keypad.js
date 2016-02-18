import React from 'react'
import Key from './key.js'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'
import Reflux from 'reflux'
import emuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'

export default class Keypad extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <CardActions>
        <Key label="↑" button="UP" />
        <Key label="→" button="RIGHT" />
        <Key label="↓" button="DOWN" />
        <Key label="←" button="LEFT" />
        <Key label="A" button="A" />
        <Key label="B" button="B" />
        <Key label="START" button="START" />
        <Key label="SELECT" button="SELECT" />
      </CardActions>)
  }
}
