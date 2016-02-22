import Reflux from 'reflux'
import Actions from './actions.js'

let Store = Reflux.createStore({
  listenables: [Actions],
  getInitialState () {
    this.isOpen = true
  },
  onToolsToggle (bool) {
    this.isOpen = (typeof bool !== 'undefined' ? bool : !this.isOpen)
    this.trigger(this.isOpen)
  }
})

export default Store
