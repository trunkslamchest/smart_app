import genders from '../../../datasets/genders'

const validateGender = (gender) => {
  let genderValidation = { errors: [], valid: true }
  if(typeof gender !== 'string') genderValidation.errors = [ ...genderValidation.errors, { code: 110, message: 'Your Gender must be in the form of a string' } ]
  else {
    if(!(genders.includes(gender) || gender === "null")) genderValidation.errors = [ ...genderValidation.errors, { code: 111, message: "Your Gender must be in the SmartApp™ Gender Database" } ]
  }

  if(!!genderValidation.errors.length) genderValidation.valid = false
  return genderValidation
}

export default validateGender