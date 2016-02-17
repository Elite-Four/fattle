import React from 'react'
import Reflux from 'reflux'
import reactMixin from 'react-mixin'
import emuStore from '../stores/emu.js'
import Actions from '../stores/actions.js'

export default class Screen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gameScreen: null
    }
    Reflux.listenTo(emuStore, 'onStatusChange')
  }
  onStatusChange = gameScreen => {
    this.setState({gameScreen: gameScreen});
  }
  componentDidMount () {
    this.unsubscribe = emuStore.listen(this.onStatusChange)
  }
  componentWillUnmount () {
    this.unsubscribe()
  }
  render () {
    return (<div className="screen">
      <img className={!this.state.gameScreen ? 'hidden' : ''} src={this.state.gameScreen} alt={this.state.gameScreen} />
    </div>)
  }
}
