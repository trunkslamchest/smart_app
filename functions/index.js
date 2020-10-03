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
  crossRoute: 'https://us-east1-smartapp-b3d27.cloudfunctions.net',

  crossUpdateUserQuestion: 'http://localhost:5001/smartapp-b3d27/us-east1/crossUpdateUserQuestion',
  crossUpdateUserVote: 'http://localhost:5001/smartapp-b3d27/us-east1/crossUpdateUserVote',
  crossUpdateUserComment: 'http://localhost:5001/smartapp-b3d27/us-east1/crossUpdateUserComment',
  crossDeleteUserComment: 'http://localhost:5002/smartapp-b3d27/us-east1/deleteUserComment',
  crossEditUserComment: 'http://localhost:5002/smartapp-b3d27/us-east1/editUserComment'

  // crossUpdateUserQuestion: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/crossUpdateUserQuestion',
  // crossUpdateUserVote: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/crossUpdateUserVote',
  // crossUpdateUserComment: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/crossUpdateUserComment',
  // crossDeleteUserComment: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/deleteUserComment',
  // crossEditUserComment: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/editUserComment'
}

var firebaseConfig = {
  databaseURL: url.databaseUsers,
  // databaseURL: url.databaseQuestions,
  apiKey: env.parsed.FIREBASE_API_KEY,
  authDomain: env.parsed.FIREBASE_AUTH_DOMAIN,
  projectId: env.parsed.FIREBASE_PROJECT_ID,
  storageBucket: env.parsed.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)
admin.initializeApp()

var setCORSbasic = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSget = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSpost = function(req, res){
  res.set('Access-Control-Allow-Methods', ['POST', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSpatch = function(req, res){
  res.set('Access-Control-Allow-Methods', ['PATCH', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSdelete = function(req, res){
  res.set('Access-Control-Allow-Methods', ['PATCH', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORScrossPatch = function(req, res){
  res.set('Access-Control-Allow-Methods', ['PATCH', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
  // res.set('Access-Control-Allow-Origin', '*');
}

// ~~~~~~~~~~~~~~~~~~~~ BASIC ~~~~~~~~~~~~~~~~~~~~

exports.test1 = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res);
    res.status(200).send('test1 successful');
});

// ~~~~~~~~~~~~~~~~~~~~ USERS ~~~~~~~~~~~~~~~~~~~~

var calcRating = function(stat) {
  if(stat > 1.00) return 'S'
  if(stat <= 1.00 && stat >= 0.95) return 'A+'
  if(stat < 0.95 && stat >= 0.9) return 'A'
  if(stat < 0.9 && stat >= 0.85) return 'A-'
  if(stat < 0.85 && stat >= 0.8) return 'B+'
  if(stat < 0.8 && stat >= 0.75) return 'B'
  if(stat < 0.75 && stat >= 0.7) return 'B-'
  if(stat < 0.7 && stat >= 0.65) return 'C+'
  if(stat < 0.65 && stat >= 0.6) return 'C'
  if(stat < 0.6 && stat >= 0.55) return 'C-'
  if(stat < 0.55 && stat >= 0.5) return 'D+'
  if(stat < 0.5 && stat >= 0.45) return 'D'
  if(stat < 0.45 && stat >= 0.4) return 'D-'
  if(stat < 0.4 && stat >= 0.35) return 'F+'
  if(stat < 0.35 && stat >= 0.3) return 'F'
  if(stat < 0.3 && stat >= 0.25) return 'F-'
  if(stat < 0.25) return 'E'
}

exports.users = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);
    firebase.database().ref('/').once('value', function(users){
      res.json(users).status(200);
    });
});

exports.addUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    firebase.database().ref().update(req.body);
    res.json(req.body).status(200);
});

exports.getUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    firebase.database().ref('/' + req.body.id).once('value', function(snap){
      res.json(snap.val()).status(200)
    });
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
    res.json(updatedInfo).status(200);
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
    res.json({msg: 'Your Profile has been removed.'}).status(200)
});

exports.checkUserName = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    firebase.database().ref('/').once('value', function(snap){
      let resObj = { valid: true, errors: {} }
      if(!!req.body.user_name) {
        if(!!snap.val()){
          let users = Object.values(snap.val())
          for(let user in users) {
            if(req.body.user_name === users[user].info.user_name) {
              resObj.valid = false
              resObj.errors = { code: 41, message: `User Name '${req.body.user_name}' already exists`}
              break
            }
          }
        }
      }
      res.json(resObj).status(200)
      // res.send('done')
    });
});

