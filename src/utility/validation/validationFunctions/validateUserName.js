import specialChars from '../../../datasets/specialChars'
import numbers from '../../../datasets/numbers'

const validateUserName = (user_name) => {
  let userNameValidation = { errors: [], valid: true }

  if(typeof user_name !== 'string') userNameValidation.errors = [ ...userNameValidation.errors, { code: 40, message: "Your User Name must be a string" } ]
  else {
    if(user_name === "" || user_name === " " || user_name === "null" || user_name.length === 0)  userNameValidation.errors = [ ...userNameValidation.errors, { code: 41, message: "User Names cannot be blank" } ]
    else {
      let sCharsCheck = 0, numCheck = 0

      for (let i = 0; i < user_name.length; i++){
        if(specialChars.user_name.includes(user_name[i])) userNameValidation.errors = [ ...userNameValidation.errors, { code: 42, message: `User Names cannot contain the '${user_name[i]}' character` } ]
        if(specialChars.def.includes(user_name[i])) ++sCharsCheck
        if(numbers.includes(user_name[i])) ++numCheck
      }

      if(numCheck === user_name.length) userNameValidation.errors = [ ...userNameValidation.errors, { code: 43, message: "User Names cannot strictly contain numbers" } ]
      if(sCharsCheck === user_name.length) userNameValidation.errors = [ ...userNameValidation.errors, { code: 44, message: "User Names cannot strictly contain special characters" } ]
      if(user_name.length < 3) userNameValidation.errors = [ ...userNameValidation.errors, { code: 45, message: "User Names cannot be less than 3 characters" } ]
      if(user_name.length > 20) userNameValidation.errors = [ ...userNameValidation.errors, { code: 46, message: "User Names cannot be more than 20 characters" } ]
    }
  }

  if(!!userNameValidation.errors.length) userNameValidation.valid = false
  return userNameValidation
}

export default validateUserName