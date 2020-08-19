const functions = require('firebase-functions')

const firebase = require("firebase")

const admin = require('firebase-admin')

const url = {
  // database: 'http://localhost:9000?ns=smartapp-b3d27',
  // rootSecured: 'https://localhost:3000',
  // rootUnsecured: 'http://localhost:3000'
  database: 'https://smartapp-b3d27.firebaseio.com',
  rootSecured: 'https://trunkslamchest.com',
  rootUnsecured: 'http://trunkslamchest.com'
}

var firebaseConfig = {
  databaseURL: url.database
}

var init = firebase.initializeApp(firebaseConfig)
admin.initializeApp()

// var db = init.database()
// init.database()
