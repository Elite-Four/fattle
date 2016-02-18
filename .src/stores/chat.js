import Reflux from 'reflux'
import Actions from './actions.js'

let Store = Reflux.createStore({
  listenables: [Actions],
  getInitialState () {
    this.messages = []
  },
  onMessageReceive (messages) {
    this.messages = messages
    this.trigger(this.messages)
  }
})

export default Store
