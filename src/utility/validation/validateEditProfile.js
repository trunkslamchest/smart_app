
import validateBio from './validationFunctions/validateBio'
import validateCountry from './validationFunctions/validateCountry'
import validateDOB from './validationFunctions/validateDOB'
import validateEmail from './validationFunctions/validateEmail'
import validateGender from './validationFunctions/validateGender'
import validateGenderPronouns from './validationFunctions/validateGenderPronouns'
import validateRealName from './validationFunctions/validateRealName'
import validateUserName from './validationFunctions/validateUserName'

const validateEditProfile = (bio, country, dob, email, first_name, gender, gender_pronouns, last_name, user_name) => {

  let editProfileValidation = {
    pending: true, valid: true,
    bio: {}, country: {}, dob: {}, email: {}, first_name: {}, gender: {}, gender_pronouns: {}, last_name: {}, user_name: {}
  }

  editProfileValidation.bio = validateBio(bio)
  editProfileValidation.country = validateCountry(country)
  editProfileValidation.dob = validateDOB(dob)
  editProfileValidation.email = validateEmail(email)
  editProfileValidation.first_name = validateRealName(first_name, 'First')
  editProfileValidation.gender = validateGender(gender)
  editProfileValidation.gender_pronouns = validateGenderPronouns(gender_pronouns)
  editProfileValidation.last_name = validateRealName(last_name, 'Last')
  editProfileValidation.user_name = validateUserName(user_name)

  if(
    !editProfileValidation.bio.valid ||
    !editProfileValidation.country.valid ||
    !editProfileValidation.dob.valid ||
    !editProfileValidation.email.valid ||
    !editProfileValidation.first_name.valid ||
    !editProfileValidation.gender.valid ||
    !editProfileValidation.gender_pronouns.valid ||
    !editProfileValidation.last_name.valid ||
    !editProfileValidation.user_name.valid
  ) editProfileValidation.valid = false

  editProfileValidation.pending = false

  return editProfileValidation
}

export default validateEditProfile