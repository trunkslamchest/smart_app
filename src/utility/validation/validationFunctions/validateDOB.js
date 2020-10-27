import months from '../../../datasets/months'

const validateDOB = (dob) => {
  let dobValidation = { valid: true, errors: [] }

  if(typeof dob.month !== 'string') dobValidation.errors = [ ...dobValidation.errors, { code: 100, message: "Your Birth Month must be a string" } ]
  if(!(months.includes(dob.month) || dob.month === "null")) dobValidation.errors = [ ...dobValidation.errors, { code: 101, message: "Your Birth Month must be in the SmartApp™ Month Database" } ]

  // if(typeof dob.day !== 'number') dobValidation.errors = [ ...dobValidation.errors, { code: 102, message: "Your Birth Day must be a number" } ]
  if(dob.day > 31) dobValidation.errors = [ ...dobValidation.errors, { code: 104, message: "Your Birth Day has to occur before the 31st of the month" } ]
  if(dob.month !== "null") {
    if(dob.day < 1) dobValidation.errors = [ ...dobValidation.errors, { code: 103, message: "Your Birth Day has to occur after the 1st of the month" } ]
    if(dob.month === 'Februrary' && dob.day > 29) dobValidation.errors = [ ...dobValidation.errors, { code: 105, message: "Februrary only has 28 days (29 during Leap Year)" } ]
    if(
      (dob.month === 'September' || dob.month === 'April' ||
      dob.month === 'June' || dob.month === 'November') &&
      dob.day > 30) dobValidation.errors = [ ...dobValidation.errors, { code: 106, message: `${dob.month} only has 30 days (29 during Leap Year)` } ]

  if(
   (dob.month === 'January' || dob.month === 'March' || dob.month === 'May' ||
    dob.month === 'July' || dob.month === 'August' || dob.month === 'October' ||
    dob.month === 'December') &&
    dob.day > 31) dobValidation.errors = [ ...dobValidation.errors, { code: 107, message: `${dob.month} only has 31 days` } ]
  }

  // if(typeof dob.year !== 'number') dobValidation.errors = [ ...dobValidation.errors, { code: 108, message: "Your Birth Year must be a number" } ]
  if(dob.year !== 0) {
    if(dob.year < 1900) dobValidation.errors = [ ...dobValidation.errors, { code: 109, message: "Your Birth Year must be after the year 1900 AD" } ]
    if(dob.year > 2010) dobValidation.errors = [ ...dobValidation.errors, { code: 110, message: "You must be at least 10 years old to use SmartApp™" } ]
  }

  if(!!dobValidation.errors.length) dobValidation.valid = false
  return dobValidation
}

export default validateDOB