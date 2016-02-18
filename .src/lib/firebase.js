import Firebase from 'firebase'
import Actions from '../stores/actions.js'

let firebase = new Firebase('https://sweltering-fire-3594.firebaseio.com/')

firebase.child('chatroom').on('child_added', function(snapshot) {
  Actions.messageReceive(snapshot.val())
});

function sendMessage(name, message) {
  let msg = {
    name: name,
    text: message,
    time: +new Date
  }
  firebase.child('chatroom').push(msg)
}

export {sendMessage}
export default firebase
