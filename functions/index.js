const env = require('dotenv').config()
const functions = require('firebase-functions')
const firebase = require("firebase")

const url = {
  database: process.env.FIREBASE_DEPLOY_DB_ROOT,
  localSecured: process.env.FIREBASE_LOCAL_SECURED,
  localUnsecured: process.env.FIREBASE_LOCAL_UNSECURED,
  deploySecured: process.env.FIREBASE_DEPLOY_SECURED,
  deployUnsecured: process.env.FIREBASE_DEPLOY_UNSECURED
}

var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: url.database,
  messagingSenderId:  process.env.FIREBASE_MESSANGER_SENDER_ID,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
}

firebase.initializeApp(firebaseConfig)

var setCORSget = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(
    req.headers.origin === url.localSecured || req.headers.origin === url.localUnsecured ||
    req.headers.origin === url.deploySecured || req.headers.origin === url.deployUnsecured
  ) res.setHeader('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

var setCORSpost = function(req, res){
  res.set('Access-Control-Allow-Methods', ['POST', 'OPTIONS'])
  res.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  if(
    req.headers.origin === url.localSecured || req.headers.origin === url.localUnsecured ||
    req.headers.origin === url.deploySecured || req.headers.origin === url.deployUnsecured
  ) res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
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

exports.getSmarts = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    firebase.database().ref('/').once('value', function(snap){
      var resObj = {}
      var db = snap.val()
      var userObj = {}

      if(reqData.id) userObj = db.users.list[reqData.id]
      else {
        var users = db.users.list

        for(let user in users){
          if(users[user].info.user_name === reqData.user_name) {

          let questions = users[user].questions.list,
              allComments = []

            for(let question in questions) {
              if(questions[question].comments) {
                allComments.push(
                  {
                    question: questions[question].question,
                    comments: questions[question].comments
                  }
                )
              }
            }

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
      }

      resObj = {
        user: userObj,
        achievements: db.achievements,
        questionTotals: db.questions.totals
      }

      // setTimeout(() => { res.json(resObj).status(200) }, 5000)
      res.json(resObj).status(200)
    });
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

        let questions = users[user].questions.list,
            allComments = []

          for(let question in questions) {
            if(questions[question].comments) {
              allComments.push(
                {
                  question: questions[question].question,
                  comments: questions[question].comments
                }
              )
            }
          }

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
    });
});

// exports.updateUser = functions
//   .region('us-east1')
//   .https.onRequest((req, res) => {
//     setCORSpost(req, res);

//     const reqData = JSON.parse(req.body.data)

//     var updatedInfo = {};
//     updatedInfo['/users/list' + '/' + reqData.uid + '/' + 'info'] = reqData.info;

//     firebase.database().ref().update(updatedInfo);

//     res.json(updatedInfo).status(200);
// });

exports.updateUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var updatedInfo = {};

    var getRef = firebase.database().ref('/').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error)
      });

    getRef.then((db) => {
      var questions = db.questions.list
      var userQuestions = db.users.list[reqData.uid].questions.list
      var commentedQuestions = []

      if(reqData.info.user_name !== reqData.old_user_name){
        for(let qid in userQuestions){
          if(userQuestions[qid].comments) commentedQuestions.push(qid)
        }

        for(let index in commentedQuestions) {
          let qid = commentedQuestions[index]
          if(questions[qid]) {
            let questionComments = questions[qid].comments
            for(let cid in questionComments) {
              let comment = questionComments[cid]
              if(comment.uid === reqData.uid) {
                let updatedCommentObj = {}
                updatedCommentObj['/questions/list/' + qid + '/comments/' + cid ] = { ...questions[qid].comments[cid], user: reqData.info.user_name }
                firebase.database().ref().update(updatedCommentObj);
              }
            }
          }
        }
      }

      updatedInfo['/users/list' + '/' + reqData.uid + '/' + 'info'] = reqData.info;
      firebase.database().ref().update(updatedInfo)
      res.json(updatedInfo).status(200);
    })

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
});

