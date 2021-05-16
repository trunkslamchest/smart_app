import specialChars from '../../../datasets/specialChars'
import numbers from '../../../datasets/numbers'

const validateRealName = (name, type) => {
  let realNameValidation = { errors: [], valid: true }, sCharsCheck = 0

  if(typeof name !== 'string') realNameValidation.errors = [ ...realNameValidation.errors, { code: 50, message: `Your ${type} Name must be a string` } ]
  else {
    for (let i = 0; i < name.length; i++){
      if(specialChars.real_name.includes(name[i])) realNameValidation.errors = [ ...realNameValidation.errors, { code: 51, message: `Your ${type} Name cannot contain the '${name[i]}' character` } ]
      if(specialChars.def.includes(name[i])) ++sCharsCheck
      if(numbers.includes(name[i])) {
        realNameValidation.errors = [ ...realNameValidation.errors, { code: 52, message: `Your ${type} Name cannot contain numbers` } ]
        break
      }
    }

    if(sCharsCheck === name.length) realNameValidation.errors = [ ...realNameValidation.errors, { code: 53, message: `Your ${type} Name cannot strictly contain special characters` } ]
    if(name.length < 2) realNameValidation.errors = [ ...realNameValidation.errors, { code: 54, message: `Your ${type} Name cannot be less than 2 characters` } ]
    if(type === "First" && name.length > 25) realNameValidation.errors = [ ...realNameValidation.errors, { code: 55, message: `Your ${type} Name cannot be more than 25 characters` } ]
    if(type === "Last" && name.length > 50) realNameValidation.errors = [ ...realNameValidation.errors, { code: 56, message: `Your ${type} Name cannot be more than 50 characters` } ]
  }

  if(!!realNameValidation.errors.length) realNameValidation.valid = false
  return realNameValidation
}

export default validateRealName