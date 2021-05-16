import specialChars from '../../../datasets/specialChars'

const validateEmail = (email) => {
  let emailValidation = { errors: [], valid: true }

  if(typeof email !== 'string') emailValidation.errors = [ ...emailValidation.errors, { code: 150, message: 'Email must be in the form of a string' } ]
  else {
    if(email === "" || email === " " || email === "null" || email.length === 0) emailValidation.errors = [ ...emailValidation.errors, { code: 151, message: "Email cannot be blank" } ]
    else {
      if(email.length < 10) emailValidation.errors = [ ...emailValidation.errors, { code: 152, message: "Email cannot be less than 10 characters" } ]
      if(email.length > 100) emailValidation.errors = [ ...emailValidation.errors, { code: 153, message: "Email cannot be more than 100 characters" } ]
      if(!email.includes('@')) emailValidation.errors = [ ...emailValidation.errors, { code: 154, message: "Email must contain a domain address" } ]
      else {
        let parseEmail = email.split('@')

        if(parseEmail.length > 2) emailValidation.errors = [ ...emailValidation.errors, { code: 155, message: "Email cannot contain multiple '@' symbols" } ]
        if(parseEmail[0][0] === '.') emailValidation.errors = [ ...emailValidation.errors, { code: 156, message: "Email cannot begin with a '.' symbol" } ]
        if(parseEmail[0][parseEmail[0].length - 1] === '.') emailValidation.errors = [ ...emailValidation.errors, { code: 157, message: "Email cannot end with a '.' symbol" } ]
        if(specialChars.email.includes(parseEmail[0][0])) emailValidation.errors = [ ...emailValidation.errors, { code: 158, message: "Email cannot begin with a special character" } ]
        if(specialChars.email.includes(parseEmail[0][parseEmail[0].length - 1])) emailValidation.errors = [ ...emailValidation.errors, { code: 159, message: "Email cannot end with a special character" } ]

        for(let i = 0; i < parseEmail[0].length; i++) {
          if(parseEmail[0][i] === '.' && parseEmail[0][i + 1] === '.') {
            emailValidation.errors = [ ...emailValidation.errors, { code: 160, message: "Email cannot contain consecutive '.' symbols" } ]
            break
          }
        if(specialChars.def.includes(parseEmail[0][i]) && specialChars.def.includes(parseEmail[0][i + 1])) {
            emailValidation.errors = [ ...emailValidation.errors, { code: 161, message: "Email cannot contain consecutive special characters" } ]
            break
          }
        }

        if(!parseEmail[1].includes('.')) emailValidation.errors = [ ...emailValidation.errors, { code: 162, message: "Email domain address must have a top-level domain" } ]
        else {
          let parseDomain = parseEmail[1].split('.'), numCheck = 0

          for(let char in parseDomain[0]){ if(!!parseInt(parseDomain[0][char])) ++numCheck }
          if(numCheck === parseDomain[0].length) emailValidation.errors = [ ...emailValidation.errors, { code: 163, message: "Email domain addresses cannot strictly contain numbers" } ]
          if(parseDomain.length > 2) emailValidation.errors = [ ...emailValidation.errors, { code: 164, message: "Email domain address cannot contain multiple '.' symbols" } ]
          if(parseDomain[0][0] === '-') emailValidation.errors = [ ...emailValidation.errors, { code: 165, message: "Email domain address cannot begin with a '-' symbol" } ]
          if(parseDomain[1] !== 'com' && parseDomain[1] !== 'net' && parseDomain[1] !== 'org') emailValidation.errors = [ ...emailValidation.errors, { code: 166, message: "Email top-level domain address must be valid" } ]

          for(let i = 0; i < parseDomain[0].length; i++) {
            if(specialChars.def.includes(parseDomain[0][i])) {
              emailValidation.errors = [ ...emailValidation.errors, { code: 167, message: "Email domain address cannot contain special characters" } ]
              break
            }
          }

          for(let i = 0; i < parseDomain[1].length; i++) {
            if(specialChars.def.includes(parseDomain[1][i])) {
              emailValidation.errors = [ ...emailValidation.errors, { code: 168, message: "Email top-level domain address cannot contain special characters" } ]
              break
            }
          }
        }
      }
    }
  }

  if(!!emailValidation.errors.length) emailValidation.valid = false
  return emailValidation
}

export default validateEmail