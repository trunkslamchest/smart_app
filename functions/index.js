const env = require('dotenv').config()
const functions = require('firebase-functions')
const firebase = require("firebase")
const admin = require('firebase-admin')

const fetch = require('node-fetch')

const url = {
  // database: env.parsed.LOCAL_DB,
//   databaseAchievements: env.parsed.DEPLOY_DB_ACHIEVEMENTS,
//   databaseQuestions: env.parsed.DEPLOY_DB_QUESTIONS,
//   databaseUsers: env.parsed.DEPLOY_DB_USERS,
  rootSecured: env.parsed.LOCAL_SECURED,
  rootUnsecured: env.parsed.LOCAL_UNSECURED,
//   // rootSecured: env.parsed.DEPLOY_SECURED,
//   // rootUnsecured: env.parsed.DEPLOY_UNSECURED

//   crossRoute: env.parsed.FIREBASE_CROSS_ROUTE,

//   getAchievementsFromResults: env.parsed.FIREBASE_LOCAL_GET_ACHIEVEMENTS_FROM_RESULTS,
//   crossUpdateUserQuestion: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_USER_QUESTION,
//   crossUpdateUserVote: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_USER_VOTE,
//   crossUpdateUserComment: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_USER_COMMENT,
//   crossDeleteUserComment: env.parsed.FIREBASE_LOCAL_CROSS_DELETE_USER_COMMENT,
//   crossEditUserComment: env.parsed.FIREBASE_LOCAL_CROSS_EDIT_USER_COMMENT,
//   crossUpdateAchievements: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_ACHIEVEMENTS

//   // getAchievementsFromResults: env.parsed.FIREBASE_DEPLOY_GET_ACHIEVEMENTS_FROM_RESULTS,
//   // crossUpdateUserQuestion: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_USER_QUESTION,
//   // crossUpdateUserVote: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_USER_VOTE,
//   // crossUpdateUserComment: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_USER_COMMENT,
//   // crossDeleteUserComment: env.parsed.FIREBASE_DEPLOY_CROSS_DELETE_USER_COMMENT,
//   // crossEditUserComment: env.parsed.FIREBASE_DEPLOY_CROSS_EDIT_USER_COMMENT,
//   // crossUpdatAchievements: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_ACHIEVEMENTS
}

var firebaseConfig = {
  databaseURL: env.parsed.LOCAL_DB,
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
  if(req.headers.origin === url.rootSecured || url.rootUnsecured || url.crossRoute ) res.setHeader('Access-Control-Allow-Origin', `${req.headers.origin}`);
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

exports.checkUserName = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    firebase.database().ref('/users/list').once('value', function(snap){
      // console.log(snap.val().users)
      let resObj = { valid: true, errors: {} }
      if(!!req.body.user_name) {
        if(!!snap.val()){
          let users = Object.values(snap.val())
          for(let user in users) {
            if(req.body.type === "signUp") {
              if(req.body.user_name === users[user].info.user_name) {
                resObj.valid = false
                resObj.errors = { code: 41, message: `User Name '${req.body.user_name}' already exists`}
                break
              }
            }
            if(req.body.type === "editProfile") {
              if(req.body.new_user_name !== req.body.old_user_name) {
                if(req.body.new_user_name === users[user].info.user_name) {
                  resObj.valid = false
                  resObj.errors = { code: 41, message: `User Name '${req.body.user_name}' already exists`}
                  break
                }
              }
            }
          }
        }
      }
      res.json(resObj).status(200)
      // res.json({ message: 'done' }).status(200);
    });
});

exports.checkEmail = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    firebase.database().ref('/users/list').once('value', function(snap){
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
      // res.json({ message: 'done' }).status(200);
    });
});

exports.addUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    firebase.database().ref('/users/list').update(req.body);
    res.json(req.body).status(200);
});

exports.getUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    firebase.database().ref('/users/list/' + req.body.id).once('value', function(snap){
      // console.log(snap.val())
      res.json(snap.val()).status(200)
    });
});

