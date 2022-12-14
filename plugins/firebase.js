import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    const config = {
      apiKey: "AIzaSyCgHjuDY-lWmTPpQ3V-skkSGTqtDB-pJds",
      authDomain: "isangpass.firebaseapp.com",
      databaseURL: "https://isangpass.firebaseio.com",
      projectId: "isangpass",
      storageBucket: "isangpass.appspot.com",
      messagingSenderId: "731758679812",
      appId: "1:731758679812:web:22874a4b9c2228c8ad2251"
    }
    firebase.initializeApp(config)
}
const fireDb = firebase.firestore()
export {fireDb}
