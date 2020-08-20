const functions = require('firebase-functions')
const firebase = require("firebase")
const admin = require('firebase-admin')

const url = {
  database: 'https://smartapp-b3d27.firebaseio.com',
  databaseUsers: 'https://smartapp-b3d27-users.firebaseio.com/',
  databaseQuestions: 'https://smartapp-b3d27-questions.firebaseio.com/',
  rootSecured: 'https://localhost:3000',
  rootUnsecured: 'http://localhost:3000',
  // rootSecured: 'https://trunkslamchest.com',
  // rootUnsecured: 'http://trunkslamchest.com'
}

var firebaseConfig = {
  // databaseURL: url.database
  databaseURL: url.databaseUsers
  // databaseURL: url.databaseQuestions
}

firebase.initializeApp(firebaseConfig)
admin.initializeApp()

var setCORSbasic = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) { res.set('Access-Control-Allow-Origin', `${req.headers.origin}`) };
}

var setCORSget = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) { res.set('Access-Control-Allow-Origin', `${req.headers.origin}`) };
}

exports.test1 = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)
    res.status(200).send('test1 successful');
  });

exports.users = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/').once('value', function(users){ res.json(users) });
  });

exports.questions = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/').once('value', function(questions){ res.json(questions) });
  });