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

exports.crossUpdateUserQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var idObj = {}, qObj = {}, tObj = {}, dtObj = {}, ctObj = {}
    firebase.database().ref('/' + req.body.uid + '/questions/').once('value', function(snap){

      var idPath = '/' + req.body.uid + '/questions/ids',
          diffPath = '/' + req.body.uid + '/questions/' + req.body.difficulty,
          totalsPath = '/' + req.body.uid + '/questions/totals'

      if(!snap.val().ids) idObj[idPath] = [ req.body.qid ]
      else idObj[idPath] = [ ...snap.val().ids, req.body.qid ]

      qObj[diffPath + '/categories/' + req.body.category + '/' + req.body.qid ] = {
        time: req.body.time,
        result: req.body.result,
        answer: req.body.answer,
        correct_answer: req.body.correct_answer,
        question: req.body.question,
      }

      tObj[totalsPath + '/all'] = {
        answered: snap.val().totals.all.answered + 1,
        avg_time: snap.val().totals.all.avg_time === 0 ? parseFloat(req.body.time) : ((parseFloat(snap.val().totals.all.avg_time) + parseFloat(req.body.time)) / 2.00).toFixed(2),
        correct: req.body.result === 'Correct' ? snap.val().totals.all.correct + 1 : snap.val().totals.all.correct,
        incorrect: req.body.result === 'Incorrect' ? snap.val().totals.all.incorrect + 1 : snap.val().totals.all.incorrect,
        outta_times: req.body.result === 'Outta Time' ? snap.val().totals.all.outta_times + 1 : snap.val().totals.all.outta_times
      }

      dtObj[totalsPath + '/difficulty/' + req.body.difficulty] = {
        answered: snap.val().totals.difficulty[req.body.difficulty].answered + 1,
        correct: req.body.result === 'Correct' ? snap.val().totals.difficulty[req.body.difficulty].correct + 1 : snap.val().totals.difficulty[req.body.difficulty].correct,
        incorrect: req.body.result === 'Incorrect' ? snap.val().totals.difficulty[req.body.difficulty].incorrect + 1 : snap.val().totals.difficulty[req.body.difficulty].incorrect
      }

      ctObj[totalsPath + '/categories/' + req.body.category] = {
        answered: snap.val().totals.categories[req.body.category].answered + 1,
        correct: req.body.result === 'Correct' ? snap.val().totals.categories[req.body.category].correct + 1 : snap.val().totals.categories[req.body.category].correct,
        incorrect: req.body.result === 'Incorrect' ? snap.val().totals.categories[req.body.category].incorrect + 1 : snap.val().totals.categories[req.body.category].incorrect
      }

      firebase.database().ref().update(idObj);
      firebase.database().ref().update(qObj);
      firebase.database().ref().update(tObj);
      firebase.database().ref().update(dtObj);
      firebase.database().ref().update(ctObj);

    })

    res.status(200).json({ msg: 'user question updated' });
});

exports.crossUpdateUserVote = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var voteObj = {}, updateObj = {}

    // firebase.database().ref('/' + req.body.uid + '/questions/').once('value', function(snap){
    //   var votePath = '/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid
    //   voteObj[votePath] = { ...snap.val()[req.body.difficulty].categories[req.body.category][req.body.qid], vote: req.body.vote }
    //   firebase.database().ref().update(voteObj);
    // })

    firebase.database().ref('/' + req.body.uid + '/questions/').once('value', function(snap){
      var votePath = '/' + req.body.uid + '/questions/votes'

      updateObj = {
        question: req.body.question,
        difficulty: req.body.difficulty,
        category: req.body.category,
        answer: req.body.answer,
        correct_answer: req.body.correct_answer,
        result: req.body.result,
        vote: req.body.vote
      }

      voteObj[votePath] = { ...snap.val().votes, [req.body.qid]: updateObj }
      voteObj[votePath].total = voteObj[votePath].total ? voteObj[votePath].total + 1 : 1

      firebase.database().ref().update(voteObj);
    })

    res.status(200).json({ msg: 'user vote updated' });
});

