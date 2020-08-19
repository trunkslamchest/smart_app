const functions = require('firebase-functions')

const firebase = require("firebase")

const admin = require('firebase-admin')

const url = {
  database: 'http://localhost:9000?ns=smartapp-b3d27',
  rootSecured: 'https://localhost:3000',
  rootUnsecured: 'http://localhost:3000'
  // database: 'https://smartapp-b3d27.firebaseio.com',
  // rootSecured: 'https://trunkslamchest.com',
  // rootUnsecured: 'http://trunkslamchest.com'
}

var firebaseConfig = {
  databaseURL: url.database
}

var init = firebase.initializeApp(firebaseConfig)
admin.initializeApp()

// var db = init.database()
// init.database()

exports.test1 = functions
  .region('us-east1')
  .https.onRequest((req, res) => {

    res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS'])

    if(req.headers.origin === url.rootSecured || url.rootUnsecured ) { res.set('Access-Control-Allow-Origin', `${req.headers.origin}`) }

    res.status(200).send('test1 successful')

  return parsed
});