exports.checkEmail = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    firebase.database().ref('/').once('value', function(snap){
      let resObj = { valid: true, errors: {} }
      if(!!req.body.email) {
        let users = Object.values(snap.val())
        for(let user in users) {
          if(req.body.email === users[user].info.email){
            resObj.valid = false
            resObj.errors = { code: 41, message: `Email '${req.body.email}' already exists`}
            break
          }
        }
      }
      res.json(resObj).status(200)
    });
});

exports.crossUpdateUserQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var idObj = {}, qObj = {}, tObj = {}, dtObj = {}, ctObj = {}, xpObj = {}
    firebase.database().ref('/' + req.body.uid).once('value', function(snap){

      var idPath = '/' + req.body.uid + '/questions/ids',
          diffPath = '/' + req.body.uid + '/questions/' + req.body.difficulty,
          totalsPath = '/' + req.body.uid + '/questions/totals'
          xpPath = '/' + req.body.uid + '/experience'

      if(!snap.val().questions.ids) idObj[idPath] = [ req.body.qid ]
      else idObj[idPath] = [ ...snap.val().questions.ids, req.body.qid ]

      qObj[diffPath + '/categories/' + req.body.category + '/' + req.body.qid ] = {
        time: req.body.time,
        result: req.body.result,
        answer: req.body.answer,
        correct_answer: req.body.correct_answer,
        question: req.body.question,
        performance: req.body.performance.qPerf
      }

      xpObj[xpPath] = {
        level: parseInt(req.body.experience.level),
        total: req.body.experience.newTotal
      }

      tObj[totalsPath + '/all'] = {
        ...snap.val().questions.totals.all,
        answered: snap.val().questions.totals.all.answered + 1,
        avg_time: snap.val().questions.totals.all.avg_time === 0 ? req.body.time : parseFloat(((parseFloat(snap.val().questions.totals.all.avg_time) + req.body.time) / 2.00).toFixed(2)),
        correct: req.body.result === 'Correct' ? snap.val().questions.totals.all.correct + 1 : snap.val().questions.totals.all.correct,
        incorrect: req.body.result === 'Incorrect' ? snap.val().questions.totals.all.incorrect + 1 : snap.val().questions.totals.all.incorrect,
        outta_times: req.body.result === 'Outta Time' ? snap.val().questions.totals.all.outta_times + 1 : snap.val().questions.totals.all.outta_times,
        rating: snap.val().questions.totals.all.rating === 0 ? req.body.performance.qPerf.rating : parseFloat(((parseFloat(snap.val().questions.totals.all.rating) + req.body.performance.qPerf.rating) / 2.00).toFixed(2)),
        rank: snap.val().questions.totals.all.rank === 'NR' ? req.body.performance.qPerf.rank : calcRating(parseFloat(((parseFloat(snap.val().questions.totals.all.rating) + req.body.performance.qPerf.rating) / 2.00).toFixed(2)))
      }

      dtObj[totalsPath + '/difficulty/' + req.body.difficulty] = {
        answered: snap.val().questions.totals.difficulty[req.body.difficulty].answered + 1,
        avg_time: snap.val().questions.totals.difficulty[req.body.difficulty].avg_time === 0 ? req.body.time : parseFloat(((parseFloat(snap.val().questions.totals.difficulty[req.body.difficulty].avg_time) + req.body.time) / 2.00).toFixed(2)),
        correct: req.body.result === 'Correct' ? snap.val().questions.totals.difficulty[req.body.difficulty].correct + 1 : snap.val().questions.totals.difficulty[req.body.difficulty].correct,
        incorrect: req.body.result === 'Incorrect' ? snap.val().questions.totals.difficulty[req.body.difficulty].incorrect + 1 : snap.val().questions.totals.difficulty[req.body.difficulty].incorrect,
        outta_times: req.body.result === 'Outta Time' ? snap.val().questions.totals.difficulty[req.body.difficulty].outta_times + 1 : snap.val().questions.totals.difficulty[req.body.difficulty].outta_times,
        rating: snap.val().questions.totals.difficulty[req.body.difficulty].rating === 0 ? req.body.performance.qPerf.rating : parseFloat(((parseFloat(snap.val().questions.totals.difficulty[req.body.difficulty].rating) + req.body.performance.qPerf.rating) / 2.00).toFixed(2)),
        rank: snap.val().questions.totals.difficulty[req.body.difficulty].rank === 'NR' ? req.body.performance.qPerf.rank : calcRating(parseFloat(((parseFloat(snap.val().questions.totals.difficulty[req.body.difficulty].rating) + req.body.performance.qPerf.rating) / 2.00).toFixed(2)))
      }

      ctObj[totalsPath + '/categories/' + req.body.category] = {
        answered: snap.val().questions.totals.categories[req.body.category].answered + 1,
        avg_time: snap.val().questions.totals.categories[req.body.category].avg_time === 0 ? req.body.time : parseFloat(((parseFloat(snap.val().questions.totals.categories[req.body.category].avg_time) + req.body.time) / 2.00).toFixed(2)),
        correct: req.body.result === 'Correct' ? snap.val().questions.totals.categories[req.body.category].correct + 1 : snap.val().questions.totals.categories[req.body.category].correct,
        incorrect: req.body.result === 'Incorrect' ? snap.val().questions.totals.categories[req.body.category].incorrect + 1 : snap.val().questions.totals.categories[req.body.category].incorrect,
        outta_times: req.body.result === 'Outta Time' ? snap.val().questions.totals.categories[req.body.category].outta_times + 1 : snap.val().questions.totals.categories[req.body.category].outta_times,
        rating: snap.val().questions.totals.categories[req.body.category].rating === 0 ? req.body.performance.qPerf.rating : parseFloat(((parseFloat(snap.val().questions.totals.categories[req.body.category].rating) + req.body.performance.qPerf.rating) / 2.00).toFixed(2)),
        rank: snap.val().questions.totals.categories[req.body.category].rank === 'NR' ? req.body.performance.qPerf.rank : calcRating(parseFloat(((parseFloat(snap.val().questions.totals.categories[req.body.category].rating) + req.body.performance.qPerf.rating) / 2.00).toFixed(2)))
      }


      firebase.database().ref().update(xpObj);
      firebase.database().ref().update(idObj);
      firebase.database().ref().update(qObj);
      firebase.database().ref().update(tObj);
      firebase.database().ref().update(dtObj);
      firebase.database().ref().update(ctObj);
    })

    res.end()
});

