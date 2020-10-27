import flagIconIndex from '../../../assets/flag_icons/flagIconIndex'

const validateCountry = (country) => {
  let countryValidation = { errors: [], valid: true }
  if(typeof country !== 'string') countryValidation.errors = [ ...countryValidation.errors, { code: 180, message: 'Your Gender must be in the form of a string' } ]
  else {
    if(!(Object.keys(flagIconIndex).includes(country) || country === "null")) countryValidation.errors = [ ...countryValidation.errors, { code: 181, message: "Your Country Must be in the SmartApp™ Country Database" } ]
  }

  if(!!countryValidation.errors.length) countryValidation.valid = false
  return countryValidation
}

export default validateCountry