exports.updateUserLoginTime = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var updatedTime = {}, resObj = {}

    var getRef = firebase.database().ref('/users/list').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error)
      });

    getRef.then((db) => {
      if(!!db[reqData.uid]) {
        updatedTime['/users/list' + '/' + reqData.uid + '/' + 'info/last_login'] = {
          time: reqData.time,
          day: reqData.day,
          month: reqData.month,
          year: reqData.year
        }
        resObj = reqData
        firebase.database().ref().update(updatedTime);
      } else resObj = { error: 'Could Not Update UserLogInTime: This User Does Not Exist' }

      res.json(resObj).status(200)
    })
});

exports.deleteUser = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var user = `/users/list/${reqData.uid}`

    firebase.database().ref(user).remove()

    var getRef = firebase.database().ref('/').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error);
      });

    getRef.then((db) => {

      var userTotals = db.users.totals,
          userTotalsObj = {},
          userTotalsPath = '/users/totals'

      userTotalsObj[userTotalsPath] = {
        ...userTotals,
        registered: userTotals.registered - 1
      }

      firebase.database().ref().update(userTotalsObj)
    })

    res.json({msg: 'Your Profile has been removed.'}).status(200)
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
        if(userData.questions.totals.all.answered >= 5 && userData.questions.totals.all.rating > 0.5) {
        // if(userData.questions.totals.all.answered >= 0) {
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

      leaderBoardsObj.regional = Object.entries(leaderBoardsObj.regional).sort().reduce((obj, [key, value]) => (obj[key] = value , obj), {})
      leaderBoardsObj.international = sortedUsers

      res.json(leaderBoardsObj).status(200);
    })
});

exports.getCatLeaderBoards = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);

    var catSortedUsers = {}, leaderBoardsObj = { international: [] }

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

      for(let cat in catSortedUsers) { catSortedUsers[cat].sort((a, b) => b.rating - a.rating ) }

      leaderBoardsObj.international = Object.entries(catSortedUsers).sort().reduce((obj, [key, value]) => (obj[key] = value , obj), {})

      res.json(leaderBoardsObj).status(200);
    })
});

exports.getAchievements = functions
  .region('us-east1')
  .https.onRequest((req, res) => {

    setCORSget(req, res)

    firebase.database().ref('/achievements').once('value', function(snap){
      res.json(snap.val()).status(200)
    });
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

      // setTimeout(() => { res.json(question).status(200) }, 5000)
      res.json(question).status(200)
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
          msg1: `You have answered all the ${reqData.qSet} questions!`,
          msg2: `Check back soon to see if more ${reqData.qSet} questions have been added to SmartApp™`
        }
      }

      res.json(question)
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
            msg1: `You have answered all the ${reqData.qSet} questions!`,
            msg2: `Check back soon to see if more ${reqData.qSet} questions have been added to SmartApp™`
          }
        }

      res.json(question)
    })
})

