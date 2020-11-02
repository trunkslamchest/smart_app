const env = require('dotenv').config()
const functions = require('firebase-functions')
const firebase = require("firebase")
const admin = require('firebase-admin')

const url = {
  database: env.parsed.DEPLOY_DB_ROOT,
  databaseAchievements: env.parsed.DEPLOY_DB_ACHIEVEMENTS,
  databaseQuestions: env.parsed.DEPLOY_DB_QUESTIONS,
  databaseUsers: env.parsed.DEPLOY_DB_USERS,
  rootSecured: env.parsed.LOCAL_SECURED,
  rootUnsecured: env.parsed.LOCAL_UNSECURED,
  // rootSecured: env.parsed.DEPLOY_SECURED,
  // rootUnsecured: env.parsed.DEPLOY_UNSECURED

  // crossRoute: 'https://us-east1-smartapp-b3d27.cloudfunctions.net',
  crossRoute: env.parsed.FIREBASE_CROSS_ROUTE,

  // crossUpdateUserQuestion: 'http://localhost:5001/smartapp-b3d27/us-east1/crossUpdateUserQuestion',
  // crossUpdateUserVote: 'http://localhost:5001/smartapp-b3d27/us-east1/crossUpdateUserVote',
  // crossUpdateUserComment: 'http://localhost:5001/smartapp-b3d27/us-east1/crossUpdateUserComment',
  // crossDeleteUserComment: 'http://localhost:5002/smartapp-b3d27/us-east1/deleteUserComment',
  // crossEditUserComment: 'http://localhost:5002/smartapp-b3d27/us-east1/editUserComment'

  crossUpdateUserQuestion: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_USER_QUESTION,
  crossUpdateUserVote: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_USER_VOTE,
  crossUpdateUserComment: env.parsed.FIREBASE_LOCAL_CROSS_UPDATE_USER_COMMENT,
  crossDeleteUserComment: env.parsed.FIREBASE_LOCAL_CROSS_DELETE_USER_COMMENT,
  crossEditUserComment: env.parsed.FIREBASE_LOCAL_CROSS_EDIT_USER_COMMENT

  // crossUpdateUserQuestion: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/crossUpdateUserQuestion',
  // crossUpdateUserVote: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/crossUpdateUserVote',
  // crossUpdateUserComment: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/crossUpdateUserComment',
  // crossDeleteUserComment: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/deleteUserComment',
  // crossEditUserComment: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/editUserComment'

  // crossUpdateUserQuestion: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_USER_QUESTION,
  // crossUpdateUserVote: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_USER_VOTE,
  // crossUpdateUserComment: env.parsed.FIREBASE_DEPLOY_CROSS_UPDATE_USER_COMMENT,
  // crossDeleteUserComment: env.parsed.FIREBASE_DEPLOY_CROSS_DELETE_USER_COMMENT,
  // crossEditUserComment: env.parsed.FIREBASE_DEPLOY_CROSS_EDIT_USER_COMMENT
}

var firebaseConfig = {
  // databaseURL: url.databaseAchievements,
  // databaseURL: url.databaseQuestions,
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

// ~~~~~~~~~~~~~~~~~~~~ ACHIEVEMENTS ~~~~~~~~~~~~~~~~~~~~

exports.getAchievements = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/').once('value', function(achievements){ res.json(achievements).status(200) });
    // res.json({ message: 'done' }).status(200);
});

exports.getAchievementsFromResults = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/').once('value', function(snap){
      let achievements = snap.val().achievements, totals = snap.val().totals, resObj = {}

      for(achievement in achievements){
        resObj[achievement] = {
          limit: achievements[achievement].limit,
          total: achievements[achievement].total,
        }
        if(achievements[achievement].time_limit) resObj[achievement].time_limit = achievements[achievement].time_limit
      }

      resObj.totals = totals

      res.json(resObj).status(200)
    });
    // res.json({ message: 'done' }).status(200);
});

