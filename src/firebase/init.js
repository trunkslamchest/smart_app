import firebase from 'firebase'
import config from './config'
import 'firebase/auth'
import 'firebase/app'
// import firebase from "firebase/app";
// import "firebase/auth";

firebase.initializeApp(config)
// firebase.auth()

export default firebase