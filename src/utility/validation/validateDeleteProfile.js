import validatePassword from './validationFunctions/validatePassword'

const validateDeleteProfile = (password) => {

  let deleteProfileValidation = { valid: true, password: {} }

  deleteProfileValidation.password = validatePassword(password)

  if(!deleteProfileValidation.password.valid) deleteProfileValidation.valid = false

  return deleteProfileValidation
}

export default validateDeleteProfile