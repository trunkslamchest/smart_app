const makeDeleteProfileFormInputs = (onChange, password) => {
  return [
    {
      errorContainerClass: 'delete_profile_form_error_container',
      errorClass: 'delete_profile_form_error',
      id: 'password',
      inputSubContainerClass: 'delete_profile_input_sub_container',
      inputClass: 'delete_profile_form_input',
      name: 'deleteProfilePassword',
      onChange: onChange,
      placeholder: 'Password...',
      type: 'password',
      val: password
    }
  ]
}

export default makeDeleteProfileFormInputs