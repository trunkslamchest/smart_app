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
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/users/list').once('value', function(snap){

      let resObj = { valid: true, errors: {} }

      if(!!snap.val()){
        let users = Object.values(snap.val())
        for(let user in users) {
          if(reqData.type === "signUp") {
            if(reqData.user_name === users[user].info.user_name) {
              resObj.valid = false
              resObj.errors = { code: 41, message: `User Name '${reqData.user_name}' already exists`}
              break
            }
          }
          if(reqData.type === "editProfile") {
            if(reqData.new_user_name !== reqData.old_user_name) {
              if(reqData.new_user_name === users[user].info.user_name) {
                resObj.valid = false
                resObj.errors = { code: 41, message: `User Name '${reqData.user_name}' already exists`}
                break
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
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/users/list').once('value', function(snap){
      let resObj = { valid: true, errors: {} }
      let users = Object.values(snap.val())
      for(let user in users) {
        if(reqData.email === users[user].info.email){
          resObj.valid = false
          resObj.errors = { code: 41, message: `Email '${reqData.email}' already exists`}
          break
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

    const reqData = JSON.parse(req.body.data)

    var dbRef = firebase.database().ref('/users').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error);
      });

    dbRef.then((db) => {
      var userTotals = db.totals,
          usersTotalsPath = '/' + 'users' + '/' + 'totals',
          usersTotalsObj = {}

      usersTotalsObj[usersTotalsPath] = {
        ...userTotals,
        registered: userTotals.registered + 1
      }

      firebase.database().ref('/users/list').update(reqData);
      firebase.database().ref().update(usersTotalsObj);


      res.json(reqData).status(200);
    })

});

exports.getUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/users/list/' + reqData.id).once('value', function(snap){
      res.json(snap.val()).status(200)
    });
});

exports.getUserProfile = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)
    let userObj = {}

    firebase.database().ref('/users/list').once('value', function(snap){

      let users = snap.val()

      for(let user in users){
        if(users[user].info.user_name === reqData.user_name) {
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

      if(!!userObj.settings.privacy.profile.private) userObj = `${reqData.user_name} has set their profile to private`
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

      res.json(userObj).status(200)
      // res.json({ message: 'done' }).status(200);
    });
});

exports.updateUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var updatedInfo = {};

    updatedInfo['/users/list' + '/' + reqData.uid + '/' + 'info'] = reqData.info;

    firebase.database().ref().update(updatedInfo);

    res.json(updatedInfo).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.uploadUserAvatar = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var updatedAvatar = {};

    updatedAvatar['/users/list' + '/' + reqData.uid + '/info/avatar'] = reqData.img;

    firebase.database().ref().update(updatedAvatar);

    res.json(req.body).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.updateUserSettings = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var updatedInfo = {};

    updatedInfo['/users/list' + '/' + reqData.uid + '/' + 'settings'] = reqData.settings;

    firebase.database().ref().update(updatedInfo);

    res.json(reqData.settings).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.updateUserLoginTime = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var updatedTime = {};

    updatedTime['/users/list' + '/' + reqData.uid + '/' + 'info/last_login'] = {
      time: reqData.time,
      day: reqData.day,
      month: reqData.month,
      year: reqData.year
    };

    firebase.database().ref().update(updatedTime);

    res.json(reqData).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.deleteUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var user = `/users/list/${reqData.uid}`

    firebase.database().ref(user).remove()

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
      res.json(snap.val()).status(200)
    });
    // res.json({ message: 'done' }).status(200);
});

exports.quickQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/questions/list').once('value', function(snap){
      var question = {}

      let questions = snap.val()
      let formatQuestions = []

      for(question in questions){ formatQuestions.push([question, questions[question] ]) }

      const filteredQuestions = formatQuestions.filter(question => !reqData.answeredIds.includes(question[0]))

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
      // }

      res.json(question).status(200)
      // res.json({ message: 'done' }).status(200);
    })
})