exports.crossUpdateUserVote = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var voteObj = {}, voteTotalsObj = {}, voteTotalsBlankObj = { good: 0, neutral: 0, bad: 0, total: 0 }
    firebase.database().ref('/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
      var votePath = '/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/vote/'

      voteObj[votePath] = {
        ...snap.val().votes,
        [req.body.vid]: {
          vote: req.body.vote,
          value: req.body.value
        }
      }

      firebase.database().ref().update(voteObj);
    })

    firebase.database().ref('/' + req.body.uid + '/questions/totals/all/').once('value', function(snap){
      var voteTotalPath = '/' + req.body.uid + '/questions/totals/all/votes'
      if(!snap.val().votes) voteTotalsObj[voteTotalPath] = { ...voteTotalsBlankObj, [req.body.vote]: 1, total: 1 }
      else voteTotalsObj[voteTotalPath] = { ...snap.val().votes, [req.body.vote]: snap.val().votes[req.body.vote] + 1, total: snap.val().votes.total + 1 }
      firebase.database().ref().update(voteTotalsObj);
    })

    res.end()
});

exports.crossUpdateUserComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var commentObj = {}, commentTotalObj = {}

    firebase.database().ref('/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
      var commentPath = '/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/comments/'
      if(!snap.val().comments) commentObj[commentPath] = { [req.body.cid]: { comment: req.body.comment, timestamp: req.body.timestamp } }
      else commentObj[commentPath] = { ...snap.val().comments, [req.body.cid]: { comment: req.body.comment, timestamp: req.body.timestamp } }
      firebase.database().ref().update(commentObj);
    })

    firebase.database().ref('/' + req.body.uid + '/questions/totals/all/').once('value', function(snap){
      var commentTotalPath = '/' + req.body.uid + '/questions/totals/all/comments'
      if(!snap.val().comments) commentTotalObj[commentTotalPath] = { total: 1 }
      else commentTotalObj[commentTotalPath] = { total: snap.val().comments.total + 1 }
      firebase.database().ref().update(commentTotalObj);
    })

    res.end()
});

exports.deleteUserComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    var commentTotalsObj = {}
    var commentPath = '/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/comments/' + req.body.cid
    var commentTotalsPath = '/' + req.body.uid + '/questions/totals/all/comments/'

    firebase.database().ref(commentPath).remove()
    firebase.database().ref(commentTotalsPath).once('value', function(snap){
      if(!!req.body.cid) {
        commentTotalsObj[commentTotalsPath] = { ...snap.val() }
        commentTotalsObj[commentTotalsPath].total = commentTotalsObj[commentTotalsPath].total - 1
        if(commentTotalsObj[commentTotalsPath].total === 0) firebase.database().ref(commentTotalsPath).remove()
        else firebase.database().ref().update(commentTotalsObj);
      }
      res.json({ difficulty: req.body.difficulty, category: req.body.category, qid: req.body.qid, cid: req.body.cid }).status(200)
    })
    // res.send('done')
});

