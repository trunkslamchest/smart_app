import validateEmail from './validateEmail'
import validatePassword from './validatePassword'

const validateLogIn = (email, password) => {

  let logInValidation = {
    valid: true,
    email: {},
    password: {},
  }

  logInValidation.email = validateEmail(email)
  logInValidation.password = validatePassword(password)

  if(!logInValidation.email.valid || !logInValidation.password.valid) logInValidation.valid = false

  return logInValidation
}

export default validateLogIn