exports.diffQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/questions/list').once('value', function(snap){
      var question = {}

      let questions = snap.val()
      let diffQuestions = []

      for(question in questions){
        if(questions[question].difficulty === reqData.qSet){
          diffQuestions.push([question, questions[question] ])
        }
      }

      const filteredQuestions = diffQuestions.filter(question => !reqData.answeredIds.includes(question[0]))

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

      res.json(question)
      // res.json({ message: 'done' }).status(200);
    })
})

exports.catQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/questions/list').once('value', function(snap){
      var question = {}

        let questions = snap.val()
        let catQuestions = []

        for(question in questions){
          if(questions[question].category === reqData.qSet){
            catQuestions.push([question, questions[question] ])
          }
        }

        const filteredQuestions = catQuestions.filter(question => !reqData.answeredIds.includes(question[0]))

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

exports.questionResults = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)

    const reqData = JSON.parse(req.body.data)

    var getRef = firebase.database().ref('/').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error);
      });

    getRef.then((db) => {

      var question = db.questions.list[reqData.qid],
          questionTotals = db.questions.totals,
          user = db.users.list[reqData.uid],
          userTotals = db.users.totals,
          acheivements = db.achievements.list,
          acheivementsTotals = db.achievements.totals

      let calcObj = {},
          resObj = {},
          // userObj = {},
          questionObj = {},
          calcUserTotalsObj = {},
          calcUserDiffTotalsObj = {},
          calcUserCatTotalsObj = {},
          calcAllTotalsObj = {},
          calcAllDiffTotalsObj = {},
          calcAllCatTotalsObj = {},
          perfObj = {},
          ratingObj = {},
          xpObj = {},
          achievementsObj = {},
          calcTotalTime = reqData.time,
          calcAvgTime = reqData.time,
          calcTotal = question.answers.total + 1,
          calcCorrect = question.answers.correct,
          calcIncorrect = question.answers.incorrect,
          calcOuttaTime = question.answers.outta_time,
          calcResult = '',
          calcDiffRank = '',
          calcXP = 0

      calcTotalTime = reqData.time + question.answers.total_time
      if(!!question.answers.total) calcAvgTime = (reqData.time + question.answers.avg_time) / 2.00

      if(reqData.answer === question.correct) {
        calcCorrect = question.answers.correct + 1
        calcResult = 'Correct'
        calcXP = calcExperience(reqData.difficulty, reqData.time, calcResult)
      } else if (reqData.answer === 'outta_time'){
        calcOuttaTime = question.answers.outta_time + 1
        calcResult = 'Outta Time'
      } else {
        calcIncorrect = question.answers.incorrect + 1
        calcResult = 'Incorrect'
        calcXP = calcExperience(reqData.difficulty, reqData.time, calcResult)
      }

      let qPerf = calcQperf(reqData.time, calcResult, reqData.difficulty)
      let oPerf = calcOperf(qPerf.rating, reqData.rating, reqData.rank)
      let aPerf = question.rating.performance === 0 ? qPerf.rating : ((qPerf.rating + question.rating.performance) / 2.00)
      let newXP = calcXP + reqData.experience

      calcDiffRank = calcDiffRate(calcCorrect, calcIncorrect, calcOuttaTime, calcTotal)

      perfObj = {
        qPerf: qPerf,
        oPerf: oPerf
      }

      xpObj = {
        gain: calcXP,
        prevTotal: reqData.experience,
        newTotal: newXP,
        level: parseInt(calcXPlevel(newXP))
      }

      ratingObj = {
        ...question.rating,
        difficulty: calcDiffRank,
        performance: aPerf
      }

      calcObj = {
        total: calcTotal,
        correct: calcCorrect,
        incorrect: calcIncorrect,
        outta_time: calcOuttaTime,
        total_time: calcTotalTime,
        avg_time: calcAvgTime
      }

      questionObj = {
        time: reqData.time,
        result: calcResult,
        performance: perfObj,
        experience: xpObj
      }

      calcUserTotalsObj = {
        ...reqData.userTotals.all,
        answered: reqData.userTotals.all.answered + 1,
        avg_time: reqData.userTotals.all.avg_time === 0 ? reqData.time : parseFloat(((parseFloat(reqData.userTotals.all.avg_time) + reqData.time) / 2.00).toFixed(2)),
        correct: calcResult === 'Correct' ? reqData.userTotals.all.correct + 1 : reqData.userTotals.all.correct,
        incorrect: calcResult === 'Incorrect' ? reqData.userTotals.all.incorrect + 1 : reqData.userTotals.all.incorrect,
        outta_times: calcResult === 'Outta Time' ? reqData.userTotals.all.outta_times + 1 : reqData.userTotals.all.outta_times,
        rating: reqData.userTotals.all.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)),
        rank: reqData.userTotals.all.rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
      }

      calcUserDiffTotalsObj = {
        answered: reqData.userTotals.difficulty[reqData.difficulty].answered + 1,
        avg_time: reqData.userTotals.difficulty[reqData.difficulty].avg_time === 0 ? reqData.time : parseFloat(((parseFloat(reqData.userTotals.difficulty[reqData.difficulty].avg_time) + reqData.time) / 2.00).toFixed(2)),
        correct: calcResult === 'Correct' ? reqData.userTotals.difficulty[reqData.difficulty].correct + 1 : reqData.userTotals.difficulty[reqData.difficulty].correct,
        incorrect: calcResult === 'Incorrect' ? reqData.userTotals.difficulty[reqData.difficulty].incorrect + 1 : reqData.userTotals.difficulty[reqData.difficulty].incorrect,
        outta_times: calcResult === 'Outta Time' ? reqData.userTotals.difficulty[reqData.difficulty].outta_times + 1 : reqData.userTotals.difficulty[reqData.difficulty].outta_times,
        rating: reqData.userTotals.difficulty[reqData.difficulty].rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(reqData.userTotals.difficulty[reqData.difficulty].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)),
        rank: reqData.userTotals.difficulty[reqData.difficulty].rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.difficulty[reqData.difficulty].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
      }

      calcUserCatTotalsObj = {
        answered: reqData.userTotals.category[reqData.category].answered + 1,
        avg_time: reqData.userTotals.category[reqData.category].avg_time === 0 ? reqData.time : parseFloat(((parseFloat(reqData.userTotals.category[reqData.category].avg_time) + reqData.time) / 2.00).toFixed(2)),
        correct: calcResult === 'Correct' ? reqData.userTotals.category[reqData.category].correct + 1 : reqData.userTotals.category[reqData.category].correct,
        incorrect: calcResult === 'Incorrect' ? reqData.userTotals.category[reqData.category].incorrect + 1 : reqData.userTotals.category[reqData.category].incorrect,
        outta_times: calcResult === 'Outta Time' ? reqData.userTotals.category[reqData.category].outta_times + 1 : reqData.userTotals.category[reqData.category].outta_times,
        rating: reqData.userTotals.category[reqData.category].rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(reqData.userTotals.category[reqData.category].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)),
        rank: reqData.userTotals.category[reqData.category].rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.category[reqData.category].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
      }

      calcAllTotalsObj = {
        ...questionTotals.all,
        answers: questionTotals.all.answers + 1,
        correct: calcResult === 'Correct' ? questionTotals.all.correct + 1 : questionTotals.all.correct,
        incorrect: calcResult === 'Incorrect' ? questionTotals.all.incorrect + 1 : questionTotals.all.incorrect,
        outta_time: calcResult === 'Outta Time' ? questionTotals.all.outta_time + 1 : questionTotals.all.outta_time,
        total_time: questionTotals.all.total_time + reqData.time
      }

      calcAllTotalsObj.averages = {
        ...questionTotals.all.averages,
        answers: parseFloat((parseFloat(calcAllTotalsObj.answers) / userTotals.registered).toFixed(2)),
        avgTime: questionTotals.all.averages.avgTime === 0 ? reqData.time : parseFloat(((parseFloat(calcAllTotalsObj.total_time) / calcAllTotalsObj.answers)).toFixed(2)),
        correct: parseFloat(((parseFloat(calcAllTotalsObj.correct) / calcAllTotalsObj.answers) * 100).toFixed(2)),
        incorrect: parseFloat(((parseFloat(calcAllTotalsObj.incorrect) / calcAllTotalsObj.answers) * 100).toFixed(2)),
        outta_time: parseFloat(((parseFloat(calcAllTotalsObj.outta_time) / calcAllTotalsObj.answers) * 100).toFixed(2)),
        // rank: reqData.userTotals.all.rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
        rating: calcAllTotalsObj.averages.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(calcAllTotalsObj.averages.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      calcAllDiffTotalsObj = {
        ...questionTotals.difficulty[reqData.difficulty],
        answers: questionTotals.difficulty[reqData.difficulty].answers + 1,
        correct: calcResult === 'Correct' ? questionTotals.difficulty[reqData.difficulty].correct + 1 : questionTotals.difficulty[reqData.difficulty].correct,
        incorrect: calcResult === 'Incorrect' ? questionTotals.difficulty[reqData.difficulty].incorrect + 1 : questionTotals.difficulty[reqData.difficulty].incorrect,
        outta_time: calcResult === 'Outta Time' ? questionTotals.difficulty[reqData.difficulty].outta_time + 1 : questionTotals.difficulty[reqData.difficulty].outta_time,
        total_time: questionTotals.difficulty[reqData.difficulty].total_time + reqData.time
      }

      calcAllDiffTotalsObj.averages = {
        ...questionTotals.difficulty[reqData.difficulty].averages,
        answers: parseFloat(((parseFloat(calcAllDiffTotalsObj.answers) / calcAllTotalsObj.answers) * 100).toFixed(2)),
        avgTime: questionTotals.difficulty[reqData.difficulty].averages.avgTime === 0 ? reqData.time : parseFloat(((parseFloat(calcAllDiffTotalsObj.total_time) / calcAllDiffTotalsObj.answers)).toFixed(2)),
        correct: parseFloat(((parseFloat(calcAllDiffTotalsObj.correct) / calcAllDiffTotalsObj.answers) * 100).toFixed(2)),
        incorrect: parseFloat(((parseFloat(calcAllDiffTotalsObj.incorrect) / calcAllDiffTotalsObj.answers) * 100).toFixed(2)),
        outta_time: parseFloat(((parseFloat(calcAllDiffTotalsObj.outta_time) / calcAllDiffTotalsObj.answers) * 100).toFixed(2)),
        // rank: reqData.userTotals.all.rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
        rating: calcAllDiffTotalsObj.averages.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(calcAllDiffTotalsObj.averages.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      calcAllCatTotalsObj = {
        ...questionTotals.category[reqData.category],
        answers: questionTotals.category[reqData.category].answers + 1,
        correct: calcResult === 'Correct' ? questionTotals.category[reqData.category].correct + 1 : questionTotals.category[reqData.category].correct,
        incorrect: calcResult === 'Incorrect' ? questionTotals.category[reqData.category].incorrect + 1 : questionTotals.category[reqData.category].incorrect,
        outta_time: calcResult === 'Outta Time' ? questionTotals.category[reqData.category].outta_time + 1 : questionTotals.category[reqData.category].outta_time,
        total_time: questionTotals.category[reqData.category].total_time + reqData.time
      }

      calcAllCatTotalsObj.averages = {
        ...questionTotals.category[reqData.category].averages,
        answers: parseFloat(((parseFloat(calcAllCatTotalsObj.answers) / calcAllTotalsObj.answers) * 100).toFixed(2)),
        avgTime: questionTotals.category[reqData.category].averages.avgTime === 0 ? reqData.time : parseFloat(((parseFloat(calcAllCatTotalsObj.total_time) / calcAllCatTotalsObj.answers)).toFixed(2)),
        correct: parseFloat(((parseFloat(calcAllCatTotalsObj.correct) / calcAllCatTotalsObj.answers) * 100).toFixed(2)),
        incorrect: parseFloat(((parseFloat(calcAllCatTotalsObj.incorrect) / calcAllCatTotalsObj.answers) * 100).toFixed(2)),
        outta_time: parseFloat(((parseFloat(calcAllCatTotalsObj.outta_time) / calcAllCatTotalsObj.answers) * 100).toFixed(2)),
        // rank: reqData.userTotals.all.rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
        rating: calcAllCatTotalsObj.averages.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(calcAllCatTotalsObj.averages.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      achievementsObj = calcAchievements(acheivements, acheivementsTotals, reqData.achievements, questionObj, calcUserTotalsObj, calcUserDiffTotalsObj, calcUserCatTotalsObj)

      var userIdsPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'ids',
          userAchievementsPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'achievements',
          userQuestionPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'list' + '/' + reqData.qid,
          userXpPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'experience'
          userTotalsPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'totals' + '/' + 'all'
          userDiffTotalsPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'totals' + '/' + 'difficulty' + '/' + reqData.difficulty
          userCatTotalsPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'totals' + '/' + 'category' + '/' + reqData.category
          allTotalsPath = '/' + 'questions' + '/' + 'totals' + '/' + 'all'
          allDiffTotalsPath = '/' + 'questions' + '/' + 'totals' + '/' + 'difficulty' + '/' + reqData.difficulty
          allCatTotalsPath = '/' + 'questions' + '/' + 'totals' + '/' + 'category' + '/' + reqData.category

      var userIdsObj = {},
          userAchievementsObj = {},
          userQuestionObj = {},
          userQuestionTemp = {
            difficulty: reqData.difficulty,
            category: reqData.category,
            time: reqData.time,
            result: calcResult,
            answer: reqData.answer,
            correct_answer: question.correct,
            question: question.question,
            performance: perfObj.qPerf,
            experience: xpObj,
          }
          userXpObj = {},
          userTotalsObj = {},
          userDiffTotalsObj = {},
          userCatTotalsObj = {},
          allTotalsObj = {},
          allDiffTotalsObj = {},
          allCatTotalsObj = {}

          userQuestionObj[userQuestionPath] = userQuestionTemp
          userXpObj[userXpPath] = {
            level: parseInt(xpObj.level),
            total: xpObj.newTotal
          }
          userTotalsObj[userTotalsPath] = calcUserTotalsObj
          userDiffTotalsObj[userDiffTotalsPath] = calcUserDiffTotalsObj
          userCatTotalsObj[userCatTotalsPath] = calcUserCatTotalsObj
          allTotalsObj[allTotalsPath] = calcAllTotalsObj
          allDiffTotalsObj[allDiffTotalsPath] = calcAllDiffTotalsObj
          allCatTotalsObj[allCatTotalsPath] = calcAllCatTotalsObj

      if(!user.questions.ids) userIdsObj[userIdsPath] = [ reqData.qid ]
      else userIdsObj[userIdsPath] = [ ...user.questions.ids, reqData.qid ]

      if(achievementsObj.user.total > 0) {
        if(user.achievements.unlocked[0] === "null") {
          userAchievementsObj[userAchievementsPath] = { total: achievementsObj.user.total, unlocked: achievementsObj.user.unlocked }
        } else {
          userAchievementsObj[userAchievementsPath] = { total: achievementsObj.user.total, unlocked: [ ...achievementsObj.user.unlocked, ...reqData.achievements.unlocked ] }
        }
      }

      resObj = {
        qid: reqData.qid,
        answerResult: calcResult,
        correct: question.correct,
        answers: calcObj,
        comments: question.comments,
        votes: question.votes,
        diffRating: calcDiffRank,
        perfRating: aPerf,
        performance: perfObj,
        experience: xpObj,
        achievements: {
          user: achievementsObj.user,
          all: achievementsObj.all,
          totals: achievementsObj.totals
        },
        userTotals: {
          all: calcUserTotalsObj,
          difficulty: { ...user.questions.totals.difficulty, [reqData.difficulty]: calcUserDiffTotalsObj},
          category: { ...user.questions.totals.category, [reqData.category]: calcUserCatTotalsObj }
        },
        questionTotals: {
          all: calcAllTotalsObj,
          difficulty: {...questionTotals.difficulty, [reqData.difficulty]: calcAllDiffTotalsObj },
          category: { ...questionTotals.category, [reqData.category]: calcAllCatTotalsObj }
        }
      }

      firebase.database().ref('/' + 'questions' + '/' + 'list' + '/' + reqData.qid + '/' + 'answers').update(calcObj)
      firebase.database().ref('/' + 'questions' + '/' + 'list' + '/' + reqData.qid + '/' + 'rating').update(ratingObj)

      firebase.database().ref('/' + 'achievements' + '/' + 'list' + '/').update(achievementsObj.all);
      firebase.database().ref('/' + 'achievements' + '/' + 'totals' + '/').update(achievementsObj.totals);

      firebase.database().ref().update(userIdsObj)
      firebase.database().ref().update(userQuestionObj)
      firebase.database().ref().update(userTotalsObj)
      firebase.database().ref().update(userDiffTotalsObj)
      firebase.database().ref().update(userCatTotalsObj)
      firebase.database().ref().update(userXpObj)
      firebase.database().ref().update(userAchievementsObj)

      firebase.database().ref().update(allTotalsObj)
      firebase.database().ref().update(allDiffTotalsObj)
      firebase.database().ref().update(allCatTotalsObj)

      res.json(resObj).status(200);
    })
});

exports.questionVote = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res)

    const reqData = JSON.parse(req.body.data)

    var getRef = firebase.database().ref('/').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error);
      });

    getRef.then((db) => {
      let voteObj = {}, ratingObj = {}, voteTotalsObj = {}, userVoteObj = {}, userVoteTotalsObj = {},
          voteTotalsBlankObj = { ZeroStars: 0, OneStars: 0, TwoStars: 0, ThreeStars: 0, FourStars: 0, FireStars: 0, total: 0 }

      var question = db.questions.list[reqData.qid]
          questionTotals = db.questions.totals,
          user = db.users.list[reqData.uid],
          userTotals = db.users.totals

      var vid = firebase.database().ref().push().key

      voteObj = { ...question.votes }
      voteObj[reqData.vote] = voteObj[reqData.vote] + 1
      voteObj.total = voteObj.total + 1

      let voteAvg = calcVoteAvg(voteObj)

      let voteRating = calcVoteRating(voteAvg)
      ratingObj = { ...question.rating, approval: voteRating }

      voteTotalsObj = { ...questionTotals.all.votes, [reqData.vote]: questionTotals.all.votes[reqData.vote] + 1, total: questionTotals.all.votes.total + 1 }

      voteAveragesObj = {
        ...questionTotals.all.averages.votes,
        ZeroStars: parseFloat((parseFloat(voteTotalsObj.ZeroStars / voteTotalsObj.total) * 100).toFixed(2)),
        OneStars: parseFloat((parseFloat(voteTotalsObj.OneStars / voteTotalsObj.total) * 100).toFixed(2)),
        TwoStars: parseFloat((parseFloat(voteTotalsObj.TwoStars / voteTotalsObj.total) * 100).toFixed(2)),
        ThreeStars: parseFloat((parseFloat(voteTotalsObj.ThreeStars / voteTotalsObj.total) * 100).toFixed(2)),
        FourStars: parseFloat((parseFloat(voteTotalsObj.FourStars / voteTotalsObj.total) * 100).toFixed(2)),
        FiveStars: parseFloat((parseFloat(voteTotalsObj.FiveStars / voteTotalsObj.total) * 100).toFixed(2)),
      }

      firebase.database().ref('/questions/list/' + reqData.qid + '/votes').update(voteObj)
      firebase.database().ref('/questions/list/' + reqData.qid + '/rating').update(ratingObj)
      firebase.database().ref('/questions/totals/all/votes').update(voteTotalsObj)
      firebase.database().ref('/questions/totals/all/averages/votes').update(voteAveragesObj)

      voteObj["vid"] = vid
      voteObj["rating"] = voteRating
      voteObj["average"] = voteAvg.total
      voteObj["vote"] = reqData.vote

      var userVotePath = '/users/list/' + reqData.uid + '/questions/list/' + reqData.qid + '/vote',
          userVoteTotalPath = '/users/list/' + reqData.uid + '/questions/totals/all/votes'

      userVoteObj[userVotePath] = { ...user.questions.list[reqData.qid].votes, [vid]: { vote: reqData.vote } }

      if(user.questions.totals.all.votes) userVoteTotalsObj[userVoteTotalPath] = { ...voteTotalsBlankObj, [reqData.vote]: 1, total: 1 }
      else userVoteTotalsObj[userVoteTotalPath] = { ...user.questions.totals.all.votes, [reqData.vote]: user.questions.totals.all.votes[reqData.vote] + 1, total: user.questions.totals.all.votes.total + 1 }

      firebase.database().ref().update(userVoteObj);
      firebase.database().ref().update(userVoteTotalsObj);

      res.json(voteObj).status(200)
    // res.json({ message: 'done' }).status(200);
    })
})

