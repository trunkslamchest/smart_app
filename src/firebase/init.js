// import firebase from 'firebase'
import config from './config'
// eslint-disable-next-line
import auth from 'firebase/auth'
import firebase from 'firebase/app'

firebase.initializeApp(config)
firebase.auth()

export default firebase