exports.questionsTotals = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)

    firebase.database().ref('/questions/totals').once('value', function(snap){
      res.json(snap.val()).status(200);
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

      calcDiffRank = calcDiffRate(calcCorrect, calcIncorrect, calcOuttaTime, calcAvgTime, calcTotal)

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
        correct: calcResult === 'Correct' ? reqData.userTotals.all.correct + 1 : reqData.userTotals.all.correct,
        incorrect: calcResult === 'Incorrect' ? reqData.userTotals.all.incorrect + 1 : reqData.userTotals.all.incorrect,
        one_sec: calcResult === 'Correct' && reqData.time < 1 ? reqData.userTotals.all.one_sec + 1 : reqData.userTotals.all.one_sec,
        outta_time: calcResult === 'Outta Time' ? reqData.userTotals.all.outta_time + 1 : reqData.userTotals.all.outta_time,
        rank: reqData.userTotals.all.rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))),
        rating: reqData.userTotals.all.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(reqData.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      calcUserTotalsObj.averages = {
        ...reqData.userTotals.all.averages,
        avgTime: reqData.userTotals.all.averages.avgTime === 0 ? reqData.time : parseFloat(((parseFloat(reqData.userTotals.all.averages.avgTime) + reqData.time) / 2.00).toFixed(2)),
        correct: parseFloat(((parseFloat(calcUserTotalsObj.correct) / calcUserTotalsObj.answered) * 100).toFixed(2)),
        incorrect: parseFloat(((parseFloat(calcUserTotalsObj.incorrect) / calcUserTotalsObj.answered) * 100).toFixed(2)),
        outta_time: parseFloat(((parseFloat(calcUserTotalsObj.outta_time) / calcUserTotalsObj.answered) * 100).toFixed(2)),
        rating: parseFloat(((parseFloat(calcUserTotalsObj.rating) / calcUserTotalsObj.answered)).toFixed(2))
      }

      calcUserDiffTotalsObj = {
        ...reqData.userTotals.difficulty[reqData.difficulty],
        answered: reqData.userTotals.difficulty[reqData.difficulty].answered + 1,
        correct: calcResult === 'Correct' ? reqData.userTotals.difficulty[reqData.difficulty].correct + 1 : reqData.userTotals.difficulty[reqData.difficulty].correct,
        incorrect: calcResult === 'Incorrect' ? reqData.userTotals.difficulty[reqData.difficulty].incorrect + 1 : reqData.userTotals.difficulty[reqData.difficulty].incorrect,
        one_sec: calcResult === 'Correct' && reqData.time < 1 ? reqData.userTotals.difficulty[reqData.difficulty].one_sec + 1 : reqData.userTotals.difficulty[reqData.difficulty].one_sec,
        outta_time: calcResult === 'Outta Time' ? reqData.userTotals.difficulty[reqData.difficulty].outta_time + 1 : reqData.userTotals.difficulty[reqData.difficulty].outta_time,
        rank: reqData.userTotals.difficulty[reqData.difficulty].rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.difficulty[reqData.difficulty].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))),
        rating: reqData.userTotals.difficulty[reqData.difficulty].rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(reqData.userTotals.difficulty[reqData.difficulty].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      calcUserDiffTotalsObj.averages = {
        ...reqData.userTotals.difficulty[reqData.difficulty].averages,
        avgTime: reqData.userTotals.difficulty[reqData.difficulty].averages.avgTime === 0 ? reqData.time : parseFloat(((parseFloat(reqData.userTotals.difficulty[reqData.difficulty].averages.avgTime) + reqData.time) / 2.00).toFixed(2)),
        correct: parseFloat(((parseFloat(calcUserDiffTotalsObj.correct) / calcUserDiffTotalsObj.answered) * 100).toFixed(2)),
        incorrect: parseFloat(((parseFloat(calcUserDiffTotalsObj.incorrect) / calcUserDiffTotalsObj.answered) * 100).toFixed(2)),
        outta_time: parseFloat(((parseFloat(calcUserDiffTotalsObj.outta_time) / calcUserDiffTotalsObj.answered) * 100).toFixed(2)),
        rating: parseFloat(((parseFloat(calcUserDiffTotalsObj.rating) / calcUserDiffTotalsObj.answered)).toFixed(2))
      }

      calcUserCatTotalsObj = {
        ...reqData.userTotals.category[reqData.category],
        answered: reqData.userTotals.category[reqData.category].answered + 1,
        correct: calcResult === 'Correct' ? reqData.userTotals.category[reqData.category].correct + 1 : reqData.userTotals.category[reqData.category].correct,
        incorrect: calcResult === 'Incorrect' ? reqData.userTotals.category[reqData.category].incorrect + 1 : reqData.userTotals.category[reqData.category].incorrect,
        one_sec: calcResult === 'Correct' && reqData.time < 1 ? reqData.userTotals.category[reqData.category].one_sec + 1 : reqData.userTotals.category[reqData.category].one_sec,
        outta_time: calcResult === 'Outta Time' ? reqData.userTotals.category[reqData.category].outta_time + 1 : reqData.userTotals.category[reqData.category].outta_time,
        rank: reqData.userTotals.category[reqData.category].rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(reqData.userTotals.category[reqData.category].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))),
        rating: reqData.userTotals.category[reqData.category].rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(reqData.userTotals.category[reqData.category].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      calcUserCatTotalsObj.averages = {
        ...reqData.userTotals.category[reqData.category].averages,
        avgTime: reqData.userTotals.category[reqData.category].averages.avgTime === 0 ? reqData.time : parseFloat(((parseFloat(reqData.userTotals.category[reqData.category].averages.avgTime) + reqData.time) / 2.00).toFixed(2)),
        correct: parseFloat(((parseFloat(calcUserCatTotalsObj.correct) / calcUserCatTotalsObj.answered) * 100).toFixed(2)),
        incorrect: parseFloat(((parseFloat(calcUserCatTotalsObj.incorrect) / calcUserCatTotalsObj.answered) * 100).toFixed(2)),
        outta_time: parseFloat(((parseFloat(calcUserCatTotalsObj.outta_time) / calcUserCatTotalsObj.answered) * 100).toFixed(2)),
        rating: parseFloat(((parseFloat(calcUserCatTotalsObj.rating) / calcUserCatTotalsObj.answered)).toFixed(2))
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
        rating: calcAllCatTotalsObj.averages.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(calcAllCatTotalsObj.averages.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2))
      }

      achievementsObj = calcAchievements(
        acheivements,
        acheivementsTotals,
        user.achievements,
        questionObj,
        {
          all: calcUserTotalsObj,
          [reqData.category]: calcUserCatTotalsObj,
          [reqData.difficulty]: calcUserDiffTotalsObj
        },
        questionTotals,
        reqData.category,
        reqData.difficulty
      )

      var userIdsPath = '/users/list/' + reqData.uid + '/questions/ids',
          userAchievementsPath = '/users/list/' + reqData.uid + '/achievements',
          userQuestionPath = '/users/list/' + reqData.uid + '/questions/list/' + reqData.qid,
          userXpPath = '/users/list/' + reqData.uid + '/experience'
          userTotalsPath = '/users/list/' + reqData.uid + '/questions/totals/all'
          userDiffTotalsPath = '/users/list/' + reqData.uid + '/questions/totals/difficulty/' + reqData.difficulty
          userCatTotalsPath = '/users/list/' + reqData.uid + '/questions/totals/category/' + reqData.category
          allTotalsPath = '/questions/totals/all'
          allDiffTotalsPath = '/questions/totals/difficulty/' + reqData.difficulty
          allCatTotalsPath = '/questions/totals/category/' + reqData.category

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

          if(achievementsObj.res.total >= 1) userQuestionTemp.achievements = achievementsObj.res

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
          user: achievementsObj.res,
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

      firebase.database().ref('/questions/list/' + reqData.qid + '/answers').update(calcObj)
      firebase.database().ref('/questions/list/' + reqData.qid + '/rating').update(ratingObj)
      firebase.database().ref('/achievements/list/').update(achievementsObj.all);
      firebase.database().ref('/achievements/totals/').update(achievementsObj.totals);
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

      res.json(resObj).status(200)
    })
});