exports.questionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res)

    const reqData = JSON.parse(req.body.data)

    var getRef = firebase.database().ref('/').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error);
      });

    getRef.then((db) => {

    let questionCommentsObj = {}, commentsTotalObj = {}, commentObj = {}, userCommentObj = {}, userCommentTotalsObj = {}, resObj = {}

    var question = db.questions.list[reqData.qid]
        questionTotals = db.questions.totals,
        user = db.users.list[reqData.uid],
        userTotals = db.users.totals

    var commentsTotalPath = '/' + 'questions' + '/' + 'totals' + '/' + 'all' + '/' + 'comments'
    var userCommentPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'list' + '/' + reqData.qid + '/' + 'comments'
    var userCommentsTotalPath = '/' + 'users' + '/' + 'list' + '/' + reqData.uid + '/' + 'questions' + '/' + 'totals' + '/' + 'all' + '/' + 'comments'


    var cid = firebase.database().ref().push().key

    commentObj = {
      [cid]: {
        cid: cid,
        comment: reqData.comment,
        user: reqData.user_name,
        timestamp: reqData.timestamp
      }
    }

    commentsTotalObj[commentsTotalPath] =  questionTotals.all.comments + 1

    if(!question.comments) questionCommentsObj = commentObj
    else questionCommentsObj = { ...question.comments, ...commentObj }

    firebase.database().ref('/' + 'questions' + '/' + 'list' + '/' + reqData.qid + '/' + 'comments').update(questionCommentsObj)
    firebase.database().ref().update(commentsTotalObj)

    if(!user.questions.list[reqData.qid].comments) userCommentObj[userCommentPath] = { [cid]: { comment: reqData.comment, timestamp: reqData.timestamp } }
    else userCommentObj[userCommentPath] = { ...user.questions.list[reqData.qid].comments, [cid]: { comment: reqData.comment, timestamp: reqData.timestamp } }

    firebase.database().ref().update(userCommentObj);


      if(!user.questions.totals.all.comments) userCommentTotalsObj[userCommentsTotalPath] = { total: 1 }
      else userCommentTotalsObj[userCommentsTotalPath] = { total: user.questions.totals.all.comments.total + 1 }
      firebase.database().ref().update(userCommentTotalsObj);

      commentObj = {
        cid: cid,
        qid: reqData.qid,
        comment: reqData.comment,
        timestamp: reqData.timestamp
      }

      resObj = { questionCommentsObj, commentObj }

      res.json(resObj).status(200)
    // res.json({ message: 'done' }).status(200);
    })
})



