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
        "answered": 0,
        "correct": 0,
        "incorrect": 0
      },
      "easy": {
        "totals": {
          "answered": 0,
          "correct": 0,
          "incorrect": 0
        },
        "categories": {
          "anime": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "art": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "books": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "celebrities": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "computers": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "film": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "general": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "geography": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "history": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "math": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "music": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "mythology": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "nature": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "politics": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "science": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "sports": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "television": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "theatre": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "vehicles": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "video_games": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          }
        }
      },
      "medium": {
        "totals": {
          "answered": 0,
          "correct": 0,
          "incorrect": 0
        },
        "categories": {
          "anime": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "art": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "books": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "celebrities": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "computers": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "film": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "general": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "geography": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "history": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "math": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "music": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "mythology": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "nature": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "politics": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "science": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "sports": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "television": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "theatre": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "vehicles": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "video_games": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          }
        }
      },
      "hard": {
        "totals": {
          "answered": 0,
          "correct": 0,
          "incorrect": 0
        },
        "categories": {
          "anime": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "art": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "books": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "celebrities": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "computers": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "film": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "general": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "geography": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "history": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "math": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "music": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "mythology": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "nature": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "politics": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "science": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "sports": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "television": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "theatre": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "vehicles": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
              "null": "null"
            }
          },
          "video_games": {
            "totals": {
              "answered": 0,
              "correct": 0,
              "incorrect": 0
            },
            "questions": {
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