var sortComments = function(cats) {
  var comments = []
  cats.forEach(cat => {
    for(id in cat[1]){
      let questionObj = { qid: id, cat: cat[0], question: cat[1][id].question }
      if(!!cat[1][id].comments) questionObj.comments = Object.values(cat[1][id].comments)
      else questionObj.comments = []
      comments.push(questionObj)
    }
  })
  return comments
}

exports.getUserProfile = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    let userObj = {}
    firebase.database().ref('/users/list').once('value', function(snap){
      if(!!req.body.user_name){
        let users = snap.val()

        for(let user in users){
          if(users[user].info.user_name === req.body.user_name) {
        // console.log(users[user])
            var easyComments = users[user].questions.Easy ? sortComments(Object.entries(users[user].questions.Easy.categories)) : []
            var mediumComments = users[user].questions.Medium ? sortComments(Object.entries(users[user].questions.Medium.categories)) : []
            var hardComments = users[user].questions.Hard ? sortComments(Object.entries(users[user].questions.Hard.categories)) : []
            var allComments = [ ...easyComments, ...mediumComments, ...hardComments ]

            userObj = {
              achievements: users[user].achievements,
              experience: users[user].experience,
              info: users[user].info,
              questions: users[user].questions.totals,
              comments: allComments,
              votes: users[user].questions.totals.all.votes,
              settings: users[user].settings
            }
            break
          }
        }

        if(!!userObj.settings.privacy.profile.private) userObj = `${req.body.user_name} has set their profile to private`
        else {
          delete userObj.info.email
          if(!userObj.settings.privacy.profile.showAchievements) delete userObj.achievements
          if(!userObj.settings.privacy.profile.showAge) delete userObj.info.dob
          if(!userObj.settings.privacy.profile.showAvatar) delete userObj.info.avatar
          if(!userObj.settings.privacy.profile.showBio) delete userObj.info.bio
          if(!userObj.settings.privacy.profile.showCountry) delete userObj.info.country
          if(!userObj.settings.privacy.profile.showGender) delete userObj.info.gender
          if(!userObj.settings.privacy.profile.showGenderPronouns) delete userObj.info.gender_pronouns
          if(!userObj.settings.privacy.profile.showRealName) {
            delete userObj.info.first_name
            delete userObj.info.last_name
          }
          if(!userObj.settings.privacy.profile.showStats) delete userObj.questions
          if(!userObj.settings.privacy.profile.showVotes) delete userObj.votes
          if(!userObj.settings.privacy.profile.showComments) delete userObj.comments
        }
      }

      res.json(userObj).status(200)
      // res.json({ message: 'done' }).status(200);
    });
});

exports.updateUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedInfo = {};
    if(!!req.body.uid) {
      updatedInfo['/users/list' + '/' + req.body.uid + '/' + 'info'] = req.body.info;
      firebase.database().ref().update(updatedInfo);
    }
    res.json(updatedInfo).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.uploadUserAvatar = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedAvatar = {};
    if(!!req.body.uid) {
      updatedAvatar['/users/list' + '/' + req.body.uid + '/info/avatar'] = req.body.img;
      firebase.database().ref().update(updatedAvatar);
    }
    res.json(req.body).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.updateUserSettings = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedInfo = {};
    if(!!req.body.uid) {
      updatedInfo['/users/list' + '/' + req.body.uid + '/' + 'settings'] = req.body.settings;
      firebase.database().ref().update(updatedInfo);
    }
    res.json(req.body.settings).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.updateUserLoginTime = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedTime = {};
    if(!!req.body.uid) {
      updatedTime['/users/list' + '/' + req.body.uid + '/' + 'info/last_login'] = {
        time: req.body.time,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year
      };
      firebase.database().ref().update(updatedTime);
    }
    res.json(req.body).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.deleteUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    var user = ''
    if(!!req.body.uid) {
      user = `/users/list/${req.body.uid}`
      firebase.database().ref(user).remove()
    }
    res.json({msg: 'Your Profile has been removed.'}).status(200)
    // res.json({ message: 'done' }).status(200);
});