var calcVoteRating = function(voteAvg) {
  let adjustAvg = (voteAvg.total * 2) / 10.00
  if(adjustAvg > 1.00) return 'S'
  if(adjustAvg <= 1.00 && adjustAvg >= 0.95) return 'A+'
  if(adjustAvg < 0.95 && adjustAvg >= 0.9) return 'A'
  if(adjustAvg < 0.9 && adjustAvg >= 0.85) return 'A-'
  if(adjustAvg < 0.85 && adjustAvg >= 0.8) return 'B+'
  if(adjustAvg < 0.8 && adjustAvg >= 0.75) return 'B'
  if(adjustAvg < 0.75 && adjustAvg >= 0.7) return 'B-'
  if(adjustAvg < 0.7 && adjustAvg >= 0.65) return 'C+'
  if(adjustAvg < 0.65 && adjustAvg >= 0.6) return 'C'
  if(adjustAvg < 0.6 && adjustAvg >= 0.55) return 'C-'
  if(adjustAvg < 0.55 && adjustAvg >= 0.5) return 'D+'
  if(adjustAvg < 0.5 && adjustAvg >= 0.45) return 'D'
  if(adjustAvg < 0.45 && adjustAvg >= 0.4) return 'D-'
  if(adjustAvg < 0.4 && adjustAvg >= 0.35) return 'F+'
  if(adjustAvg < 0.35 && adjustAvg >= 0.3) return 'F'
  if(adjustAvg < 0.3 && adjustAvg >= 0.25) return 'F-'
  if(adjustAvg < 0.25) return 'E'
}

