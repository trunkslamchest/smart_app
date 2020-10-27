const validateTOS = (tos) => {
  let tosValidation = { errors: [], valid: true }
  if(!tos) tosValidation.errors = [ ...tosValidation.errors, { code: 69, message: 'You must agree to the Terms of Service Agreement & Privacy Policy before creating a new account' } ]
  if(!!tosValidation.errors.length) tosValidation.valid = false
  return tosValidation
}

export default validateTOS