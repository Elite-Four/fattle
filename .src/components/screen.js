import React from 'react'
import CardMedia from 'material-ui/lib/card/card-media'
import Reflux from 'reflux'
import EmuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'

export default class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gameScreen: null
    }
    Reflux.listenTo(EmuStore, 'onStatusChange')
  }
  onStatusChange = gameScreen => {
    this.setState({gameScreen: gameScreen});
  }
  componentDidMount () {
    this.unsubscribe = EmuStore.listen(this.onStatusChange)
  }
  componentWillUnmount () {
    this.unsubscribe()
  }
  render () {
    return (
      <CardMedia>
        <img className={!this.state.gameScreen ? 'hidden' : ''} src={this.state.gameScreen} alt={this.state.gameScreen} />
      </CardMedia>)
  }
}