exports.crossUpdateUserComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var commentObj = {}, updateObj = {}

    // firebase.database().ref('/' + req.body.uid + '/questions/').once('value', function(snap){
    //   var commentPath = '/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid
    //   commentObj[commentPath] = { ...snap.val()[req.body.difficulty].categories[req.body.category][req.body.qid], comment: req.body.comment }
    //   firebase.database().ref().update(commentObj);
    // })

    firebase.database().ref('/' + req.body.uid + '/questions/').once('value', function(snap){
      var commentPath = '/' + req.body.uid + '/questions/comments'

      updateObj = {
        question: req.body.question,
        difficulty: req.body.difficulty,
        category: req.body.category,
        answer: req.body.answer,
        correct_answer: req.body.correct_answer,
        result: req.body.result,
        comment: req.body.comment
      }

      commentObj[commentPath] = { ...snap.val().comments, [req.body.qid]: updateObj }
      commentObj[commentPath].total = commentObj[commentPath].total ? commentObj[commentPath].total + 1 : 1

      firebase.database().ref().update(commentObj);
    })

    res.status(200).json({ msg: 'user comment updated' });
});

// ~~~~~~~~~~~~~~~~~~~~ QUESTIONS ~~~~~~~~~~~~~~~~~~~~

// exports.questions = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSget(req, res)
//     firebase.database().ref('/').once('value', function(questions){ res.json(questions) });
// });

// var calcStats = function(diff, diffCats, statsObj) {

//   let questions = diffCats[diff][1]

//   for(question in questions) {
//     statsObj.totalSum++
//     questions[question].answers.total && (statsObj.answersSum += questions[question].answers.total)
//     questions[question].answers.correct && (statsObj.correctSum += questions[question].answers.correct)
//     questions[question].answers.incorrect && (statsObj.incorrectSum += questions[question].answers.incorrect)
//     questions[question].votes.total && (statsObj.voteSum.total += questions[question].votes.total)
//     questions[question].votes.good && (statsObj.voteSum.good += questions[question].votes.good)
//     questions[question].votes.neutral && (statsObj.voteSum.neutral += questions[question].votes.neutral)
//     questions[question].votes.bad && (statsObj.voteSum.bad += questions[question].votes.bad)
//     questions[question].comments && Object.keys(questions[question].comments)[0] !== 'null' && (statsObj.commentSum += (Object.keys(questions[question].comments).length))
//   }

//   return statsObj
// }

// var calcTotals = function(diffCats, obj) {
//   for(diff in diffCats){
//     var statsObj = {
//       totalSum: 0,
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

//     calcStats(diff, diffCats, statsObj)

//     obj['questions'] = obj['questions'] ? obj['questions'] + statsObj.totalSum : statsObj.totalSum
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

// exports.questionsTotals = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSget(req, res)
//     var catTotals = {}
//     firebase.database().ref('/').once('value', function(questions){

//       var easyCats = Object.entries(questions.val().Easy.categories)
//       var mediumCats = Object.entries(questions.val().Medium.categories)
//       var hardCats = Object.entries(questions.val().Hard.categories)
//       var allCats = [ ...easyCats, ...mediumCats, ...hardCats ]

//       var easyTotals = calcTotals(easyCats, {})
//       var mediumTotals = calcTotals(mediumCats, {})
//       var hardTotals = calcTotals(hardCats, {})
//       var allTotals = calcTotals(allCats, {})

//       for(cat in allCats){
//         var statsObj = {
//           totalSum: 0,
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
//             questions: catTotals[catName].questions + statsObj.totalSum,
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
//             questions: statsObj.totalSum,
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
//           Easy: easyTotals,
//           Medium: mediumTotals,
//           Hard: hardTotals
//         },
//         category: catTotals
//       }).status(200)
//     });
// });

