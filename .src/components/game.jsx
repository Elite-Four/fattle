import React from 'react'
import Screen from './screen.jsx'
import Keypad from './Keypad.jsx'
import Card from 'material-ui/lib/card/card'

export default class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    return (  <Card>
    <Screen />
    <Keypad />
  </Card>)
  }
}
