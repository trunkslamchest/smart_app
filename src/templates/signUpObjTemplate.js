import getTime from '../utility/getTime'

const signUpObjTemplate = (email, user_name) => {
  let obj = {
    info: {
      dob: {
        day: 'null',
        month: 'null',
        year: 'null'
      },
      email: email,
      first_name: 'null',
      gender: 'null',
      last_name: 'null',
      user_name: user_name,
      join_date: {
        day: getTime('day'),
        month: getTime('month'),
        year: getTime('year')
      }
    },
    questions: {
      "totals": {
        "all": {
          "answered": 0,
          "correct": 0,
          "incorrect": 0,
          "avg_time": (0.00).toFixed(2),
          "outta_times": 0
        },
        "difficulty": {
          "Easy": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Medium": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Hard": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          }
        },
        "categories": {
          "Anime": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Art": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Books": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Celebrities": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Computers": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Film": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "General": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Geography": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "History": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Math": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Music": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Mythology": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Nature": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Politics": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Science": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Sports": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Television": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Theatre": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Vehicles": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "Video Games": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          }
        }
      },
      "Easy": {
        "categories": {
          "Anime": {
            "null": {
              "null": "null"
            }
          },
          "Art": {
            "null": {
              "null": "null"
            }
          },
          "Books": {
            "null": {
              "null": "null"
            }
          },
          "Celebrities": {
            "null": {
              "null": "null"
            }
          },
          "Computers": {
            "null": {
              "null": "null"
            }
          },
          "Film": {
            "null": {
              "null": "null"
            }
          },
          "General": {
            "null": {
              "null": "null"
            }
          },
          "Geography": {
            "null": {
              "null": "null"
            }
          },
          "History": {
            "null": {
              "null": "null"
            }
          },
          "Math": {
            "null": {
              "null": "null"
            }
          },
          "Music": {
            "null": {
              "null": "null"
            }
          },
          "Mythology": {
            "null": {
              "null": "null"
            }
          },
          "Nature": {
            "null": {
              "null": "null"
            }
          },
          "Politics": {
            "null": {
              "null": "null"
            }
          },
          "Science": {
            "null": {
              "null": "null"
            }
          },
          "Sports": {
            "null": {
              "null": "null"
            }
          },
          "Television": {
            "null": {
              "null": "null"
            }
          },
          "Theatre": {
            "null": {
              "null": "null"
            }
          },
          "Vehicles": {
            "null": {
              "null": "null"
            }
          },
          "Video Games": {
            "null": {
              "null": "null"
            }
          }
        }
      },
      "Medium": {
        "categories": {
          "Anime": {
            "null": {
              "null": "null"
            }
          },
          "Art": {
            "null": {
              "null": "null"
            }
          },
          "Books": {
            "null": {
              "null": "null"
            }
          },
          "Celebrities": {
            "null": {
              "null": "null"
            }
          },
          "Computers": {
            "null": {
              "null": "null"
            }
          },
          "Film": {
            "null": {
              "null": "null"
            }
          },
          "General": {
            "null": {
              "null": "null"
            }
          },
          "Geography": {
            "null": {
              "null": "null"
            }
          },
          "History": {
            "null": {
              "null": "null"
            }
          },
          "Math": {
            "null": {
              "null": "null"
            }
          },
          "Music": {
            "null": {
              "null": "null"
            }
          },
          "Mythology": {
            "null": {
              "null": "null"
            }
          },
          "Nature": {
            "null": {
              "null": "null"
            }
          },
          "Politics": {
            "null": {
              "null": "null"
            }
          },
          "Science": {
            "null": {
              "null": "null"
            }
          },
          "Sports": {
            "null": {
              "null": "null"
            }
          },
          "Television": {
            "null": {
              "null": "null"
            }
          },
          "Theatre": {
            "null": {
              "null": "null"
            }
          },
          "Vehicles": {
            "null": {
              "null": "null"
            }
          },
          "Video Games": {
            "null": {
              "null": "null"
            }
          }
        }
      },
      "Hard": {
        "categories": {
          "Anime": {
            "null": {
              "null": "null"
            }
          },
          "Art": {
            "null": {
              "null": "null"
            }
          },
          "Books": {
            "null": {
              "null": "null"
            }
          },
          "Celebrities": {
            "null": {
              "null": "null"
            }
          },
          "Computers": {
            "null": {
              "null": "null"
            }
          },
          "Film": {
            "null": {
              "null": "null"
            }
          },
          "General": {
            "null": {
              "null": "null"
            }
          },
          "Geography": {
            "null": {
              "null": "null"
            }
          },
          "History": {
            "null": {
              "null": "null"
            }
          },
          "Math": {
            "null": {
              "null": "null"
            }
          },
          "Music": {
            "null": {
              "null": "null"
            }
          },
          "Mythology": {
            "null": {
              "null": "null"
            }
          },
          "Nature": {
            "null": {
              "null": "null"
            }
          },
          "Politics": {
            "null": {
              "null": "null"
            }
          },
          "Science": {
            "null": {
              "null": "null"
            }
          },
          "Sports": {
            "null": {
              "null": "null"
            }
          },
          "Television": {
            "null": {
              "null": "null"
            }
          },
          "Theatre": {
            "null": {
              "null": "null"
            }
          },
          "Vehicles": {
            "null": {
              "null": "null"
            }
          },
          "Video Games": {
            "null": {
              "null": "null"
            }
          }
        }
      }
    }
  }

  return obj
}

