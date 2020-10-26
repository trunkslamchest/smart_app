const checkBlank = (field, errorMsg) => {
  let checkedError = null, checkedField = ''

  if(field === 'null' || field === 0) checkedError = errorMsg
  else checkedField = field

  return { error: checkedError, field: checkedField }
}

export default checkBlank