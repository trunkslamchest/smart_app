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
          "incorrect": 0
        },
        "difficulty": {
          "easy": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "medium": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "hard": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          }
        },
        "categories": {
          "anime": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "art": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "books": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "celebrities": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "computers": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "film": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "general": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "geography": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "history": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "math": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "music": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "mythology": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "nature": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "politics": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "science": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "sports": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "television": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "theatre": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "vehicles": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          },
          "video_games": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0
          }
        }
      },
      "easy": {
        "categories": {
          "anime": {
            "null": {
              "null": "null"
            }
          },
          "art": {
            "null": {
              "null": "null"
            }
          },
          "books": {
            "null": {
              "null": "null"
            }
          },
          "celebrities": {
            "null": {
              "null": "null"
            }
          },
          "computers": {
            "null": {
              "null": "null"
            }
          },
          "film": {
            "null": {
              "null": "null"
            }
          },
          "general": {
            "null": {
              "null": "null"
            }
          },
          "geography": {
            "null": {
              "null": "null"
            }
          },
          "history": {
            "null": {
              "null": "null"
            }
          },
          "math": {
            "null": {
              "null": "null"
            }
          },
          "music": {
            "null": {
              "null": "null"
            }
          },
          "mythology": {
            "null": {
              "null": "null"
            }
          },
          "nature": {
            "null": {
              "null": "null"
            }
          },
          "politics": {
            "null": {
              "null": "null"
            }
          },
          "science": {
            "null": {
              "null": "null"
            }
          },
          "sports": {
            "null": {
              "null": "null"
            }
          },
          "television": {
            "null": {
              "null": "null"
            }
          },
          "theatre": {
            "null": {
              "null": "null"
            }
          },
          "vehicles": {
            "null": {
              "null": "null"
            }
          },
          "video_games": {
            "null": {
              "null": "null"
            }
          }
        }
      },
      "medium": {
        "categories": {
          "anime": {
            "null": {
              "null": "null"
            }
          },
          "art": {
            "null": {
              "null": "null"
            }
          },
          "books": {
            "null": {
              "null": "null"
            }
          },
          "celebrities": {
            "null": {
              "null": "null"
            }
          },
          "computers": {
            "null": {
              "null": "null"
            }
          },
          "film": {
            "null": {
              "null": "null"
            }
          },
          "general": {
            "null": {
              "null": "null"
            }
          },
          "geography": {
            "null": {
              "null": "null"
            }
          },
          "history": {
            "null": {
              "null": "null"
            }
          },
          "math": {
            "null": {
              "null": "null"
            }
          },
          "music": {
            "null": {
              "null": "null"
            }
          },
          "mythology": {
            "null": {
              "null": "null"
            }
          },
          "nature": {
            "null": {
              "null": "null"
            }
          },
          "politics": {
            "null": {
              "null": "null"
            }
          },
          "science": {
            "null": {
              "null": "null"
            }
          },
          "sports": {
            "null": {
              "null": "null"
            }
          },
          "television": {
            "null": {
              "null": "null"
            }
          },
          "theatre": {
            "null": {
              "null": "null"
            }
          },
          "vehicles": {
            "null": {
              "null": "null"
            }
          },
          "video_games": {
            "null": {
              "null": "null"
            }
          }
        }
      },
      "hard": {
        "categories": {
          "anime": {
            "null": {
              "null": "null"
            }
          },
          "art": {
            "null": {
              "null": "null"
            }
          },
          "books": {
            "null": {
              "null": "null"
            }
          },
          "celebrities": {
            "null": {
              "null": "null"
            }
          },
          "computers": {
            "null": {
              "null": "null"
            }
          },
          "film": {
            "null": {
              "null": "null"
            }
          },
          "general": {
            "null": {
              "null": "null"
            }
          },
          "geography": {
            "null": {
              "null": "null"
            }
          },
          "history": {
            "null": {
              "null": "null"
            }
          },
          "math": {
            "null": {
              "null": "null"
            }
          },
          "music": {
            "null": {
              "null": "null"
            }
          },
          "mythology": {
            "null": {
              "null": "null"
            }
          },
          "nature": {
            "null": {
              "null": "null"
            }
          },
          "politics": {
            "null": {
              "null": "null"
            }
          },
          "science": {
            "null": {
              "null": "null"
            }
          },
          "sports": {
            "null": {
              "null": "null"
            }
          },
          "television": {
            "null": {
              "null": "null"
            }
          },
          "theatre": {
            "null": {
              "null": "null"
            }
          },
          "vehicles": {
            "null": {
              "null": "null"
            }
          },
          "video_games": {
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