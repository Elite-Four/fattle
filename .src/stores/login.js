import Reflux from 'reflux'
import Actions from './actions.js'

let Store = Reflux.createStore({
  listenables: [Actions],
  getInitialState () {
    this.isLogin = false
  },
  onLogin (isLogin) {
    this.isLogin = isLogin
    this.trigger(this.isLogin)
  }
})

export default Store