exports.editUserComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    let resObj = {}
    if(!!req.body.uid && !!req.body.cid){
      var commentPath = '/' + req.body.uid + '/questions/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/comments/' + req.body.cid
      firebase.database().ref(commentPath).update({comment: req.body.comment})
      resObj = req.body
    }

    res.json(resObj).status(200)
    // res.send('done')
});

// ~~~~~~~~~~~~~~~~~~~~ QUESTIONS ~~~~~~~~~~~~~~~~~~~~

var calcStats = function(diff, diffCats, statsObj) {
  var questions = diffCats[diff][1]

  for(question in questions) {
    statsObj.totalSum++
    statsObj.timeTotalSum += questions[question].answers.total_time
    questions[question].answers.total && (statsObj.answersSum += questions[question].answers.total)
    questions[question].answers.correct && (statsObj.correctSum += questions[question].answers.correct)
    questions[question].answers.incorrect && (statsObj.incorrectSum += questions[question].answers.incorrect)
    questions[question].answers.outta_time && (statsObj.outtaTimeSum += questions[question].answers.outta_time)
    questions[question].votes.total && (statsObj.voteSum.total += questions[question].votes.total)
    questions[question].votes.good && (statsObj.voteSum.good += questions[question].votes.good)
    questions[question].votes.neutral && (statsObj.voteSum.neutral += questions[question].votes.neutral)
    questions[question].votes.bad && (statsObj.voteSum.bad += questions[question].votes.bad)
    questions[question].comments && Object.keys(questions[question].comments)[0] !== 'null' && (statsObj.commentSum += (Object.keys(questions[question].comments).length))
  }

  return statsObj
}

var calcAvg = function(obj) {
  var funcAvg = function(part, all) { return parseFloat(((part / all) * 100).toFixed(2)) }
  var funcAvgTime = function(part, all) { return part / all }

  var avgObj = {
    questions: {
      correct: funcAvg(obj.correct, obj.answers),
      incorrect: funcAvg(obj.incorrect, obj.answers),
      outtaTime: funcAvg(obj.outta_time, obj.answers),
      avgTime: funcAvgTime(obj.total_time, obj.answers)
    },
    votes: {
      good: funcAvg(obj.votes.good, obj.votes.total),
      neutral: funcAvg(obj.votes.neutral, obj.votes.total),
      bad: funcAvg(obj.votes.bad, obj.votes.total)
    }
  }

  return avgObj
}

var calcTotals = function(diffCats, obj) {
  for(diff in diffCats){
    var statsObj = {
      totalSum: 0, answersSum: 0, correctSum: 0, incorrectSum: 0, outtaTimeSum: 0, commentSum: 0, timeTotalSum: 0,
      voteSum: { total: 0, good: 0, neutral: 0, bad: 0 }
    }

    calcStats(diff, diffCats, statsObj)

    obj['questions'] = obj['questions'] ? obj['questions'] + statsObj.totalSum : statsObj.totalSum
    obj['answers'] = obj['answers'] ? obj['answers'] + statsObj.answersSum : statsObj.answersSum
    obj['correct'] = obj['correct'] ? obj['correct'] + statsObj.correctSum : statsObj.correctSum
    obj['incorrect'] = obj['incorrect'] ? obj['incorrect'] + statsObj.incorrectSum : statsObj.incorrectSum
    obj['outta_time'] = obj['outta_time'] ? obj['outta_time'] + statsObj.outtaTimeSum : statsObj.outtaTimeSum
    obj['total_time'] = obj['total_time'] ? obj['total_time'] + statsObj.timeTotalSum : statsObj.timeTotalSum
    obj['votes'] = obj['votes'] ?
      {
        total: obj["votes"].total + statsObj.voteSum.total,
        good: obj["votes"].good + statsObj.voteSum.good,
        neutral: obj["votes"].neutral + statsObj.voteSum.neutral,
        bad: obj["votes"].bad + statsObj.voteSum.bad
      }
    : statsObj.voteSum
  }

  return obj
}

var calcQperf = function(time, result, diff) {
  let perfObj = {}, basePerf = 1.00, diffPerf = 0, timePerf = 0, finalPerf = 0, rank = ''
  if(result === 'Outta Time') finalPerf = 0.2
  else if(result === 'Incorrect') finalPerf = 0.25
  else {
    if(diff === 'Easy') diffPerf = 0.8
    if(diff === 'Medium') diffPerf = 0.9
    if(diff === 'Hard') diffPerf = 1
    timePerf = parseFloat(((10.00 - time) / 10.00).toFixed(2))
    finalPerf = parseFloat(((basePerf + timePerf + diffPerf) / 3.00).toFixed(2))
  }

  rank = calcRating(finalPerf)
  perfObj = { rating: finalPerf, rank: rank }
  return perfObj
}