exports.crossUpdateAchievements = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    var achievementsObj = {}, achievementObj = {}, totalsObj = {}
    firebase.database().ref('/').once('value', function(snap){

      let achievements = snap.val().achievements

      for(let achievement in achievements){
        achievementObj[achievement] = {
          ...achievements[achievement],
          total: req.body[achievement].total
        }
      }

      achievementsObj['/achievements'] = achievementObj

      totalsObj['/totals'] = {
        ...snap.val().totals,
        all_unlocked: req.body.totals.all_unlocked
      }

      firebase.database().ref().update(achievementsObj);
      firebase.database().ref().update(totalsObj);
    });

    res.end()
    // res.json({ message: 'done' }).status(200);
});

// ~~~~~~~~~~~~~~~~~~~~ USERS ~~~~~~~~~~~~~~~~~~~~

exports.users = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);
    firebase.database().ref('/').once('value', function(users){
      res.json(users).status(200);
    });
});

function genRand(min, max, decimalPlaces) {
    var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min)
    var power = Math.pow(10, decimalPlaces)
    return Math.floor(rand*power) / power
}

function calcRating(stat) {
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

exports.createFakeUsers = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)

    var users = {}

    const countries = [
      'Afghanistan',
      'Aland Islands',
      'Albania',
      'Algeria',
      'American Samoa',
      'Andorra',
      'Angola',
      'Anguilla',
      'Antiqua And Barbuda',
      'Argentina',
      'Armenia',
      'Aruba',
      'Australia',
      'Austria',
      'Azerbaijan',
      'Bahamas',
      'Bahrain',
      'Bangladesh',
      'Barbados',
      'Belarus',
      'Belgium',
      'Belize',
      'Benin',
      'Bermuda',
      'Bhutan',
      'Bolivia',
      'Bosnia And Herzegovina',
      'Botswana',
      'Bouvet Island',
      'Brazil',
      'British Indian Ocean Territory',
      'British Virgin Islands',
      'Brunei Darussalam',
      'Bulgaria',
      'Burkina Faso',
      'Burundi',
      'Cabo Verde',
      'Cambodia',
      'Cameroon',
      'Canada',
      'Catalonia',
      'Cayman Islands',
      'Central African Republic',
      'Chad',
      'Chile',
      'China',
      'Christmas Island',
      'Cocos Islands',
      'Colombia',
      'Comoros',
      'Congo',
      'Cook Islands',
      'Costa Rica',
      "Côte d'Ivoire",
      'Croatia',
      'Cuba',
      'Cyprus',
      'Czech Republic',
      'Democratic Republic Of The Congo',
      'Denmark',
      'Djibouti',
      'Dominica',
      'Dominican Republic',
      'Ecuador',
      'Egypt',
      'El Salvador',
      'England',
      'Equatorial Guinea',
      'Eritrea',
      'Estonia',
      'Eswatini',
      'Ethiopia',
      'European Union',
      'Falkland Islands',
      'Faroe Islands',
      'Fiji',
      'Finland',
      'France',
      'French Guiana',
      'French Polynesia',
      'French Southern Territories',
      'Gabon',
      'Gambia',
      'Georgia',
      'Germany',
      'Ghana',
      'Gibraltar',
      'Greece',
      'Greenland',
      'Grenada',
      'Guadeloupe',
      'Guam',
      'Guatemala',
      'Guinea',
      'Guinea Bissau',
      'Guyana',
      'Haiti',
      'Heard And McDonald Islands',
      'Holy See',
      'Honduras',
      'HongKong',
      'Hungary',
      'Iceland',
      'India',
      'Indonesia',
      'Iran',
      'Iraq',
      'Ireland',
      'Israel',
      'Italy',
      'Jamaica',
      'Japan',
      'Jordan',
      'Kazakhstan',
      'Kenya',
      'Kiribati',
      'Kuwait',
      'Kyrgystan',
      'Laos',
      'Latvia',
      'Lebanon',
      'Lesotho',
      'Liberia',
      'Libya',
      'Liechtenstien',
      'Lithuania',
      'Luxembourg',
      'Macao',
      'Madagascar',
      'Malawi',
      'Malaysia',
      'Maldives',
      'Mali',
      'Malta',
      'Marshall Islands',
      'Martinique',
      'Mauritania',
      'Mauritius',
      'Mayotte',
      'Mexico',
      'Micronesia',
      'Moldova',
      'Monaco',
      'Mongolia',
      'Montenegro',
      'Montserrat',
      'Morocco',
      'Mozambique',
      'Myanmar',
      'Nambia',
      'Nauru',
      'Nepal',
      'Netherlands',
      'Netherlands Antilles',
      'New Caledonia',
      'New Zealand',
      'Nicaraqua',
      'Niger',
      'Nigeria',
      'Niue',
      'Norfolk Islands',
      'Northern Mariana Islands',
      'North Korea',
      'North Macedonia',
      'Norway',
      'Oman',
      'Pakistan',
      'Palau',
      'Palestine',
      'Panama',
      'Papua New Guinea',
      'Paraguay',
      'Peru',
      'Philippines',
      'Pitcairn',
      'Poland',
      'Portugal',
      'Puerto Rico',
      'Qatar',
      'Reunion',
      'Romania',
      'Russia',
      'Rwanda',
      'Saint Helena',
      'Saint Kitts And Nevis',
      'Saint Lucia',
      'Saint Pierre And Miquelon',
      'Saint Vincent And The Grenadines',
      'Samoa',
      'San Marino',
      'Sao Tome And Principe',
      'Saudi Arabia',
      'Scotland',
      'Senegal',
      'Serbia',
      'Serbia And Montenegro',
      'Seychelles',
      'Sierra Leone',
      'Singapore',
      'Slovakia',
      'Slovenia',
      'Soloman Islands',
      'Somalia',
      'South Africa',
      'South Georgia',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'Sudan',
      'Suriname',
      'Svalbard And Jan Mayen',
      'Sweden',
      'Switzerland',
      'Syria',
      'Taiwan',
      'Tajikistan',
      'Tanzania',
      'Thailand',
      'Timor Leste',
      'Togo',
      'Tokelau',
      'Tonga',
      'Trinidad And Tobago',
      'Tunisia',
      'Turkey',
      'Turkmenistan',
      'Turks And Caicos Islands',
      'Tuvalu',
      'Uganda',
      'Ukraine',
      'United Arab Emirates',
      'United Kingdom',
      'United States Of America',
      'Uruguay',
      'US Virgin Islands',
      'Uzbekistan',
      'Vanuatu',
      'Venezuela',
      'Vietnam',
      'Wales',
      'Wallis And Futuna',
      'Western Sahara',
      'Yemen',
      'Zambia',
      'Zimbabwe'
    ]

    for(i = 0; i < 50; i++){
      var createKey = firebase.database().ref().push().key
      var randomUserNumber = Math.floor(Math.random() * Math.floor(10000))

      users[createKey] = {
        "info": {
          "avatar": "https://firebasestorage.googleapis.com/v0/b/smartapp-b3d27.appspot.com/o/avatars%2Fdefault_avatar.png?alt=media&token=49efd887-faca-4f07-89fc-0d92df9f2f87",
          "bio": "null",
          "country": countries[Math.floor(Math.random() * countries.length)],
          "email": `userTemp${randomUserNumber}@gmail.com`,
          "first_name": "null",
          "gender": "null",
          "gender_pronouns": "null",
          "dob": {
            "day": 0,
            "month": "null",
            "year": 0
          },
          "join_date": {
            "day": 23,
            "month": "March",
            "year": 2018
          },
          "last_login": {
            "time": "08:24:32 AM",
            "day": 23,
            "month": "January",
            "year": 2020
          },
          "last_name": "null",
          "user_name": `userTemp${randomUserNumber}`
        },
        "questions": {
          "totals": {
            "all": {
              "answered": Math.floor(Math.random() * Math.floor(100)),
              "avg_time": genRand(1, 10, 2),
              "comments": {
                "total": 0
              },
              "correct": Math.floor(Math.random() * Math.floor(45)),
              "incorrect": Math.floor(Math.random() * Math.floor(45)),
              "outta_times": Math.floor(Math.random() * Math.floor(10)),
              "rank": calcRating(genRand(0.25, 1, 2)),
              "rating":  genRand(0.25, 1, 2),
              "votes": {
                "total": 0,
                "good": 0,
                "neutral": 0,
                "bad": 0
              }
            },
            "difficulty": {
              "Easy": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Medium": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Hard": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              }
            },
            "categories": {
              "Anime": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Art": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Books": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Celebrities": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Computers": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Film": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "General": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Geography": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "History": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Mathematics": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Music": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Mythology": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Nature": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Politics": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Science": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Sports": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Television": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Theatre": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Vehicles": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              },
              "Video Games": {
                "answered": Math.floor(Math.random() * Math.floor(10)),
                "avg_time": genRand(1, 10, 2),
                "correct": Math.floor(Math.random() * Math.floor(4)),
                "incorrect": Math.floor(Math.random() * Math.floor(4)),
                "outta_times": Math.floor(Math.random() * Math.floor(10)),
                "rank": calcRating(genRand(0.25, 1, 2)),
                "rating": genRand(0.25, 1, 2)
              }
            }
          }
        },
        "experience": {
          "avg": 0,
          "level": genRand(1, 20, 0),
          "total": genRand(10, 1000, 0)
        },
        "achievements": {
          "total": 0,
          "unlocked": [ "null" ]
        },
        "settings": {
          "privacy": {
            "profile": {
              "private": false,
              "showAchievements": true,
              "showAvatar": true,
              "showAge": true,
              "showBio": true,
              "showCountry": true,
              "showEmail": true,
              "showExperience": true,
              "showGender": true,
              "showGenderPronouns": true,
              "showRealName": true,
              "showStats": true
            }
          }
        }
      }

    }

    // console.log(users)
    res.json(users)
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