exports.questionVote = functions
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
      let voteObj = {},
          ratingObj = {},
          voteTotalsObj = {},
          voteDiffTotalsObj = {},
          voteCatTotalsObj = {},
          userVoteObj = {},
          userVoteTotalsObj = {}

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

      voteTotalsObj = {
        ...questionTotals.all.votes,
        [reqData.vote]: questionTotals.all.votes[reqData.vote] + 1,
        total: questionTotals.all.votes.total + 1
      }

      voteDiffTotalsObj = {
        ...questionTotals.difficulty[question.difficulty].votes,
         [reqData.vote]: questionTotals.difficulty[question.difficulty].votes[reqData.vote] + 1,
        total: questionTotals.difficulty[question.difficulty].votes.total + 1
      }

      voteCatTotalsObj = {
        ...questionTotals.category[question.category].votes,
        [reqData.vote]: questionTotals.category[question.category].votes[reqData.vote] + 1,
        total: questionTotals.category[question.category].votes.total + 1
      }

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
      firebase.database().ref(`/questions/totals/difficulty/${question.difficulty}/votes`).update(voteDiffTotalsObj)
      firebase.database().ref(`/questions/totals/category/${question.category}/votes`).update(voteCatTotalsObj)

      firebase.database().ref('/questions/totals/all/averages/votes').update(voteAveragesObj)

      voteObj["vid"] = vid
      voteObj["rating"] = voteRating
      voteObj["average"] = voteAvg.total
      voteObj["vote"] = reqData.vote

      var userVotePath = '/users/list/' + reqData.uid + '/questions/list/' + reqData.qid + '/vote',
          userVoteTotalPath = '/users/list/' + reqData.uid + '/questions/totals/all/votes'

      userVoteObj[userVotePath] = { ...user.questions.list[reqData.qid].votes, [vid]: { vote: reqData.vote } }

      userVoteTotalsObj[userVoteTotalPath] = {
        ...user.questions.totals.all.votes,
        [reqData.vote]: user.questions.totals.all.votes[reqData.vote] + 1,
        total: user.questions.totals.all.votes.total + 1
      }

      firebase.database().ref().update(userVoteObj);
      firebase.database().ref().update(userVoteTotalsObj);

      res.json(voteObj).status(200)
    })
})