var calcOperf = function(qRating, oRating) {
  let oPerfObj = {}, newOrating = qRating
  if(oRating !== 0) newOrating = parseFloat(((qRating + oRating) / 2.00).toFixed(2))
  oPerfObj = { rating: newOrating, rank: calcRating(newOrating) }
  return oPerfObj
}

var calcExperience = function(diff, time, result) {
  let diffXP = 0, timeXP = 0, baseXP = 3
  if(result === 'Correct'){
    baseXP = 8
    timeXP = (Math.round((10 - time) * 1.05))
    if(diff === 'Easy') diffXP = 2
    if(diff === 'Medium') diffXP = 5
    if(diff === 'Hard') diffXP = 10
  }
  return baseXP + diffXP + timeXP
}

var calcXPlevel = function(xp) {
  var baseLevel = 1

  const levels = {
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    6: 600,
    7: 700,
    8: 800,
    9: 900,
    10: 1000,
    11: 1100,
    12: 1200,
    13: 1300,
    14: 1400,
    15: 1500,
  }

  for(let level in levels){ if(xp > levels[level])  baseLevel = parseInt(level) + 1 }

  return baseLevel
}

var calcRating = function(stat) {
  if(stat > 1.00) return 'S'
  if(stat <= 1.00 && stat >= 0.95) return 'A+'
  if(stat < 0.95 && stat >= 0.9) return 'A'
  if(stat < 0.9 && stat >= 0.85) return 'A-'
  if(stat < 0.85 && stat >= 0.8) return 'B+'
  if(stat < 0.8 && stat >= 0.75) return 'B'
  if(stat < 0.75 && stat >= 0.7) return 'B-'
  if(stat < 0.7 && stat >= 0.65) return 'C+'
  if(stat < 0.65 && stat >= 0.6) return 'C'
  if(stat < 0.6 && stat >= 0.55) return 'C-'
  if(stat < 0.55 && stat >= 0.5) return 'D+'
  if(stat < 0.5 && stat >= 0.45) return 'D'
  if(stat < 0.45 && stat >= 0.4) return 'D-'
  if(stat < 0.4 && stat >= 0.35) return 'F+'
  if(stat < 0.35 && stat >= 0.3) return 'F'
  if(stat < 0.3 && stat >= 0.25) return 'F-'
  if(stat < 0.25) return 'E'
}

var calcVoteRating = function(good, bad, neutral) {
  if (good < 1) return 'C'
  else {
    let numRate = parseFloat(((good / (good + bad)) + (neutral * 0.05) ).toFixed(2))
    if(numRate > 1.00) return 'S'
    if(numRate <= 1.00 && numRate >= 0.95) return 'A+'
    if(numRate < 0.95 && numRate >= 0.9) return 'A'
    if(numRate < 0.9 && numRate >= 0.85) return 'A-'
    if(numRate < 0.85 && numRate >= 0.8) return 'B+'
    if(numRate < 0.8 && numRate >= 0.75) return 'B'
    if(numRate < 0.75 && numRate >= 0.7) return 'B-'
    if(numRate < 0.7 && numRate >= 0.65) return 'C+'
    if(numRate < 0.65 && numRate >= 0.6) return 'C'
    if(numRate < 0.6 && numRate >= 0.55) return 'C-'
    if(numRate < 0.55 && numRate >= 0.5) return 'D+'
    if(numRate < 0.5 && numRate >= 0.45) return 'D'
    if(numRate < 0.45 && numRate >= 0.4) return 'D-'
    if(numRate < 0.4 && numRate >= 0.35) return 'F+'
    if(numRate < 0.35 && numRate >= 0.3) return 'F'
    if(numRate < 0.3 && numRate >= 0.25) return 'F-'
    if(numRate < 0.25) return 'E'
  }
}

var calcDiffRate = function(correct, incorrect, outta_time, total) {
  if (correct !== 0) {
    let diffRate, questionsCorrectDecimal = parseFloat((incorrect / total).toFixed(2))
    if(outta_time > 0) diffRate = questionsCorrectDecimal + parseFloat((outta_time * 0.15).toFixed(2))
    else diffRate = questionsCorrectDecimal
    return calcRating(diffRate)
  } else return 'S'
}

var sortCats = function(diff, cats) {
  var questions = []
  cats.forEach(cat => { for(id in cat[1]){ questions.push([id, diff, cat[0], cat[1][id]]) } })
  return questions
}

