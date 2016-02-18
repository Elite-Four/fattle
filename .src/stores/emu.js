import Reflux from 'reflux'
import Actions from './actions.js'

let Store = Reflux.createStore({
  listenables: [Actions],
  getInitialState () {
    this.gameScreen = ''
  },
  onEmuUpdateScreen (imageData) {
    this.gameScreen = imageData
    this.trigger(this.gameScreen)
  },
  onEmuKeyPress () {

  },
  onEmuKeyDepress () {

  },
  onEmuSelectController () {

  },
  getInitialState () {

  }
})

export default Store