exports.getUserProfile = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res);
    let userObj = {}
    firebase.database().ref('/').once('value', function(snap){
      if(!!req.body.user_name){
        let users = snap.val()
        for(let user in users){
          if(users[user].info.user_name === req.body.user_name) {
            userObj = {
              achievements: users[user].achievements,
              experience: users[user].experience,
              info: users[user].info,
              questions: users[user].questions.totals,
              settings: users[user].settings
            }
            break
          }
        }

        if(!!userObj.settings.privacy.profile.private) userObj = `${req.body.user_name} has set their public profile to private`
        else {
          if(!userObj.settings.privacy.profile.showAchievements) delete userObj.achievements
          if(!userObj.settings.privacy.profile.showAge) delete userObj.info.dob
          if(!userObj.settings.privacy.profile.showAvatar) delete userObj.info.avatar
          if(!userObj.settings.privacy.profile.showBio) delete userObj.info.bio
          if(!userObj.settings.privacy.profile.showCountry) delete userObj.info.country
          if(!userObj.settings.privacy.profile.showEmail) delete userObj.info.email
          if(!userObj.settings.privacy.profile.showExperience) delete userObj.experience
          if(!userObj.settings.privacy.profile.showGender) delete userObj.info.gender
          if(!userObj.settings.privacy.profile.showGenderPronouns) delete userObj.info.gender_pronouns
          if(!userObj.settings.privacy.profile.showRealName) {
            delete userObj.info.first_name
            delete userObj.info.last_name
          }
          if(!userObj.settings.privacy.profile.showStats) delete userObj.questions
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
      updatedInfo['/' + req.body.uid + '/' + 'info'] = req.body.info;
      firebase.database().ref().update(updatedInfo);
    }
    res.json(updatedInfo).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.updateUserSettings = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedInfo = {};
    if(!!req.body.uid) {
      updatedInfo['/' + req.body.uid + '/' + 'settings'] = req.body.settings;
      firebase.database().ref().update(updatedInfo);
    }
    res.json(req.body.settings).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.uploadUserAvatar = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedAvatar = {};
    if(!!req.body.uid) {
      console.log(req.body)
      updatedAvatar['/' + req.body.uid + '/info/avatar'] = req.body.img;
      firebase.database().ref().update(updatedAvatar);
    }
    res.json(req.body).status(200);
    // res.json({ message: 'done' }).status(200);
});

exports.updateUserLoginTime = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpatch(req, res);
    var updatedTime = {};
    if(!!req.body.uid) {
      updatedTime['/' + req.body.uid + '/' + 'info/last_login'] = {
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
      user = `/${req.body.uid}`
      firebase.database().ref(user).remove()
    }
    res.json({msg: 'Your Profile has been removed.'}).status(200)
    // res.json({ message: 'done' }).status(200);
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
      // res.json({ message: 'done' }).status(200);
    });
});

