export const checkBlankString = (field, errorMsg) => {
  let checkedObj = {}

  if(field === 'null' || field.length === 0) {
    checkedObj.error = errorMsg
    checkedObj.field = ''
  } else checkedObj.field = field

  return checkedObj
}

export const checkBlankInt = (field, errorMsg) => {
  let checkedObj = {}

  if(field === 0) {
    checkedObj.error = errorMsg
    checkedObj.field = 0
  } else checkedObj.field = field

  return checkedObj
}