import validatePassword from './validationFunctions/validatePassword'

const validateEditProfileModal = (password) => {

  let editProfileModalValidation = { valid: true, password: {} }

  editProfileModalValidation.password = validatePassword(password)

  if(!editProfileModalValidation.password.valid) editProfileModalValidation.valid = false

  return editProfileModalValidation
}

export default validateEditProfileModal