exports.questionComment = functions
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

      let questionCommentsObj = {},
          commentsTotalObj = {},
          commentsDiffTotalObj = {},
          commentsCatTotalObj = {},
          commentObj = {},
          userCommentObj = {},
          userCommentTotalsObj = {},
          resObj = {}

      var question = db.questions.list[reqData.qid]
          questionTotals = db.questions.totals,
          user = db.users.list[reqData.uid],
          userTotals = db.users.totals

      var commentsTotalPath = '/questions/totals/all/comments'
      var commentsDiffTotalPath = '/questions/totals/difficulty/'+ question.difficulty + '/comments'
      var commentsCatTotalPath = '/questions/totals/category/' + question.category + '/comments'

      var userCommentPath = '/users/list/' + reqData.uid + '/questions/list/' + reqData.qid + '/comments'
      var userCommentsTotalPath = '/users/list/' + reqData.uid + '/questions/totals/all/comments'

      var cid = firebase.database().ref().push().key

      commentObj = {
        [cid]: {
          uid: reqData.uid,
          cid: cid,
          comment: reqData.comment,
          user: reqData.user_name,
          timestamp: reqData.timestamp
        }
      }

      commentsTotalObj[commentsTotalPath] =  questionTotals.all.comments + 1
      commentsDiffTotalObj[commentsDiffTotalPath] = questionTotals.difficulty[question.difficulty].comments + 1
      commentsCatTotalObj[commentsCatTotalPath] = questionTotals.category[question.category].comments + 1

      if(!question.comments) questionCommentsObj = commentObj
      else questionCommentsObj = { ...question.comments, ...commentObj }

      firebase.database().ref('/' + 'questions' + '/' + 'list' + '/' + reqData.qid + '/' + 'comments').update(questionCommentsObj)
      firebase.database().ref().update(commentsTotalObj)
      firebase.database().ref().update(commentsDiffTotalObj)
      firebase.database().ref().update(commentsCatTotalObj)

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
    })
})

exports.deleteQuestionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var questionComment = `/questions/list/${reqData.question.qid}/comments/${reqData.comment.cid}`,
        userComment = `/users/list/${reqData.comment.uid}/questions/list/${reqData.question.qid}/comments/${reqData.comment.cid}`

    firebase.database().ref(questionComment).remove()
    firebase.database().ref(userComment).remove()

    var getRef = firebase.database().ref('/').get().then((snap) => {
        return snap.val()
      }).catch((error) => {
        console.error(error);
      });

    getRef.then((db) => {

      let questionCommentTotalsObj = {},
          questionCommentDiffTotalsObj = {},
          questionCommentCatTotalsObj = {},
          userCommentTotalsObj = {}

      var question = db.questions.list[reqData.question.qid]
          questionTotals = db.questions.totals,
          user = db.users.list[reqData.comment.uid],
          questionCommentTotalsPath = '/questions/totals/all',
          questionCommentDiffTotalsPath = '/questions/totals/difficulty/' + question.difficulty,
          questionCommentCatTotalsPath = '/questions/totals/category/' + question.category,

          userPath = `/users/list/${reqData.comment.uid}/questions/totals/all`

      questionCommentTotalsObj[questionCommentTotalsPath] = {
        ...questionTotals.all,
        comments: questionTotals.all.comments - 1
      }

      questionCommentDiffTotalsObj[questionCommentDiffTotalsPath] = {
        ...questionTotals.difficulty[question.difficulty],
        comments: questionTotals.difficulty[question.difficulty].comments - 1
      }

      questionCommentCatTotalsObj[questionCommentCatTotalsPath] = {
        ...questionTotals.category[question.category],
        comments: questionTotals.category[question.category].comments - 1
      }

      userCommentTotalsObj[userPath] = {
        ...user.questions.totals.all,
        comments: { total: user.questions.totals.all.comments.total - 1 }
      }

      firebase.database().ref().update(questionCommentTotalsObj);
      firebase.database().ref().update(questionCommentDiffTotalsObj);
      firebase.database().ref().update(questionCommentCatTotalsObj);
      firebase.database().ref().update(userCommentTotalsObj);

      res.json(reqData).status(200)
    })
});

