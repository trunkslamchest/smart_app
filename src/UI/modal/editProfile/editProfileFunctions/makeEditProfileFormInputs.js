const makeEditProfileFormInputs = (onChange, password) => {
  return [
    {
      errorContainerClass: 'edit_profile_form_error_container',
      errorClass: 'edit_profile_form_error',
      id: 'password',
      inputSubContainerClass: 'edit_profile_modal_input_sub_container',
      inputClass: 'edit_profile_form_input',
      name: 'editProfilePassword',
      onChange: onChange,
      placeholder: 'Password...',
      type: 'password',
      val: password
    }
  ]
}

export default makeEditProfileFormInputs