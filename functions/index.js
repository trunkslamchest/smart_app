const env = require('dotenv').config()
const functions = require('firebase-functions')
const firebase = require("firebase")
const admin = require('firebase-admin')

const url = {
  database: env.parsed.DEPLOY_DB_ROOT,
  databaseUsers: env.parsed.DEPLOY_DB_USERS,
  databaseQuestions: env.parsed.DEPLOY_DB_QUESTIONS,
  rootSecured: env.parsed.LOCAL_SECURED,
  rootUnsecured: env.parsed.LOCAL_UNSECURED,
  // rootSecured: env.parsed.DEPLOY_SECURED,
  // rootUnsecured: env.parsed.DEPLOY_UNSECURED
}

var firebaseConfig = {
  databaseURL: url.databaseUsers,
  apiKey: env.parsed.FIREBASE_API_KEY,
  authDomain: env.parsed.FIREBASE_AUTH_DOMAIN,
  projectId: env.parsed.FIREBASE_PROJECT_ID,
  storageBucket: env.parsed.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)
admin.initializeApp()

// exports.test1 = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     res.status(200).send('test1 successful');
//   });

// exports.users = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     firebase.database().ref('/').once('value', function(users){ res.json(users) });
//   });

// exports.questions = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     firebase.database().ref('/').once('value', function(questions){ res.json(questions) });
//   });

exports.addUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    res.setHeader('Access-Control-Allow-Methods', ['POST', 'OPTIONS'])
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
    if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.setHeader("Access-Control-Allow-Origin", `${req.headers.origin}`);
    var obj = req.body
    firebase.database().ref().update(obj)
    res.status(200).json(obj)
  });

exports.getUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    res.set('Access-Control-Allow-Methods', ['POST', 'OPTIONS'])
    res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
    if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
    var user = {}
    firebase.database().ref('/').once('value', function(users){
      users.forEach(function(snap) { if(req.body.id === snap.key) user = snap.val() })
      res.json(user)
    })
  });