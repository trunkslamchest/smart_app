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

var setCORSbasic = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSget = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSpost = function(req, res){
  res.set('Access-Control-Allow-Methods', ['POST', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSpatch = function(req, res){
  res.set('Access-Control-Allow-Methods', ['PATCH', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

// exports.test1 = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     res.status(200).send('test1 successful');
//   });

// exports.questions = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     firebase.database().ref('/').once('value', function(questions){ res.json(questions) });
//   });

// exports.users = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     firebase.database().ref('/').once('value', function(users){ res.json(users) });
//   });

exports.users = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);
    firebase.database().ref('/').once('value', function(users){ res.status(200).json(users) });
  });


exports.addUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    var obj = req.body;
    firebase.database().ref().update(obj);
    res.status(200).json(obj);
  });

// exports.getUser = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpost(req, res);
//     var user = {};
//     firebase.database().ref('/').once('value', function(users){
//       users.forEach(function(snap) { if(req.body.id === snap.key) user = snap.val() });
//       res.json(user);
//     });
//   });

exports.getUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    firebase.database().ref('/' + req.body.id).once('value', function(snap){ res.status(200).json(snap.val()) });
  });

// exports.updateUser = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpatch(req, res);
//     var updates = {};
//     firebase.database().ref('/').once('value', function(users){
//       users.forEach(function(snap) {
//         if(req.body.uid === snap.key) {
//           updates['/' + req.body.uid + '/' + 'info'] = req.body.info;
//           return firebase.database().ref().update(updates);
//         }
//         res.json(updates);
//       });
//     });
//   });

exports.updateUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedInfo = {};
    if(!!req.body.uid) {
      updatedInfo['/' + req.body.uid + '/' + 'info'] = req.body.info;
      firebase.database().ref().update(updatedInfo);
    }
    res.status(200).json(updatedInfo);
  });