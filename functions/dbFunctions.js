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

var setCORSbasic = function(req, res){
  res.set('Access-Control-Allow-Methods', ['GET', 'OPTIONS']);
  if(req.headers.origin === url.secured || req.headers.origin === url.unsecured )
    res.set('Access-Control-Allow-Origin', `${req.headers.origin}`);
}

exports.createKeys = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)
    var keys = []

    for(i = 0; i < 100; i++){
      var createKey = firebase.database().ref().push().key
      keys.push(createKey)
    }

    console.log(keys)
    res.json(keys)
});

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
                "FiveStars": 0,
                "FourStars": 0,
                "ThreeStars": 0,
                "TwoStars": 0,
                "OneStars": 0,
                "ZeroStars": 0
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

exports.makeLevels = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)

    let resObj = {}

    for(let i = 1; i <= 150; i++)

    resObj[i] = (i * 100).toString()

    res.json(resObj).status(200);
    // res.json({ message: 'done' }).status(200);
});


const oldQuestionsTemp = {

}

exports.portOldQuestions = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)

    let resObj = {}

    for(let oldQ in oldQuestionsTemp) {
      let cat = oldQ
      let catQuestions = oldQuestionsTemp[oldQ]

      for(let catQ in catQuestions){
        let qid = catQ
        let qData = catQuestions[qid]
        resObj[qid] = {
          ...qData,
          "difficulty": "Hard",
          "category": cat,
          "answers": {
            ...qData.answers,
            "total_time": 0
          },
          "votes": {
            "total": 0,
            "FiveStars": 0,
            "FourStars": 0,
            "ThreeStars": 0,
            "TwoStars": 0,
            "OneStars": 0,
            "ZeroStars": 0
          },
          "rating": {
            "difficulty": parseInt((0.00).toFixed(2)),
            "approval": parseInt((0.00).toFixed(2)),
            "performance": parseInt((0.00).toFixed(2))
          }
        }
      }
    }

    res.json(resObj).status(200);
    // res.json({ message: 'done' }).status(200);
});

const newQuestionsTemp = [

]

exports.portNewQuestions = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)

    let resObj = {}

    for(let newQ in newQuestionsTemp) {

      var qid = firebase.database().ref().push().key
      let question = newQuestionsTemp[newQ]
      let questionObj = {}
      let catTemp = question.category
      let choicesTemp = [ ...question.incorrect_answers, question.correct_answer ]

      if(question.category === "Entertainment: Japanese Anime & Manga")
        catTemp = 'Anime'

      questionObj = {
        "type": question.type,
        "question": question.question,
        "correct": question.correct_answer,
        "choices": choicesTemp.sort(),
        "answers": {
          "total": 0,
          "correct": 0,
          "incorrect": 0,
          "outta_time": 0,
          "avg_time": 0,
          "total_time": 0
        },
        "votes": {
          "total": 0,
          "FiveStars": 0,
          "FourStars": 0,
          "ThreeStars": 0,
          "TwoStars": 0,
          "OneStars": 0,
          "ZeroStars": 0
        },
        "difficulty": (question.difficulty[0]).toUpperCase() + question.difficulty.slice(1, question.difficulty.length),
        "category": catTemp[0].toUpperCase() === catTemp[0] ? catTemp : catTemp[0].toUpperCase() + question.category.slice(1, question.category.length),
        "rating": {
          "difficulty": 0,
          "approval": 0,
          "performance": 0
        }
      }

      resObj[qid] = questionObj
    }

    res.json(resObj).status(200);
    // res.json({ message: 'done' }).status(200);
});

const countNewQuestionsTemp = {

}

exports.countNewQuestions = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)

    let resObj = {}

    for(let qid in countNewQuestionsTemp) {
      let q = countNewQuestionsTemp[qid]
      let cat = q.category
      let diff = q.difficulty
      resObj['total'] = ++resObj['total'] || 1
      if(!resObj['difficulty']) { resObj['difficulty'] = { [diff]: 1 }}
      else resObj['difficulty'][diff] = ++resObj['difficulty'][diff] || 1
      if(!resObj['category']) { resObj['category'] = { [cat]: 1 }}
      else resObj['category'][cat] = ++resObj['category'][cat] || 1
    }

    res.json(resObj).status(200);
    // res.json({ message: 'done' }).status(200);
});

const newQuestionsTemp = [

]

const newAchievementsTemp = {

}

const oldDBtemp = {
}

exports.updateDB = functions
  .region('us-east1')
  .https.onRequest((req, res) => {
    setCORSbasic(req, res)

    let rObj = {}
    let newQObj = {}
    let aObj = oldDBtemp.achievements
    let qObj = oldDBtemp.questions
    let uObj = oldDBtemp.users

    if(newQuestionsTemp.length){
      for(let newQ in newQuestionsTemp) {

        var qid = firebase.database().ref().push().key
        let question = newQuestionsTemp[newQ]
        let questionObj = {}
        let cat = question.category[0].toUpperCase() + question.category.slice(1, question.category.length)
        let diff = question.difficulty[0].toUpperCase() + question.difficulty.slice(1, question.difficulty.length)
        let choices = [ ...question.incorrect_answers, question.correct_answer ].sort()

        if(question.category === "Entertainment: Japanese Anime & Manga")
          cat = 'Anime'

        questionObj = {
          "type": question.type,
          "question": question.question,
          "correct": question.correct_answer,
          "choices": choices,
          "answers": {
            "total": 0,
            "correct": 0,
            "incorrect": 0,
            "outta_time": 0,
            "avg_time": 0,
            "total_time": 0
          },
          "votes": {
            "total": 0,
            "FiveStars": 0,
            "FourStars": 0,
            "ThreeStars": 0,
            "TwoStars": 0,
            "OneStars": 0,
            "ZeroStars": 0
          },
          "difficulty": diff,
          "category": cat,
          "rating": {
            "difficulty": 0,
            "approval": 0,
            "performance": 0
          }
        }

        qObj.totals.all.questions = ++qObj.totals.all.questions
        qObj.totals.difficulty[diff].questions = ++qObj.totals.difficulty[diff].questions
        qObj.totals.category[cat].questions = ++qObj.totals.category[cat].questions

        newQObj[qid] = questionObj
      }
    }

    aObj.list = { ...aObj.list, ...newAchievementsTemp }.sort()
    aObj.totals.all = aObj.totals.all + Object.entries(newAchievementsTemp).length

    qObj.list = { ...qObj.list, ...newQObj }

    rObj = {
      achievements: aObj,
      questions: qObj,
      users: uObj
    }

    res.json(rObj).status(200);
    // res.json({ message: 'done' }).status(200);
});

