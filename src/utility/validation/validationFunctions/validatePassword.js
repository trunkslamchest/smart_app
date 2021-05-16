import specialChars from '../../../datasets/specialChars'
import numbers from '../../../datasets/numbers'
import chars from '../../../datasets/chars'

const validatePassword = (password) => {
  let passwordValidation = { errors: [], valid: true }

  if(typeof password !== 'string') passwordValidation.errors = [ ...passwordValidation.errors, { code: 70, message: 'Password must be a string' } ]
  else {
    if(password === "" || password === " " || password.length === 0)  passwordValidation.errors = [ ...passwordValidation.errors, { code: 71, message: "Password cannot be blank" } ]
    else {
      let charsLcheck = 0, charsUcheck = 0, sCharsCheck = 0, numCheck = 0
      for (let i = 0; i < password.length; i++){
        if(specialChars.def.includes(password[i])) ++sCharsCheck
        if(chars.lower.includes(password[i])) ++charsLcheck
        if(chars.upper.includes(password[i])) ++charsUcheck
        if(numbers.includes(password[i])) ++numCheck
      }

      if(password.length < 6) passwordValidation.errors = [ ...passwordValidation.errors, { code: 72, message: "Password cannot be less than 6 characters" } ]
      if(password.length > 100) passwordValidation.errors = [ ...passwordValidation.errors, { code: 73, message: "Password cannot be more than 100 characters" } ]
      if(sCharsCheck < 1) passwordValidation.errors = [ ...passwordValidation.errors, { code: 74, message: "Password must contain at least 1 special character" } ]
      if(charsLcheck < 1) passwordValidation.errors = [ ...passwordValidation.errors, { code: 75, message: "Password must contain at least 1 lower case letter" } ]
      if(charsUcheck < 1) passwordValidation.errors = [ ...passwordValidation.errors, { code: 76, message: "Password must contain at least 1 upper case letter" } ]
      if(numCheck < 2) passwordValidation.errors = [ ...passwordValidation.errors, { code: 77, message: "Password must contain at least 2 numbers" } ]
    }
  }

  if(!!passwordValidation.errors.length) passwordValidation.valid = false
  return passwordValidation
}

export default validatePassword