exports.crossUpdateUserQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORScrossPatch(req, res);
    var idObj = {}, questionObj = {}, totalsObj = {}, diffTotalsObj = {}, catTotalsObj = {}, xpObj = {}, achievementsObj = {}
    firebase.database().ref('/' + req.body.uid).once('value', function(snap){

      var idPath = '/' + req.body.uid + '/questions/ids',
          diffPath = '/' + req.body.uid + '/questions/' + req.body.difficulty,
          totalsPath = '/' + req.body.uid + '/questions/totals'
          xpPath = '/' + req.body.uid + '/experience',
          achievementsPath = '/' + req.body.uid + '/achievements'

      if(!snap.val().questions.ids) idObj[idPath] = [ req.body.qid ]
      else idObj[idPath] = [ ...snap.val().questions.ids, req.body.qid ]

      if(req.body.achievements.total > 0) {
        if(snap.val().achievements.unlocked[0] === "null") {
          achievementsObj[achievementsPath] = { total: req.body.achievements.total, unlocked: req.body.achievements.unlocked }
          firebase.database().ref().update(achievementsObj)
        } else {
          achievementsObj[achievementsPath] = { total: req.body.achievements.total, unlocked: [ ...snap.val().achievements.unlocked, ...req.body.achievements.unlocked ] }
          firebase.database().ref().update(achievementsObj)
        }
      }

      questionObj[diffPath + '/categories/' + req.body.category + '/' + req.body.qid ] = {
        time: req.body.time,
        result: req.body.result,
        answer: req.body.answer,
        correct_answer: req.body.correct_answer,
        question: req.body.question,
        performance: req.body.performance.qPerf,
        experience: req.body.experience,
        achievements: req.body.achievements
      }

      xpObj[xpPath] = { level: parseInt(req.body.experience.level), total: req.body.experience.newTotal }
      totalsObj[totalsPath + '/all'] = { ...req.body.totals }
      diffTotalsObj[totalsPath + '/difficulty/' + req.body.difficulty] = { ...req.body.diffTotals }
      catTotalsObj[totalsPath + '/categories/' + req.body.category] = { ...req.body.catTotals }

      firebase.database().ref().update(idObj);
      firebase.database().ref().update(questionObj);
      firebase.database().ref().update(totalsObj);
      firebase.database().ref().update(diffTotalsObj);
      firebase.database().ref().update(catTotalsObj);
      firebase.database().ref().update(xpObj);
    })

    res.end()
    // res.json({ message: 'done' }).status(200);
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
    // res.json({ message: 'done' }).status(200);
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
    // res.json({ message: 'done' }).status(200);
});

