import specialChars from '../../datasets/specialChars'
import numbers from '../../datasets/numbers'

const validateComment = (comment) => {

  let commentValidation = { valid: true, errors: [] }

  if(comment === "" || comment === " " || comment.length === 0)  commentValidation.errors = [ ...commentValidation.errors, { code: 100, msg: "Comments cannot be blank" } ]
  else {
    let sCharsCheck = 0, numCheck = 0

    for (let i = 0; i < comment.length; i++){
      if(specialChars.comment.includes(comment[i])) commentValidation.errors = [ ...commentValidation.errors, { code: 101, msg: `Comments cannot contain the '${comment[i]}' character` } ]
      if(specialChars.def.includes(comment[i])) ++sCharsCheck
      if(numbers.includes(comment[i])) ++numCheck
    }

    if(numCheck === comment.length) commentValidation.errors = [ ...commentValidation.errors, { code: 102, msg: "Comments cannot strictly contain numbers" } ]
    if(sCharsCheck === comment.length) commentValidation.errors = [ ...commentValidation.errors, { code: 103, msg: "Comments cannot strictly contain special characters" } ]
    if(comment.length < 2) commentValidation.errors = [ ...commentValidation.errors, { code: 104, msg: "Comments cannot be less than 2 character" } ]
    if(comment.length > 255) commentValidation.errors = [ ...commentValidation.errors, { code: 105, msg: "Comments cannot be more than 255 characters" } ]
  }

  if(!!commentValidation.errors.length) commentValidation.valid = false

  return commentValidation
}

export default validateComment