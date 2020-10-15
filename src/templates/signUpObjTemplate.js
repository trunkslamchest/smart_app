import getTime from '../utility/getTime'

const signUpObjTemplate = (email, user_name) => {
  return {
    "info": {
      "dob": {
        "day": 0,
        "month": "null",
        "year": 0
      },
      "email": `${ email }`,
      "first_name": "null",
      "gender": "null",
      "last_name": "null",
      "user_name": `${ user_name }`,
      "join_date": {
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
          "avg_time": 0,
          "outta_times": 0,
          "rating": 0,
          "rank": "NR",
          "votes": {
            "total": 0,
            "good": 0,
            "neutral": 0,
            "bad": 0
          },
          "comments": {
            "total": 0
          }
        },
        "difficulty": {
          "Easy": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Medium": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Hard": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          }
        },
        "categories": {
          "Anime": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Art": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Books": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Celebrities": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Computers": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Film": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "General": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Geography": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "History": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Mathematics": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Music": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Mythology": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Nature": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Politics": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Science": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Sports": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Television": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Theatre": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Vehicles": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          },
          "Video Games": {
            "answered": 0,
            "correct": 0,
            "incorrect": 0,
            "avg_time": 0,
            "outta_times": 0,
            "rating": 0,
            "rank": "NR"
          }
        }
      }
    },
    experience: {
      "level": 1,
      "avg": 0,
      "total": 0
    },
    achievements: {
      "total": 0,
      "unlocked": "null"
    }
  }
}

export default signUpObjTemplate