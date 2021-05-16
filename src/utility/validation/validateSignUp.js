import validateUserName from './validationFunctions/validateUserName'
import validateEmail from './validationFunctions/validateEmail'
import validatePassword from './validationFunctions/validatePassword'
import validateTOS from './validationFunctions/validateTOS'

const validateSignUp = (user_name, email, password, tos) => {

  let signUpValidation = { valid: true, user_name: {}, email: {}, password: {}, tos: {}, pending: true }

  signUpValidation.user_name = validateUserName(user_name)
  signUpValidation.email = validateEmail(email)
  signUpValidation.password = validatePassword(password)
  signUpValidation.tos = validateTOS(tos)

  if(!signUpValidation.user_name.valid || !signUpValidation.email.valid || !signUpValidation.password.valid || !signUpValidation.tos.valid) signUpValidation.valid = false

  signUpValidation.pending = false

  return signUpValidation
}

export default validateSignUp