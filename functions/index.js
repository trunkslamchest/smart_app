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

var setCORSdelete = function(req, res){
  res.set('Access-Control-Allow-Methods', ['PATCH', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

// ~~~~~~~~~~~~~~~~~~~~ BASIC ~~~~~~~~~~~~~~~~~~~~

// exports.test1 = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
//     if(req.headers.origin === url.rootSecured || url.rootUnsecured ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
//     res.status(200).send('test1 successful');
//   });

// ~~~~~~~~~~~~~~~~~~~~ USERS ~~~~~~~~~~~~~~~~~~~~

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

exports.getUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    firebase.database().ref('/' + req.body.id).once('value', function(snap){ res.status(200).json(snap.val()) });
  });

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

exports.deleteUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    var user = ''
    if(!!req.body.uid) {
      user = `/${req.body.uid}`
      firebase.database().ref(user).remove()
    }
    res.status(200).json({msg: 'Your Profile has been removed.'})
  });

// ~~~~~~~~~~~~~~~~~~~~ QUESTIONS ~~~~~~~~~~~~~~~~~~~~

// var calcStats = function(cat, diffCats, statsObj) {
//   for(i = 1; i < diffCats[cat][1].length; i++){
//     diffCats[cat][1][i].answers.total && (statsObj.answersSum += diffCats[cat][1][i].answers.total)
//     diffCats[cat][1][i].answers.correct && (statsObj.correctSum += diffCats[cat][1][i].answers.correct)
//     diffCats[cat][1][i].answers.incorrect && (statsObj.incorrectSum += diffCats[cat][1][i].answers.incorrect)
//     diffCats[cat][1][i].votes.total && (statsObj.voteSum.total += diffCats[cat][1][i].votes.total)
//     diffCats[cat][1][i].votes.good && (statsObj.voteSum.good += diffCats[cat][1][i].votes.good)
//     diffCats[cat][1][i].votes.neutral && (statsObj.voteSum.neutral += diffCats[cat][1][i].votes.neutral)
//     diffCats[cat][1][i].votes.bad && (statsObj.voteSum.bad += diffCats[cat][1][i].votes.bad)
//     Object.keys(diffCats[cat][1][i].comments)[0] !== 'null' && (statsObj.commentSum += (diffCats[cat][1][i].comments.length - 1))
//   }
//   return statsObj
// }

// var calcTotals = function(diffCats, obj) {

//   for(cat in diffCats){
//     var statsObj = {
//       answersSum: 0,
//       correctSum: 0,
//       incorrectSum: 0,
//       commentSum: 0,
//       voteSum: {
//         total: 0,
//         good: 0,
//         neutral: 0,
//         bad: 0,
//       }
//     }

//     calcStats(cat, diffCats, statsObj)

//     obj['questions'] = obj['questions'] ? obj['questions'] + diffCats[cat][1].length - 1 : diffCats[cat][1].length - 1
//     obj['answers'] = obj['answers'] ? obj['answers'] + statsObj.answersSum : statsObj.answersSum
//     obj['correct'] = obj['correct'] ? obj['correct'] + statsObj.correctSum : statsObj.correctSum
//     obj['incorrect'] = obj['incorrect'] ? obj['incorrect'] + statsObj.incorrectSum : statsObj.incorrectSum
//     obj['votes'] = obj['votes'] ?
//       {
//         total: obj["votes"].total + statsObj.voteSum.total,
//         good: obj["votes"].good + statsObj.voteSum.good,
//         neutral: obj["votes"].neutral + statsObj.voteSum.neutral,
//         bad: obj["votes"].bad + statsObj.voteSum.bad
//       }
//     :
//       statsObj.voteSum
//     obj['comments'] = obj['comments'] ? obj['comments'] + statsObj.commentSum : statsObj.commentSum
//   }

//   return obj
// }

// exports.questionTotals = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSget(req, res)
//     var catTotals = {}
//     firebase.database().ref('/').once('value', function(questions){

//       var easyCats = Object.entries(questions.val().easy.categories)
//       var mediumCats = Object.entries(questions.val().medium.categories)
//       var hardCats = Object.entries(questions.val().hard.categories)

//       var allCats = [ ...easyCats, ...mediumCats, ...hardCats ]

//       var allTotals = calcTotals(allCats, {})
//       var easyTotals = calcTotals(easyCats, {})
//       var mediumTotals = calcTotals(mediumCats, {})
//       var hardTotals = calcTotals(hardCats, {})

//       for(cat in allCats){
//         var statsObj = {
//           answersSum: 0,
//           correctSum: 0,
//           incorrectSum: 0,
//           commentSum: 0,
//           voteSum: {
//             total: 0,
//             good: 0,
//             neutral: 0,
//             bad: 0,
//           }
//         }

//         calcStats(cat, allCats, statsObj)

//         let catName = allCats[cat][0]

//         if(catTotals[catName]){
//           catTotals[catName] = {
//             total: catTotals[catName].total + allCats[cat][1].length - 1,
//             answers: catTotals[catName].answers + statsObj.answersSum,
//             correct: catTotals[catName].correct + statsObj.correctSum,
//             incorrect: catTotals[catName].incorrect + statsObj.incorrectSum,
//             votes: {
//                 total: catTotals[catName].votes.total + statsObj.voteSum.total,
//                 good: catTotals[catName].votes.good + statsObj.voteSum.good,
//                 neutral: catTotals[catName].votes.neutral + statsObj.voteSum.neutral,
//                 bad: catTotals[catName].votes.bad + statsObj.voteSum.bad
//               },
//             comments: catTotals[catName].comments + statsObj.commentSum
//           }
//         } else {
//           catTotals[catName] = {
//             total: allCats[cat][1].length - 1,
//             answers: statsObj.answersSum,
//             correct: statsObj.correctSum,
//             incorrect: statsObj.incorrectSum,
//             votes: statsObj.voteSum,
//             comments: statsObj.commentSum
//           }
//         }
//       }

//       res.json({
//         all: allTotals,
//         difficulty: {
//           easy: easyTotals,
//           medium: mediumTotals,
//           hard: hardTotals
//         },
//         category: catTotals
//       }).status(200)
//     });
//   });