var calcVoteAvg = function(voteObj) {
  let multiplyObj = { ...voteObj }
  multiplyObj.FiveStars = voteObj.FiveStars * 5
  multiplyObj.FourStars = voteObj.FourStars * 4
  multiplyObj.ThreeStars = voteObj.ThreeStars * 3
  multiplyObj.TwoStars = voteObj.TwoStars * 2
  multiplyObj.OneStars = voteObj.OneStars * 1
  multiplyObj.total = parseFloat(((multiplyObj.FiveStars + multiplyObj.FourStars + multiplyObj.ThreeStars + multiplyObj.TwoStars + multiplyObj.OneStars) / voteObj.total).toFixed(2))
  return multiplyObj
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

var calcAchievements = function(achievements, achievementsTotals, userAchievements, questionResults, userTotals, userDiffTotals, userCatTotals) {

  let unlockedAchievements = [],
      resAchievementsObj = {},
      userAchievementsObj = {},
      totalsObj = {}

  if(userTotals.answered === 1) {
    unlockedAchievements.push("OneAnswer")
    if(questionResults.result === "Correct"){
      unlockedAchievements.push("OneAnswerOneCorrect")
      if(questionResults.time < 1) unlockedAchievements.push("OneAnswerOneCorrectOneSec")
    }
  }

  if(questionResults.result === "Correct") {
    if(userTotals.correct === 1 && !userAchievements.unlocked.includes("OneCorrect")) unlockedAchievements.push("OneCorrect")
    if(userTotals.correct === 5 && !userAchievements.unlocked.includes("FiveCorrect")) unlockedAchievements.push("FiveCorrect")
    if(questionResults.time < 1 && !userAchievements.unlocked.includes("OneCorrectOneSec")) unlockedAchievements.push("OneCorrectOneSec")
  }

  if(userTotals.answered === 5) unlockedAchievements.push("FiveAnswer")

  if(unlockedAchievements.length === 0 && userAchievements[0] === "null") {
    resAchievementsObj = { total: 0, unlocked: [] }
    userAchievementsObj = { total: 0, unlocked: [ "null" ] }
  } else {
    unlockedAchievements.forEach(achievement => achievements[achievement].total += 1)
    resAchievementsObj = { total: unlockedAchievements.length, unlocked: unlockedAchievements }
    userAchievementsObj = { total: userAchievements.total + unlockedAchievements.length, unlocked: unlockedAchievements }
    totalsObj = { ...achievementsTotals, all_unlocked: achievementsTotals.all_unlocked += unlockedAchievements.length}
  }

  achievementsObj = { res: resAchievementsObj, user: userAchievementsObj, all: achievements, totals: totalsObj }

  return achievementsObj
}

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

var calcDiffRate = function(correct, incorrect, outta_time, total) {
  if (correct !== 0) {
    let diffRate, questionsCorrectDecimal = parseFloat((incorrect / total).toFixed(2))
    if(outta_time > 0) diffRate = questionsCorrectDecimal + parseFloat((outta_time * 0.15).toFixed(2))
    else diffRate = questionsCorrectDecimal
    return diffRate
  } else return 1.00
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