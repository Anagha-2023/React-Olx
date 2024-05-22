import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD3C7dP0bG_M82k3pqdoWl195nK1lOVhRc",
  authDomain: "olx-clone-89670.firebaseapp.com",
  projectId: "olx-clone-89670",
  storageBucket: "olx-clone-89670.appspot.com",
  messagingSenderId: "552050721306",
  appId: "1:552050721306:web:3b6bb802d47f035a9b07a3",
  measurementId: "G-TZ72VS4F7W"
};

export default firebase.initializeApp(firebaseConfig)