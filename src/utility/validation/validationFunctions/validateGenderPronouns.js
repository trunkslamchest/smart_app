import genderPronouns from '../../../datasets/genderPronouns'

const validateGenderPronouns = (genderPronoun) => {
  let genderPronounsValidation = { errors: [], valid: true }
  if(typeof genderPronoun !== 'string') genderPronounsValidation.errors = [ ...genderPronounsValidation.errors, { code: 80, message: 'Your Gender Pronouns must be in the form of a string' } ]
  else {
    if(!(genderPronouns.includes(genderPronoun) || genderPronoun === "null")) genderPronounsValidation.errors = [ ...genderPronounsValidation.errors, { code: 81, message: "Your Gender Pronouns must be in the SmartApp™ Gender Pronouns Database" } ]
  }
  if(!!genderPronounsValidation.errors.length) genderPronounsValidation.valid = false
  return genderPronounsValidation
}

export default validateGenderPronouns