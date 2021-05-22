import getTime from '../utility/getTime'

const signUpObjTemplate = (email, user_name) => {
  return {
    "info": {
      "avatar": "https://firebasestorage.googleapis.com/v0/b/smartapp-b3d27.appspot.com/o/avatars%2Fdefault_avatar.png?alt=media&token=49efd887-faca-4f07-89fc-0d92df9f2f87",
      "bio": "null",
      "country": "null",
      "email": `${ email }`,
      "first_name": "null",
      "gender": "null",
      "gender_pronouns": "null",
      "dob": {
        "day": 0,
        "month": "null",
        "year": 0
      },
      "join_date": {
        "day": getTime('day'),
        "month": getTime('month'),
        "year": getTime('year')
      },
      "last_login": {
        "time": getTime('now'),
        "day": getTime('day'),
        "month": getTime('month'),
        "year": getTime('year')
      },
      "last_name": "null",
      "user_name": `${ user_name }`
    },
    "questions": {
      "totals": {
        "all": {
          "answered": 0,
          "averages": {
            "avgTime": 0,
            "correct": 0,
            "incorrect": 0,
            "outta_time": 0,
            "rank": 0,
            "rating": 0
          },
          "comments": {
            "total": 0
          },
          "correct": 0,
          "incorrect": 0,
          "one_sec": 0,
          "outta_time": 0,
          "rank": "NR",
          "rating": 0,
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
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Medium": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Hard": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          }
        },
        "category": {
          "Anime": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Art": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Books": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Celebrities": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Computers": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Film": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "General": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Geography": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "History": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Mathematics": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Music": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Mythology": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Nature": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Politics": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Science": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Sports": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Television": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Theatre": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Vehicles": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          },
          "Video Games": {
            "answered": 0,
            "averages": {
              "avgTime": 0,
              "correct": 0,
              "incorrect": 0,
              "outta_time": 0,
              "rank": 0,
              "rating": 0
            },
            "correct": 0,
            "incorrect": 0,
            "one_sec": 0,
            "outta_time": 0,
            "rank": "NR",
            "rating": 0
          }
        }
      }
    },
    "experience": {
      "avg": 0,
      "level": 1,
      "total": 0
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
          "showComments": true,
          "showCountry": true,
          "showGender": true,
          "showGenderPronouns": true,
          "showRealName": true,
          "showStats": true,
          "showVotes": true
        }
      }
    }
  }
}

export default signUpObjTemplate