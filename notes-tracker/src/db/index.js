import firebase from 'firebase'
import 'firebase/firestore'

const config = {
   apiKey: "AIzaSyBdhYlCDyUOcWFWYpDKDdMkxhoRS3UgyjM",
   authDomain: "vue-firestore-tutorial-b41c4.firebaseapp.com",
   databaseURL: "https://vue-firestore-tutorial-b41c4.firebaseio.com",
   projectId: "vue-firestore-tutorial-b41c4",
   storageBucket: "vue-firestore-tutorial-b41c4.appspot.com",
   messagingSenderId: "955938320407",
   appId: "1:955938320407:web:d785dc97e6589c821a6c52"
 };
const firebaseapp = firebase.initializeApp(config);
export default firebaseapp.firestore()