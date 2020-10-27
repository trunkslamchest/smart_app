import specialChars from '../../../datasets/specialChars'
import numbers from '../../../datasets/numbers'

const validateBio = (bio) => {
  let bioValidation = { errors: [], valid: true }, sCharsCheck = 0, numCheck = 0

  if(typeof bio !== 'string') bioValidation.errors = [ ...bioValidation.errors, { code: 20, message: 'Your Gender must be in the form of a string' } ]
  else {
    for(let i = 0; i < bio.length; i++){
      if(specialChars.bio.includes(bio[i])) bioValidation.errors = [ ...bioValidation.errors, { code: 21, message: `Your Biography cannot contain the '${bio[i]}' character` } ]
      if(specialChars.def.includes(bio[i])) ++sCharsCheck
      if(numbers.includes(bio[i])) ++numCheck
    }

    if(numCheck === bio.length) bioValidation.errors = [ ...bioValidation.errors, { code: 22, message: "Your Biography cannot strictly contain numbers" } ]
    if(sCharsCheck === bio.length) bioValidation.errors = [ ...bioValidation.errors, { code: 23, message: "Your Biography cannot strictly contain special characters" } ]
    if(bio.length > 255) bioValidation.errors = [ ...bioValidation.errors, { code: 24, message: "Your Biography cannot be more than 255 characters" } ]
  }

  if(!!bioValidation.errors.length) bioValidation.valid = false
  return bioValidation
}

export default validateBio