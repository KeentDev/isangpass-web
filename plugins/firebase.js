import firebase from 'firebase/app'
import 'firebase/firestore'
if (!firebase.apps.length) {
    const config = {
      apiKey: "AIzaSyAVrSAk9vit1mM0uUAM-FLvrNdHx9ioI_k",
      authDomain: "paddy-sixtieth.firebaseapp.com",
      databaseURL: "https://paddy-sixtieth.firebaseio.com",
      projectId: "paddy-sixtieth",
      storageBucket: "paddy-sixtieth.appspot.com",
      messagingSenderId: "312879663440",
      appId: "1:312879663440:web:b29fb8abca77cdb9e7c455"
    }
    firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
export {fireDb}