exports.editQuestionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);

    const reqData = JSON.parse(req.body.data)

    var questionComment = `/questions/list/${reqData.question.qid}/comments/${reqData.comment.cid}`,
        userComment = `/users/list/${reqData.comment.uid}/questions/list/${reqData.question.qid}/comments/${reqData.comment.cid}`,
        updateCommentObj = { comment: reqData.comment.comment, timestamp: reqData.comment.timestamp }

      firebase.database().ref(questionComment).update(updateCommentObj)
      firebase.database().ref(userComment).update(updateCommentObj)

    res.json(reqData).status(200)
});

exports.staticQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)

    const reqData = JSON.parse(req.body.data)

    var voteObj = {}, resObj = {}
    firebase.database().ref('/questions/list/' + reqData.qid).once('value', function(snap){

      var question = snap.val()

      voteObj = { ...question.votes }

      let voteAvg = calcVoteAvg(voteObj)
      let voteRating = calcVoteRating(voteAvg)

      voteObj["rating"] = voteRating
      voteObj["average"] = voteAvg.total

      resObj = {
        qid: reqData.qid,
        difficulty: reqData.difficulty,
        category: reqData.category,
        answers: question.answers,
        question: question.question,
        rating: question.rating,
        diffRating: question.rating.difficulty,
        correct: question.correct,
        comments: question.comments ? question.comments : null,
        votes: voteObj
      }

      res.json(resObj).status(200)
    });
});

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