exports.getOverallLeaderBoards = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);
    var sortedUsers = [], leaderBoardsObj = { international: [], regional: {} }
    firebase.database().ref('/users/list').orderByChild('/questions/totals/all/rating').once('value', function(){})
    .then((resObj) => {
      resObj.forEach(function(snap) {
        var uid = snap.key, userData = snap.val()
        // if(userData.questions.totals.all.answered >= 5 && userData.questions.totals.all.rating > 0.5) {
        if(userData.questions.totals.all.answered >= 0) {
          sortedUsers.unshift({
            uid: uid,
            avatar: userData.info.avatar,
            country: userData.info.country,
            user_name: userData.info.user_name,
            rating: userData.questions.totals.all.rating
          })
        }
      })

      for(let user in sortedUsers){
        if(sortedUsers[user].country !== "null") {
          if(leaderBoardsObj.regional[sortedUsers[user].country]) leaderBoardsObj.regional[sortedUsers[user].country] = [ ...leaderBoardsObj.regional[sortedUsers[user].country], sortedUsers[user] ]
          else leaderBoardsObj.regional[sortedUsers[user].country] = [ sortedUsers[user] ]
        }
      }

      leaderBoardsObj.international = sortedUsers

      res.json(leaderBoardsObj).status(200);
      // res.json({ message: 'done' }).status(200);
    })
});

exports.getCatLeaderBoards = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);
    var catSortedUsers = {}, leaderBoardsObj = { international: [], regional: { } }

    firebase.database().ref('/users/list').once('value', function(){})
    .then(resObj => {
      resObj.forEach(function(snap) {
        var uid = snap.key, userData = snap.val(), catTotals = userData.questions.totals.category

        for(let cat in catTotals){
          // if(catTotals[cat].answered >= 5 && catTotals[cat].rating >= 0.5) {
          if(catTotals[cat].answered > 0) {
            if(catSortedUsers[cat]) {
              catSortedUsers[cat] = [
                ...catSortedUsers[cat],
                {
                  uid: uid,
                  avatar: userData.info.avatar,
                  country: userData.info.country,
                  user_name: userData.info.user_name,
                  rating: catTotals[cat].rating
                }
              ]
            } else {
              catSortedUsers[cat] = [ {
                uid: uid,
                avatar: userData.info.avatar,
                country: userData.info.country,
                user_name: userData.info.user_name,
                rating: catTotals[cat].rating
              } ]
            }
          }
        }
      })

      for(let cat in catSortedUsers) { catSortedUsers[cat].sort(function(a, b) { return b.rating - a.rating }) }

      for(let cat in catSortedUsers){
        catSortedUsers[cat].forEach(user => {
          if(user.country !== "null") {
            if(leaderBoardsObj.regional[cat]) {
              if(leaderBoardsObj.regional[cat][user.country]) leaderBoardsObj.regional[cat][user.country] = [ ...leaderBoardsObj.regional[cat][user.country], user ]
              else leaderBoardsObj.regional[cat] = { ...leaderBoardsObj.regional[cat],  [user.country]: [ user ]  }
            } else leaderBoardsObj.regional[cat] = { [user.country]: [ user ] }
          }
        })
      }

      leaderBoardsObj.international = catSortedUsers

      res.json(leaderBoardsObj).status(200);
      // res.json({ message: 'done' }).status(200);
    })
});

exports.getAchievements = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/achievements').once('value', function(snap){
      // console.log(snap.val())
      res.json(snap.val()).status(200)
    });
    // res.json({ message: 'done' }).status(200);
});