exports.deleteUserComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
      if(!!req.body.question && !!req.body.comment.cid) {
        var commentTotalsObj = {}
        var commentPath = '/' + req.body.comment.uid + '/questions/' + req.body.question.difficulty + '/categories/' + req.body.question.category + '/' + req.body.question.qid + '/comments/' + req.body.comment.cid
        var commentTotalsPath = '/' + req.body.comment.uid + '/questions/totals/all/comments/'

        firebase.database().ref(commentPath).remove()
        firebase.database().ref(commentTotalsPath).once('value', function(snap){
            commentTotalsObj[commentTotalsPath] = { ...snap.val() }
            commentTotalsObj[commentTotalsPath].total = commentTotalsObj[commentTotalsPath].total - 1
            firebase.database().ref().update(commentTotalsObj);
        })
      }
      res.json(req.body).status(200)
    // res.json({ message: 'done' }).status(200);
});

exports.editUserComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    if(!!req.body.question && !!req.body.comment){
      var commentPath = '/' + req.body.comment.uid + '/questions/' + req.body.question.difficulty + '/categories/' + req.body.question.category + '/' + req.body.question.qid + '/comments/' + req.body.comment.cid
      var updateObj = { comment: req.body.comment.comment, timestamp: req.body.comment.timestamp }
      firebase.database().ref(commentPath).update(updateObj)
    }
    res.json(req.body).status(200)
    // res.json({ message: 'done' }).status(200);
});