// var sortCats = function(diff, cats) {
//   var questions = []
//   cats.forEach(cat => { for(id in cat[1]){ questions.push([id, diff, cat[0], cat[1][id]]) } })
//   return questions
// }

// exports.quickQuestion = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpost(req, res)
//     firebase.database().ref('/').once('value', function(questions){
//       var easyCats = sortCats('Easy', Object.entries(questions.val().Easy.categories))
//       var mediumCats = sortCats('Medium', Object.entries(questions.val().Medium.categories))
//       var hardCats = sortCats('Hard', Object.entries(questions.val().Hard.categories))
//       var allCats = [ ...easyCats, ...mediumCats, ...hardCats ]
//       var rng = allCats[Math.floor(Math.random() * allCats.length - 1) + 1]

//       var question = {
//         id: rng[0],
//         difficulty: rng[1],
//         category: rng[2],
//         question: rng[3].question,
//         choices: rng[3].choices
//       }

//       res.json(question)
//       // res.send('done')
//     })
// })

// exports.diffQuestion = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpost(req, res)
//     firebase.database().ref('/' + req.body.qSet + '/categories').once('value', function(snap){
//       if(!!req.body.qSet) {
//         let flatCats = sortCats(req.body.qSet, Object.entries(snap.val()))
//         var rng = flatCats[Math.floor(Math.random() * flatCats.length - 1) + 1]
//         var questionObj = {
//           id: rng[0],
//           difficulty: rng[1],
//           category: rng[2],
//           question: rng[3].question,
//           choices: rng[3].choices
//         }
//       }
//       res.json(questionObj)
//       // res.send('done')
//     })
// })

// var pushCats = function(diff, questions) {
//   if(!!questions) {
//     return questions.map(q => {
//       q[1]["difficulty"] = diff
//       return q
//     })
//   } else {
//     return []
//   }
// }

// exports.catQuestion = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpost(req, res)
//     firebase.database().ref().once('value', function(snap){
//       if(!!req.body.qSet) {
//         var easyQs = [], mediumQs = [], hardQs = []
//         if(snap.val().Easy.categories[req.body.qSet]) easyQs = pushCats('Easy', Object.entries(snap.val().Easy.categories[req.body.qSet]))
//         if(snap.val().Medium.categories[req.body.qSet]) mediumQs = pushCats('Medium', Object.entries(snap.val().Medium.categories[req.body.qSet]))
//         if(snap.val().Hard.categories[req.body.qSet]) hardQs = pushCats('Medium', Object.entries(snap.val().Hard.categories[req.body.qSet]))

//         var allQs = [ ...easyQs, ...mediumQs, ...hardQs ]
//         var rng = allQs[Math.floor(Math.random() * allQs.length - 1) + 1]

//         var questionObj = {
//           id: rng[0],
//           difficulty: rng[1].difficulty,
//           category: req.body.qSet,
//           question: rng[1].question,
//           choices: rng[1].choices
//         }
//       }
//       res.json(questionObj)
//     })
//   // res.send('done')
// })

// exports.questionResults = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpost(req, res)
//     firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
//       let calcObj = {}, resObj = {}, crossObj = {}
//       if(!!req.body.uid) {

//         var question = snap.val()

//         let calcTime = parseInt(req.body.time, 10),
//             calcTotal = question.answers.total + 1,
//             calcCorrect = question.answers.correct,
//             calcIncorrect = question.answers.incorrect,
//             calcOuttaTime = question.answers.outta_time,
//             calcResult = ''

//         if(question.answers.total !== 0) calcTime = (parseInt(req.body.time, 10) + question.answers.avg_time) / question.answers.total

//         if(req.body.answer === question.correct) {
//           calcCorrect = question.answers.correct + 1
//           calcResult = 'Correct'
//         } else if (req.body.answer === 'outta_time'){
//           calcOuttaTime = question.answers.outta_time + 1
//           calcResult = 'Outta Time'
//         } else {
//           calcIncorrect = question.answers.incorrect + 1
//           calcResult = 'Incorrect'
//         }