var calcStats = function(diff, diffCats, statsObj) {
  var questions = diffCats[diff][1]

  for(question in questions) {
    statsObj.totalSum++
    statsObj.timeTotalSum += questions[question].answers.total_time
    statsObj.perfSum += questions[question].rating.performance
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
  var funcAvg = function(part, all) { return part / all }
  var funcAvg100 = function(part, all) { return parseFloat(((part / all) * 100).toFixed(2)) }

  var avgObj = {
    questions: {
      correct: funcAvg100(obj.correct, obj.answers),
      incorrect: funcAvg100(obj.incorrect, obj.answers),
      outtaTime: funcAvg100(obj.outta_time, obj.answers),
      avgTime: funcAvg(obj.total_time, obj.answers),
      performance: funcAvg(obj.total_perf, obj.answers)
    },
    votes: {
      good: funcAvg100(obj.votes.good, obj.votes.total),
      neutral: funcAvg100(obj.votes.neutral, obj.votes.total),
      bad: funcAvg100(obj.votes.bad, obj.votes.total)
    }
  }

  return avgObj
}

var calcTotals = function(diffCats, obj) {
  for(diff in diffCats){
    var statsObj = {
      totalSum: 0, answersSum: 0, correctSum: 0, incorrectSum: 0, outtaTimeSum: 0, commentSum: 0, timeTotalSum: 0, perfSum: 0,
      voteSum: { total: 0, good: 0, neutral: 0, bad: 0 }
    }

    calcStats(diff, diffCats, statsObj)

    obj['questions'] = obj['questions'] ? obj['questions'] + statsObj.totalSum : statsObj.totalSum
    obj['answers'] = obj['answers'] ? obj['answers'] + statsObj.answersSum : statsObj.answersSum
    obj['correct'] = obj['correct'] ? obj['correct'] + statsObj.correctSum : statsObj.correctSum
    obj['incorrect'] = obj['incorrect'] ? obj['incorrect'] + statsObj.incorrectSum : statsObj.incorrectSum
    obj['outta_time'] = obj['outta_time'] ? obj['outta_time'] + statsObj.outtaTimeSum : statsObj.outtaTimeSum
    obj['total_time'] = obj['total_time'] ? obj['total_time'] + statsObj.timeTotalSum : statsObj.timeTotalSum
    obj['total_perf'] = obj['total_perf'] ? obj['total_perf'] + statsObj.perfSum : statsObj.perfSum
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

exports.quickQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref('/questions/list').once('value', function(snap){
      var question = {}
      if(!!req.body.answeredIds){

        let questions = snap.val()
        let formatQuestions = []

        for(question in questions){ formatQuestions.push([question, questions[question] ]) }

        const filteredQuestions = formatQuestions.filter(question => !req.body.answeredIds.includes(question[0]))

        if(filteredQuestions.length) {
          var rng = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length - 1) + 1]
          question = {
            id: rng[0],
            difficulty: rng[1].difficulty,
            category: rng[1].category,
            question: rng[1].question,
            choices: rng[1].choices
          }
        } else {
          question = {
            completed: true,
            msg1: 'You have answered all the questions!',
            msg2: 'Check back soon to see if more questions have been added to SmartApp™'
          }
        }
      }

      res.json(question).status(200)
      // res.json({ message: 'done' }).status(200);
    })
})

exports.diffQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref('/questions/list').once('value', function(snap){
      var question = {}

      if(!!req.body.qSet) {

        let questions = snap.val()
        let diffQuestions = []

        for(question in questions){
          if(questions[question].difficulty === req.body.qSet){
            diffQuestions.push([question, questions[question] ])
          }
        }

        const filteredQuestions = diffQuestions.filter(question => !req.body.answeredIds.includes(question[0]))

        if(filteredQuestions.length) {
          var rng = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length - 1) + 1]
          question = {
            id: rng[0],
            difficulty: rng[1].difficulty,
            category: rng[1].category,
            question: rng[1].question,
            choices: rng[1].choices
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
      // res.json({ message: 'done' }).status(200);
    })
})

exports.catQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    firebase.database().ref('/questions/list').once('value', function(snap){
      var question = {}

      if(!!req.body.qSet) {

        let questions = snap.val()
        let catQuestions = []

        for(question in questions){
          if(questions[question].category === req.body.qSet){
            catQuestions.push([question, questions[question] ])
          }
        }

        const filteredQuestions = catQuestions.filter(question => !req.body.answeredIds.includes(question[0]))

        if(filteredQuestions.length) {
          var rng = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length - 1) + 1]
          question = {
            id: rng[0],
            difficulty: rng[1].difficulty,
            category: rng[1].category,
            question: rng[1].question,
            choices: rng[1].choices
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
      // res.json({ message: 'done' }).status(200);
    })
})

exports.questionsTotals = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/questions/totals').once('value', function(snap){
      res.json(snap.val()).status(200);
      // res.json({ message: 'done' }).status(200);
    });
});