export default signUpObjTemplate

// singleAnswerTemplate = {
//   questionId: {
//     answer: "null",
//     comment: "null",
//     correct_answer: "null",
//     question: "null",
//     time: 0,
//     vote: "null"
//   }
// }

// userObj[id] = {
//   info: {
//     dob: {
//       day: '',
//       month: '',
//       year: ''
//     },
//     email: signUpObj.email,
//     first_name: '',
//     gender: '',
//     last_name: '',
//     user_name: signUpObj.displayName,
//     join_date: {
//       day: getTime('day'),
//       month: getTime('month'),
//       year: getTime('year')
//     }
//   },
//   questions: {
//     "easy": {
//       "anime": {
//         "null": "null"
//       },
//       "art": {
//         "null": "null"
//       },
//       "books": {
//         "null": "null"
//       },
//       "celebrities": {
//         "null": "null"
//       },
//       "computers": {
//         "null": "null"
//       },
//       "film": {
//         "null": "null"
//       },
//       "general": {
//         "null": "null"
//       },
//       "geography": {
//         "null": "null"
//       },
//       "history": {
//         "null": "null"
//       },
//       "math": {
//         "null": "null"
//       },
//       "music": {
//         "null": "null"
//       },
//       "mythology": {
//         "null": "null"
//       },
//       "nature": {
//         "null": "null"
//       },
//       "politics": {
//         "null": "null"
//       },
//       "science": {
//         "null": "null"
//       },
//       "sports": {
//         "null": "null"
//       },
//       "television": {
//         "null": "null"
//       },
//       "theatre": {
//         "null": "null"
//       },
//       "vehicles": {
//         "null": "null"
//       },
//       "video_games": {
//         "null": "null"
//       }
//     },
//     "medium": {
//       "anime": {
//         "null": "null"
//       },
//       "art": {
//         "null": "null"
//       },
//       "books": {
//         "null": "null"
//       },
//       "celebrities": {
//         "null": "null"
//       },
//       "computers": {
//         "null": "null"
//       },
//       "film": {
//         "null": "null"
//       },
//       "general": {
//         "null": "null"
//       },
//       "geography": {
//         "null": "null"
//       },
//       "history": {
//         "null": "null"
//       },
//       "math": {
//         "null": "null"
//       },
//       "music": {
//         "null": "null"
//       },
//       "mythology": {
//         "null": "null"
//       },
//       "nature": {
//         "null": "null"
//       },
//       "politics": {
//         "null": "null"
//       },
//       "science": {
//         "null": "null"
//       },
//       "sports": {
//         "null": "null"
//       },
//       "television": {
//         "null": "null"
//       },
//       "theatre": {
//         "null": "null"
//       },
//       "vehicles": {
//         "null": "null"
//       },
//       "video_games": {
//         "null": "null"
//       }
//     },
//     "hard": {
//       "anime": {
//         "null": "null"
//       },
//       "art": {
//         "null": "null"
//       },
//       "books": {
//         "null": "null"
//       },
//       "celebrities": {
//         "null": "null"
//       },
//       "computers": {
//         "null": "null"
//       },
//       "film": {
//         "null": "null"
//       },
//       "general": {
//         "null": "null"
//       },
//       "geography": {
//         "null": "null"
//       },
//       "history": {
//         "null": "null"
//       },
//       "math": {
//         "null": "null"
//       },
//       "music": {
//         "null": "null"
//       },
//       "mythology": {
//         "null": "null"
//       },
//       "nature": {
//         "null": "null"
//       },
//       "politics": {
//         "null": "null"
//       },
//       "science": {
//         "null": "null"
//       },
//       "sports": {
//         "null": "null"
//       },
//       "television": {
//         "null": "null"
//       },
//       "theatre": {
//         "null": "null"
//       },
//       "vehicles": {
//         "null": "null"
//       },
//       "video_games": {
//         "null": "null"
//       }
//     }
//   }
// }