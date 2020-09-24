import validateUserName from './validateUserName'
import validateEmail from './validateEmail'
import validatePassword from './validatePassword'
import validateTOS from './validateTOS'

const validateSignUp = (user_name, email, password, tos) => {

  let signUpValidation = {
    valid: true,
    user_name: {},
    email: {},
    password: {},
    tos: {}
  }

  signUpValidation.user_name = validateUserName(user_name)
  signUpValidation.email = validateEmail(email)
  signUpValidation.password = validatePassword(password)
  signUpValidation.tos = validateTOS(tos)

  if(!signUpValidation.user_name.valid || !signUpValidation.email.valid || !signUpValidation.password.valid || !signUpValidation.tos.valid) signUpValidation.valid = false

  return signUpValidation
}

export default validateSignUp