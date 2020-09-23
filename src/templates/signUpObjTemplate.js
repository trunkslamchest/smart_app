import getTime from '../utility/getTime'

const signUpObjTemplate = (email, user_name) => {
  return {
    info: {
      dob: {
        day: 0,
        month: 'null',
        year: 0
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
          "avg_time": 0,
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
          "Mathematics": {
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
      }
    }
  }
}

export default signUpObjTemplate