var calcAchievements = function(achievements, achievementsTotals, userAchievements, questionResults, userTotals, questionTotals, cat, diff) {

  let unlockedAchievements = [],
      resAchievementsObj = {},
      userAchievementsObj = {},
      totalsObj = {},
      allAnswered = userTotals.all.answered,
      allCorrect = userTotals.all.correct,
      diffCorrect = userTotals[diff].correct,
      catCorrect = userTotals[cat].correct,
      allOneSec = userTotals.all.one_sec

  if(allAnswered === 1 && allCorrect === 1 && !userAchievements.unlocked.includes("1Answer1Correct")) unlockedAchievements.push("1Answer1Correct")

  if(
    (allAnswered === 1 && allCorrect === 1 && allOneSec === 1) ||
    (allAnswered === 5 && allCorrect === 5 && allOneSec === 5) ||
    (allAnswered === 10 && allCorrect === 10 && allOneSec === 10) ||
    (allAnswered === 25 && allCorrect === 25 && allOneSec === 25) &&
    !userAchievements.unlocked.includes(`${allAnswered}Answer${allCorrect}Correct1Sec`)
  ) unlockedAchievements.push(`${allAnswered}Answer${allCorrect}Correct1Sec`)

  if((allAnswered === 50 ||
    allAnswered === 100 ||
    allAnswered === 150 ||
    allAnswered === 200 ||
    allAnswered === 250 ||
    allAnswered === 500) &&
    !userAchievements.unlocked.includes(`${allAnswered}Answer`)
  ) unlockedAchievements.push(`${allAnswered}Answer`)

  if(( diffCorrect === 25 || diffCorrect === 50 || diffCorrect === 75 || diffCorrect === 100) &&
  !userAchievements.unlocked.includes(`Answer${diffCorrect}${diff}Correct`)) {
    unlockedAchievements.push(`Answer${diffCorrect}${diff}Correct`)
  }

  if((catCorrect === 10 || catCorrect === 25) &&
  !userAchievements.unlocked.includes(`Answer${catCorrect}${cat.split(" ").join('')}Correct`)) {
    unlockedAchievements.push(`Answer${catCorrect}${cat.split(" ").join('')}Correct`)
  }

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
    1: "100",
    2: "200",
    3: "300",
    4: "400",
    5: "500",
    6: "600",
    7: "700",
    8: "800",
    9: "900",
    10: "1000",
    11: "1100",
    12: "1200",
    13: "1300",
    14: "1400",
    15: "1500",
    16: "1600",
    17: "1700",
    18: "1800",
    19: "1900",
    20: "2000",
    21: "2100",
    22: "2200",
    23: "2300",
    24: "2400",
    25: "2500",
    26: "2600",
    27: "2700",
    28: "2800",
    29: "2900",
    30: "3000",
    31: "3100",
    32: "3200",
    33: "3300",
    34: "3400",
    35: "3500",
    36: "3600",
    37: "3700",
    38: "3800",
    39: "3900",
    40: "4000",
    41: "4100",
    42: "4200",
    43: "4300",
    44: "4400",
    45: "4500",
    46: "4600",
    47: "4700",
    48: "4800",
    49: "4900",
    50: "5000",
    51: "5100",
    52: "5200",
    53: "5300",
    54: "5400",
    55: "5500",
    56: "5600",
    57: "5700",
    58: "5800",
    59: "5900",
    60: "6000",
    61: "6100",
    62: "6200",
    63: "6300",
    64: "6400",
    65: "6500",
    66: "6600",
    67: "6700",
    68: "6800",
    69: "6900",
    70: "7000",
    71: "7100",
    72: "7200",
    73: "7300",
    74: "7400",
    75: "7500",
    76: "7600",
    77: "7700",
    78: "7800",
    79: "7900",
    80: "8000",
    81: "8100",
    82: "8200",
    83: "8300",
    84: "8400",
    85: "8500",
    86: "8600",
    87: "8700",
    88: "8800",
    89: "8900",
    90: "9000",
    91: "9100",
    92: "9200",
    93: "9300",
    94: "9400",
    95: "9500",
    96: "9600",
    97: "9700",
    98: "9800",
    99: "9900",
    100: "10000",
    101: "10100",
    102: "10200",
    103: "10300",
    104: "10400",
    105: "10500",
    106: "10600",
    107: "10700",
    108: "10800",
    109: "10900",
    110: "11000",
    111: "11100",
    112: "11200",
    113: "11300",
    114: "11400",
    115: "11500",
    116: "11600",
    117: "11700",
    118: "11800",
    119: "11900",
    120: "12000",
    121: "12100",
    122: "12200",
    123: "12300",
    124: "12400",
    125: "12500",
    126: "12600",
    127: "12700",
    128: "12800",
    129: "12900",
    130: "13000",
    131: "13100",
    132: "13200",
    133: "13300",
    134: "13400",
    135: "13500",
    136: "13600",
    137: "13700",
    138: "13800",
    139: "13900",
    140: "14000",
    141: "14100",
    142: "14200",
    143: "14300",
    144: "14400",
    145: "14500",
    146: "14600",
    147: "14700",
    148: "14800",
    149: "14900",
    150: "15000"
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

var calcDiffRate = function(correct, incorrect, outta_time, avg_time, total) {
  let questionsCorrectDecimal = parseFloat((incorrect / total).toFixed(2)),
      outtaTimeRatio = parseFloat((outta_time * 0.2).toFixed(2)),
      averageTimeRatio = parseFloat((avg_time * 0.15).toFixed(2))
  if (correct !== 0) return questionsCorrectDecimal + outtaTimeRatio + averageTimeRatio
  else return 1.00 - outtaTimeRatio - averageTimeRatio
}