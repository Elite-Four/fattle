import React from 'react'
import Key from './key.js'
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
    return <form className="keypad">
        <Key label="↑" button="UP" type="circle"/>
        <Key label="→" button="RIGHT" type="circle"/>
        <Key label="↓" button="DOWN" type="circle"/>
        <Key label="←" button="LEFT" type="circle"/>
        <Key label="A" button="A" type="circle"/>
        <Key label="B" button="B" type="circle"/>
        <Key label="START" button="START" type="rectangle"/>
        <Key label="SEL" button="SELECT" type="rectangle"/>
      </form>
  }
}