//         calcObj = {
//           avg_time: calcTime,
//           correct: calcCorrect,
//           incorrect: calcIncorrect,
//           outta_time: calcOuttaTime,
//           total: calcTotal
//         }

//         resObj = {
//           answerResult: calcResult,
//           correct: question.correct,
//           answers: calcObj,
//           comments: question.comments,
//           votes: question.votes
//         }

//         crossObj = {
//           uid: req.body.uid,
//           qid: req.body.qid,
//           time: req.body.time,
//           result: calcResult,
//           answer: req.body.answer,
//           correct_answer: question.correct,
//           question: question.question,
//           difficulty: req.body.difficulty,
//           category: req.body.category
//         }

//         firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/answers').update(calcObj)

//         fetch(url.crossUpdateUserQuestion, {
//           method: "POST",
//           mode: 'cors',
//           headers: {
//             "Accept": ['application/json', 'application/x-www-form-urlencoded'],
//             "Content-Type": 'application/json'
//           },
//           body: JSON.stringify(crossObj)
//           })
//           .then(res => res.json())
//           .then(r => {
//             console.log(r)
//         })
//       }

//       res.json(resObj).status(200)
//       // res.send('done')
//     })
// })

// exports.questionVote = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpatch(req, res)
//     let voteObj = {}
//     firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
//       if(!!req.body.uid) {

//         console.log(req.body)

//         voteObj = { ...snap.val().votes }
//         voteObj[req.body.vote] = voteObj[req.body.vote] + 1
//         voteObj.total = voteObj.total + 1
//         firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/votes').update(voteObj)

//         let crossObj = {
//           uid: req.body.uid,
//           qid: req.body.qid,
//           question: req.body.question,
//           difficulty: req.body.difficulty,
//           category: req.body.category,
//           answer: req.body.answer,
//           correct_answer: req.body.correct_answer,
//           result: req.body.result,
//           vote: req.body.vote
//         }

//         fetch(url.crossUpdateUserVote, {
//           method: "POST",
//           mode: 'cors',
//           headers: {
//             "Accept": ['application/json', 'application/x-www-form-urlencoded'],
//             "Content-Type": 'application/json'
//           },
//           body: JSON.stringify(crossObj)
//           })
//           .then(res => res.json())
//           .then(r => {
//             console.log(r)
//         })
//       }
//       res.json(voteObj).status(200)
//       // res.send('done')
//     })
// })

// exports.questionComment = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpatch(req, res)
//     let commentsObj = {}, commentObj = {}
//     firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
//       if(!!req.body.uid) {
//         var k = firebase.database().ref().push().key
//         commentObj = {
//           [k]: {
//             comment: req.body.comment,
//             user: req.body.user_name
//           }
//         }

//         if(!snap.val().comments) commentsObj = commentObj
//         else commentsObj = { ...snap.val().comments, ...commentObj }

//         firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/comments').update(commentsObj)

//         let crossObj = {
//           uid: req.body.uid,
//           qid: req.body.qid,
//           question: req.body.question,
//           difficulty: req.body.difficulty,
//           category: req.body.category,
//           answer: req.body.answer,
//           correct_answer: req.body.correct_answer,
//           result: req.body.result,
//           comment: req.body.comment
//         }

//         fetch(url.crossUpdateUserComment, {
//           method: "POST",
//           mode: 'cors',
//           headers: {
//             "Accept": ['application/json', 'application/x-www-form-urlencoded'],
//             "Content-Type": 'application/json'
//           },
//           body: JSON.stringify(crossObj)
//           })
//           .then(res => res.json())
//           .then(r => {
//             console.log(r)
//         })
//       }
//       res.json(commentsObj).status(200)
//       // res.send('done')
//     })
// })