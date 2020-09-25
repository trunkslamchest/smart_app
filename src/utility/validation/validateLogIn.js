import validateEmail from './validationFunctions/validateEmail'
import validatePassword from './validationFunctions/validatePassword'

const validateLogIn = (email, password) => {

  let logInValidation = { valid: true, email: {}, password: {}, pending: true }

  logInValidation.email = validateEmail(email)
  logInValidation.password = validatePassword(password)

  if(!logInValidation.email.valid || !logInValidation.password.valid) logInValidation.valid = false

  return logInValidation
}

export default validateLogIn