exports.getOverallLeaderBoards = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res);
    var sortedUsers = [], leaderBoardsObj = { international: [], regional: {} }
    firebase.database().ref('/').orderByChild('/questions/totals/all/rating').once('value', function(){})
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

    firebase.database().ref('/').once('value', function(){})
    .then(resObj => {
      resObj.forEach(function(snap) {
        var uid = snap.key, userData = snap.val(), catTotals = userData.questions.totals.categories

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

// ~~~~~~~~~~~~~~~~~~~~ QUESTIONS ~~~~~~~~~~~~~~~~~~~~

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
    return diffRate
  } else return 1.00
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

var calcAchievements = function(allAchievements, userAchievements, questionResults, userTotals, userDiffTotals, userCatTotals) {
  let unlockedAchievements = [], resAchievementsObj = {}, crossAchievementsObj = {}

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
    crossAchievementsObj = { total: 0, unlocked: [ "null" ] }
  } else {
    unlockedAchievements.forEach(achievement => allAchievements[achievement].total += 1)
    resAchievementsObj = { total: unlockedAchievements.length, unlocked: unlockedAchievements }
    crossAchievementsObj = { total: userAchievements.total + unlockedAchievements.length, unlocked: unlockedAchievements }
    allAchievements.totals.all_unlocked += unlockedAchievements.length
  }

  achievementsObj = { res: resAchievementsObj, cross: crossAchievementsObj, all: allAchievements }
  return achievementsObj
}

exports.questions = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSget(req, res)
    firebase.database().ref('/').once('value', function(questions){ res.json(questions).status(200) });
    // res.json({ message: 'done' }).status(200);
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
          totalSum: 0, answersSum: 0, correctSum: 0, incorrectSum: 0, commentSum: 0, outtaTimeSum: 0, timeTotalSum: 0, perfSum: 0,
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
            total_perf: catTotals[catName].total_perf + statsObj.perfSum,
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
            total_perf: statsObj.perfSum,
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
      // res.json({ message: 'done' }).status(200);
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
      // res.json({ message: 'done' }).status(200);
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
      // res.json({ message: 'done' }).status(200);
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
      // res.json({ message: 'done' }).status(200);
    })
})

exports.staticQuestion = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    var resObj = {}
    firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
      if(!!req.body.qid) {
        resObj = {
          qid: req.body.qid,
          difficulty: req.body.difficulty,
          category: req.body.category,
          answers: snap.val().answers,
          question: snap.val().question,
          rating: snap.val().rating,
          diffRating: snap.val().rating.difficulty,
          correct: snap.val().correct,
          comments: snap.val().comments ? snap.val().comments : null,
          votes: snap.val().votes
        }
      }
    res.json(resObj).status(200)
    });
    // res.json({ message: 'done' }).status(200);
});

