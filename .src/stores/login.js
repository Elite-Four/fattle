import Reflux from 'reflux'
import Actions from './actions.js'

let Store = Reflux.createStore({
  listenables: [Actions],
  isLogin: false,
  username: 'unnamed',
  onLogin (isLogin, username) {
    this.isLogin = isLogin
    this.username = username
    this.trigger(this.isLogin)
    this.trigger(this.username)
  }
})

export default Store