var pushCats = function(diff, questions) {
  if(!!questions) {
    return questions.map(q => {
      q[1]["difficulty"] = diff
      return q
    })
  } else return []
}

exports.createKeys = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)
    var keys = []

    for(i = 0; i < 500; i++){
      var createKey = firebase.database().ref().push().key
      keys.push(createKey)
    }

    console.log(keys)
    res.json(keys)
});

exports.questions = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/').once('value', function(questions){ res.json(questions).status(200) });
    // res.send('done')
});

exports.questionsTotals = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    var catStats = {}, catTotals = {}, catAvg = {}
    firebase.database().ref('/').once('value', function(questions){
      var easyCats = Object.entries(questions.val().Easy.categories)
      var mediumCats = Object.entries(questions.val().Medium.categories)
      var hardCats = Object.entries(questions.val().Hard.categories)
      var allCats = [ ...easyCats, ...mediumCats, ...hardCats ]

      var easyTotals = calcTotals(easyCats, {})
      var mediumTotals = calcTotals(mediumCats, {})
      var hardTotals = calcTotals(hardCats, {})
      var allTotals = calcTotals(allCats, {})

      var easyAverages = calcAvg(easyTotals)
      var mediumAverages = calcAvg(mediumTotals)
      var hardAverages = calcAvg(hardTotals)
      var allAverages = calcAvg(allTotals)

      for(cat in allCats){
        var statsObj = {
          totalSum: 0, answersSum: 0, correctSum: 0, incorrectSum: 0, commentSum: 0, outtaTimeSum: 0, timeTotalSum: 0,
          voteSum: { total: 0, good: 0, neutral: 0, bad: 0 }
        }

        calcStats(cat, allCats, statsObj)

        let catName = allCats[cat][0]

        if(catTotals[catName]){
          catTotals[catName] = {
            questions: catTotals[catName].questions + statsObj.totalSum,
            answers: catTotals[catName].answers + statsObj.answersSum,
            correct: catTotals[catName].correct + statsObj.correctSum,
            incorrect: catTotals[catName].incorrect + statsObj.incorrectSum,
            outta_time: catTotals[catName].outta_time + statsObj.outtaTimeSum,
            total_time: catTotals[catName].total_time + statsObj.timeTotalSum,
            votes: {
                total: catTotals[catName].votes.total + statsObj.voteSum.total,
                good: catTotals[catName].votes.good + statsObj.voteSum.good,
                neutral: catTotals[catName].votes.neutral + statsObj.voteSum.neutral,
                bad: catTotals[catName].votes.bad + statsObj.voteSum.bad
              },
            comments: catTotals[catName].comments + statsObj.commentSum
          }
        } else {
          catTotals[catName] = {
            questions: statsObj.totalSum,
            answers: statsObj.answersSum,
            correct: statsObj.correctSum,
            incorrect: statsObj.incorrectSum,
            outta_time: statsObj.outtaTimeSum,
            total_time: statsObj.timeTotalSum,
            votes: statsObj.voteSum,
            comments: statsObj.commentSum
          }
        }

        catAvg[catName] = calcAvg(catTotals[catName])
        catStats[catName] = {
          totals: catTotals[catName],
          averages: catAvg[catName]
        }
      }

      res.json({
        all: { totals: allTotals, averages: allAverages },
        difficulty: {
          Easy: { totals: easyTotals, averages: easyAverages },
          Medium: { totals: mediumTotals, averages: mediumAverages },
          Hard: { totals: hardTotals, averages: hardAverages }
        },
        category: catStats
      }).status(200)
      // res.send('done')
    });
});

exports.quickQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref('/').once('value', function(questions){
      var question = {}
      if(!!req.body.answeredIds){
        var easyCats = sortCats('Easy', Object.entries(questions.val().Easy.categories))
        var mediumCats = sortCats('Medium', Object.entries(questions.val().Medium.categories))
        var hardCats = sortCats('Hard', Object.entries(questions.val().Hard.categories))
        var allCats = [ ...easyCats, ...mediumCats, ...hardCats ]

        const filterQuestions = allCats.filter(question => !req.body.answeredIds.includes(question[0]))

        if(filterQuestions.length) {
          var rng = filterQuestions[Math.floor(Math.random() * filterQuestions.length - 1) + 1]
          question = {
            id: rng[0],
            difficulty: rng[1],
            category: rng[2],
            question: rng[3].question,
            choices: rng[3].choices
          }
        } else {
          question = {
            completed: true,
            msg1: 'You have answered all the questions!',
            msg2: 'Check back soon to see if more questions have been added to SmartApp™'
          }
        }
      }
      res.json(question)
      // res.send('done')
    })
})