exports.questionResults = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSpost(req, res)
    fetch(url.getAchievementsFromResults)
    .then(res => res.json())
    .then(achievementsRes => {
      firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid).once('value', function(snap){
        let calcObj = {}, resObj = {}, crossObj = {}, questionObj = {}, totalsObj = {}, diffTotalsObj = {}, catTotalsObj = {}, perfObj = {}, ratingObj = {}, xpObj = {}, achievementsObj = {}
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
          let aPerf = question.rating.performance === 0 ? qPerf.rating : ((qPerf.rating + question.rating.performance) / 2.00)
          let newXP = calcXP + req.body.experience

          calcDiffRank = calcDiffRate(calcCorrect, calcIncorrect, calcOuttaTime, calcTotal)

          perfObj = { qPerf: qPerf, oPerf: oPerf }
          xpObj = { gain: calcXP, prevTotal: req.body.experience, newTotal: newXP, level: parseInt(calcXPlevel(newXP)) }
          ratingObj = { ...snap.val().rating, difficulty: calcDiffRank, performance: aPerf }
          calcObj = { total: calcTotal, correct: calcCorrect, incorrect: calcIncorrect, outta_time: calcOuttaTime, total_time: calcTotalTime, avg_time: calcAvgTime }


          totalsObj = {
            ...req.body.userTotals.all,
            answered: req.body.userTotals.all.answered + 1,
            avg_time: req.body.userTotals.all.avg_time === 0 ? req.body.time : parseFloat(((parseFloat(req.body.userTotals.all.avg_time) + req.body.time) / 2.00).toFixed(2)),
            correct: calcResult === 'Correct' ? req.body.userTotals.all.correct + 1 : req.body.userTotals.all.correct,
            incorrect: calcResult === 'Incorrect' ? req.body.userTotals.all.incorrect + 1 : req.body.userTotals.all.incorrect,
            outta_times: calcResult === 'Outta Time' ? req.body.userTotals.all.outta_times + 1 : req.body.userTotals.all.outta_times,
            rating: req.body.userTotals.all.rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(req.body.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)),
            rank: req.body.userTotals.all.rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(req.body.userTotals.all.rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
          }

          diffTotalsObj = {
            answered: req.body.userTotals.difficulty[req.body.difficulty].answered + 1,
            avg_time: req.body.userTotals.difficulty[req.body.difficulty].avg_time === 0 ? req.body.time : parseFloat(((parseFloat(req.body.userTotals.difficulty[req.body.difficulty].avg_time) + req.body.time) / 2.00).toFixed(2)),
            correct: calcResult === 'Correct' ? req.body.userTotals.difficulty[req.body.difficulty].correct + 1 : req.body.userTotals.difficulty[req.body.difficulty].correct,
            incorrect: calcResult === 'Incorrect' ? req.body.userTotals.difficulty[req.body.difficulty].incorrect + 1 : req.body.userTotals.difficulty[req.body.difficulty].incorrect,
            outta_times: calcResult === 'Outta Time' ? req.body.userTotals.difficulty[req.body.difficulty].outta_times + 1 : req.body.userTotals.difficulty[req.body.difficulty].outta_times,
            rating: req.body.userTotals.difficulty[req.body.difficulty].rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(req.body.userTotals.difficulty[req.body.difficulty].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)),
            rank: req.body.userTotals.difficulty[req.body.difficulty].rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(req.body.userTotals.difficulty[req.body.difficulty].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
          }

          catTotalsObj = {
            answered: req.body.userTotals.categories[req.body.category].answered + 1,
            avg_time: req.body.userTotals.categories[req.body.category].avg_time === 0 ? req.body.time : parseFloat(((parseFloat(req.body.userTotals.categories[req.body.category].avg_time) + req.body.time) / 2.00).toFixed(2)),
            correct: calcResult === 'Correct' ? req.body.userTotals.categories[req.body.category].correct + 1 : req.body.userTotals.categories[req.body.category].correct,
            incorrect: calcResult === 'Incorrect' ? req.body.userTotals.categories[req.body.category].incorrect + 1 : req.body.userTotals.categories[req.body.category].incorrect,
            outta_times: calcResult === 'Outta Time' ? req.body.userTotals.categories[req.body.category].outta_times + 1 : req.body.userTotals.categories[req.body.category].outta_times,
            rating: req.body.userTotals.categories[req.body.category].rating === 0 ? perfObj.qPerf.rating : parseFloat(((parseFloat(req.body.userTotals.categories[req.body.category].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)),
            rank: req.body.userTotals.categories[req.body.category].rank === 'NR' ? perfObj.qPerf.rank : calcRating(parseFloat(((parseFloat(req.body.userTotals.categories[req.body.category].rating) + perfObj.qPerf.rating) / 2.00).toFixed(2)))
          }

          questionObj = {
            time: req.body.time,
            result: calcResult,
            performance: perfObj,
            experience: xpObj
          }

          achievementsObj = calcAchievements(achievementsRes, req.body.achievements, questionObj, totalsObj, diffTotalsObj, catTotalsObj)

          resObj = {
            qid: req.body.qid,
            answerResult: calcResult,
            correct: question.correct,
            answers: calcObj,
            comments: question.comments,
            votes: question.votes,
            diffRating: calcDiffRank,
            perfRating: aPerf,
            performance: perfObj,
            experience: xpObj,
            achievements: { user: achievementsObj.res, all: achievementsObj.all }
          }

          crossObj = {
            uid: req.body.uid,
            qid: req.body.qid,
            difficulty: req.body.difficulty,
            category: req.body.category,
            time: req.body.time,
            result: calcResult,
            answer: req.body.answer,
            correct_answer: question.correct,
            question: question.question,
            performance: perfObj,
            experience: xpObj,
            totals: totalsObj,
            diffTotals: diffTotalsObj,
            catTotals: catTotalsObj,
            achievements: achievementsObj.cross
          }

          firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/answers').update(calcObj)
          firebase.database().ref('/' + req.body.difficulty + '/categories/' + req.body.category + '/' + req.body.qid + '/rating').update(ratingObj)

          fetch(url.crossUpdateUserQuestion, {
            method: "POST",
            mode: 'cors',
            headers: {
              "Accept": ['application/json', 'application/x-www-form-urlencoded'],
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(crossObj)
          })

          fetch(url.crossUpdateAchievements, {
            method: "POST",
            mode: 'cors',
            headers: {
              "Accept": ['application/json', 'application/x-www-form-urlencoded'],
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(achievementsObj.all)
          })
        }

        res.json(resObj).status(200)
      // res.json({ message: 'done' }).status(200);
      })
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
    // res.json({ message: 'done' }).status(200);
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
    // res.json({ message: 'done' }).status(200);
    })
})

exports.deleteQuestionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    if(!!req.body.question && !!req.body.comment){
      firebase.database().ref('/' + req.body.question.difficulty + '/categories/' + req.body.question.category + '/' + req.body.question.qid + '/comments/' + req.body.comment.cid).remove()
    }
    res.json(req.body).status(200)
    // res.json({ message: 'done' }).status(200);
});

exports.editQuestionComment = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSdelete(req, res);
    if(!!req.body.question && !!req.body.comment){
      var commentPath = '/' + req.body.question.difficulty + '/categories/' + req.body.question.category + '/' + req.body.question.qid + '/comments/' + req.body.comment.cid
      var updateObj = { comment: req.body.comment.comment, timestamp: req.body.comment.timestamp }
      firebase.database().ref(commentPath).update(updateObj)
    }

    res.json(req.body).status(200)
    // res.json({ message: 'done' }).status(200);
});