exports.diffQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref('/' + req.body.qSet + '/categories').once('value', function(snap){
      var question = {}

      if(!!req.body.qSet) {
        let flatCats = sortCats(req.body.qSet, Object.entries(snap.val()))

        const filterQuestions = flatCats.filter(question => !req.body.answeredIds.includes(question[0]))

        if(filterQuestions.length) {
          var rng = filterQuestions[Math.floor(Math.random() * filterQuestions.length - 1) + 1]
          var question = {
            id: rng[0],
            difficulty: rng[1],
            category: rng[2],
            question: rng[3].question,
            choices: rng[3].choices
          }
        } else {
          question = {
            completed: true,
            msg1: `You have answered all the ${req.body.qSet} questions!`,
            msg2: 'Check back soon to see if more questions have been added to SmartApp™'
          }
        }
      }
      res.json(question)
      // res.send('done')
    })
})

exports.catQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref().once('value', function(snap){
      var question = {}
      if(!!req.body.qSet) {
        var easyQs = [], mediumQs = [], hardQs = []
        if(snap.val().Easy.categories[req.body.qSet]) easyQs = pushCats('Easy', Object.entries(snap.val().Easy.categories[req.body.qSet]))
        if(snap.val().Medium.categories[req.body.qSet]) mediumQs = pushCats('Medium', Object.entries(snap.val().Medium.categories[req.body.qSet]))
        if(snap.val().Hard.categories[req.body.qSet]) hardQs = pushCats('Hard', Object.entries(snap.val().Hard.categories[req.body.qSet]))

        var allQs = [ ...easyQs, ...mediumQs, ...hardQs ]

        const filterQuestions = allQs.filter(question => !req.body.answeredIds.includes(question[0]))

        if(filterQuestions.length) {
          var rng = filterQuestions[Math.floor(Math.random() * filterQuestions.length - 1) + 1]

          question = {
            id: rng[0],
            difficulty: rng[1].difficulty,
            category: req.body.qSet,
            question: rng[1].question,
            choices: rng[1].choices
          }
        } else {
          question = {
            completed: true,
            msg1: `You have answered all the ${req.body.qSet} questions!`,
            msg2: 'Check back soon to see if more questions have been added to SmartApp™'
          }
        }
      }
      res.json(question)
      // res.send('done')
    })
})

exports.questionResults = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
      let calcObj = {}, resObj = {}, crossObj = {}, perfObj = {}, diffObj = {}, xpObj = {}
      if(!!req.body.uid) {

        var question = snap.val()

        let calcTotalTime = req.body.time,
            calcAvgTime = req.body.time,
            calcTotal = question.answers.total + 1,
            calcCorrect = question.answers.correct,
            calcIncorrect = question.answers.incorrect,
            calcOuttaTime = question.answers.outta_time,
            calcResult = '',
            calcDiffRank = '',
            calcXP = 0

        calcTotalTime = req.body.time + question.answers.total_time
        if(!!question.answers.total) calcAvgTime = (req.body.time + question.answers.avg_time) / 2.00

        if(req.body.answer === question.correct) {
          calcCorrect = question.answers.correct + 1
          calcResult = 'Correct'
          calcXP = calcExperience(req.body.difficulty, req.body.time, calcResult)
        } else if (req.body.answer === 'outta_time'){
          calcOuttaTime = question.answers.outta_time + 1
          calcResult = 'Outta Time'
        } else {
          calcIncorrect = question.answers.incorrect + 1
          calcResult = 'Incorrect'
          calcXP = calcExperience(req.body.difficulty, req.body.time, calcResult)
        }

        let qPerf = calcQperf(req.body.time, calcResult, req.body.difficulty)
        let oPerf = calcOperf(qPerf.rating, req.body.rating, req.body.rank)
        perfObj = { qPerf: qPerf, oPerf: oPerf }
        calcDiffRank = calcDiffRate(calcCorrect, calcIncorrect, calcOuttaTime, calcTotal)

        let newXP = calcXP + req.body.experience
        xpObj = { gain: calcXP, prevTotal: req.body.experience, newTotal: newXP, level: parseInt(calcXPlevel(newXP)) }

        diffObj = { ...snap.val().rating, difficulty: calcDiffRank }

        calcObj = {
          total: calcTotal,
          correct: calcCorrect,
          incorrect: calcIncorrect,
          outta_time: calcOuttaTime,
          total_time: calcTotalTime,
          avg_time: calcAvgTime
        }

        resObj = {
          qid: req.body.qid,
          answerResult: calcResult,
          correct: question.correct,
          answers: calcObj,
          comments: question.comments,
          votes: question.votes,
          diffRating: calcDiffRank,
          performance: perfObj,
          experience: xpObj
        }

        crossObj = {
          uid: req.body.uid,
          qid: req.body.qid,
          time: req.body.time,
          result: calcResult,
          answer: req.body.answer,
          correct_answer: question.correct,
          question: question.question,
          difficulty: req.body.difficulty,
          category: req.body.category,
          performance: perfObj,
          experience: xpObj
        }

        firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/answers').update(calcObj)
        firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/rating').update(diffObj)

        fetch(url.crossUpdateUserQuestion, {
          method: "POST",
          mode: 'cors',
          headers: {
            "Accept": ['application/json', 'application/x-www-form-urlencoded'],
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(crossObj)
        })
      }

      res.json(resObj).status(200)
    // res.send('done')
    })
})

exports.questionVote = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res)
    let voteObj = {}, ratingObj = {}
    firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
      if(!!req.body.uid) {

        var vid = firebase.database().ref().push().key,
            voteValue

        voteObj = { ...snap.val().votes }
        voteObj[req.body.vote] = voteObj[req.body.vote] + 1
        voteObj.total = voteObj.total + 1

        let voteRating = calcVoteRating(voteObj.good, voteObj.bad, voteObj.neutral)
        ratingObj = { ...snap.val().rating, approval: voteRating }

        firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/votes').update(voteObj)
        firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/rating').update(ratingObj)

        if(req.body.vote === 'good') voteValue = 1
        if(req.body.vote === 'neutral') voteValue = 0
        if(req.body.vote === 'bad') voteValue = -1

        voteObj["vid"] = vid
        voteObj["rating"] = voteRating
        voteObj["vote"] = req.body.vote
        voteObj["value"] = voteValue

        let crossObj = {
          vid: vid,
          uid: req.body.uid,
          qid: req.body.qid,
          question: req.body.question,
          difficulty: req.body.difficulty,
          category: req.body.category,
          answer: req.body.answer,
          correct_answer: req.body.correct_answer,
          result: req.body.result,
          vote: req.body.vote,
          value: voteValue
        }

        fetch(url.crossUpdateUserVote, {
          method: "POST",
          mode: 'cors',
          headers: {
            "Accept": ['application/json', 'application/x-www-form-urlencoded'],
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(crossObj)
        })
      }

      res.json(voteObj).status(200)
    // res.send('done')
    })
})

exports.questionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res)
    let commentsObj = {}, commentObj = {}, resObj = {}
    firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
      if(!!req.body.uid) {

        var cid = firebase.database().ref().push().key
        commentObj = {
          [cid]: {
            cid: cid,
            comment: req.body.comment,
            user: req.body.user_name,
            timestamp: req.body.timestamp
          }
        }

        if(!snap.val().comments) commentsObj = commentObj
        else commentsObj = { ...snap.val().comments, ...commentObj }

        firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/comments').update(commentsObj)

        let crossObj = {
          cid: cid,
          qid: req.body.qid,
          uid: req.body.uid,
          difficulty: req.body.difficulty,
          category: req.body.category,
          result: req.body.result,
          comment: req.body.comment,
          timestamp: req.body.timestamp
        }

        commentObj = {
          cid: cid,
          qid: req.body.qid,
          comment: req.body.comment,
          timestamp: req.body.timestamp
        }

        resObj = { commentsObj, commentObj }

        fetch(url.crossUpdateUserComment, {
          method: "POST",
          mode: 'cors',
          headers: {
            "Accept": ['application/json', 'application/x-www-form-urlencoded'],
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(crossObj)
        })
      }

      res.json(resObj).status(200)
    // res.send('done')
    })
})

exports.deleteQuestionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/comments/' + req.body.cid).remove()

    res.json({ difficulty: req.body.difficulty, category: req.body.category, qid: req.body.qid, cid: req.body.cid }).status(200)
    // res.send('done')
});

exports.editQuestionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    let resObj = {}
    if(!!req.body.uData && !!req.body.cData){
      resObj = {
        qid: req.body.uData.qid,
        uid: req.body.uData.uid,
        cid: req.body.uData.cid,
        answer: req.body.uData.answer,
        difficulty: req.body.uData.difficulty,
        category: req.body.uData.category,
        correct_answer: req.body.uData.correct_answer,
        result: req.body.uData.result,
        question: req.body.uData.question,
        comment: req.body.cData.comment,
        user_name: req.body.cData.user
      }
      firebase.database().ref('/' + req.body.uData.difficulty + '/categories/' + req.body.uData.category + '/' + req.body.uData.qid + '/comments/' + req.body.uData.cid).update(req.body.cData)
    }

    res.json(resObj).status(200)
    // res.send('done')
});