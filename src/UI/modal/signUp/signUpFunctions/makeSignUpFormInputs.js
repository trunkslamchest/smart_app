const makeSignUpFormInputs = (checked, email, onChange, onChecked, password, tosText, user_name) => {
  return [
    {
      errorContainerClass: 'sign_up_form_error_container',
      errorClass: 'sign_up_form_error',
      id: 'user_name',
      inputSubContainerClass: 'sign_up_input_sub_container',
      inputClass: 'sign_up_form_input',
      name: 'signUpUserName',
      onChange: onChange,
      placeholder: 'User Name...',
      type: 'text',
      val: user_name
    },
    {
      errorContainerClass: 'sign_up_form_error_container',
      errorClass: 'sign_up_form_error',
      id: 'email',
      inputSubContainerClass: 'sign_up_input_sub_container',
      inputClass: 'sign_up_form_input',
      name: 'signUpEmail',
      onChange: onChange,
      placeholder: 'Email Address...',
      type: 'text',
      val: email
    },
    {
      errorContainerClass: 'sign_up_form_error_container',
      errorClass: 'sign_up_form_error',
      id: 'password',
      inputSubContainerClass: 'sign_up_input_sub_container',
      inputClass: 'sign_up_form_input',
      name: 'signUpPassword',
      onChange: onChange,
      placeholder: 'Password...',
      type: 'password',
      val: password
    },
    {
      checkBoxContainerClass: 'tos_check_box_container',
      checkBoxButtonContainerClass: 'tos_check_box_button_container',
      checkBoxClass: 'tos_check_box',
      checkBoxImgClass: 'tos_check_box_img',
      errorContainerClass: 'sign_up_form_error_container',
      errorClass: 'sign_up_form_error',
      id: 'tos',
      inputSubContainerClass: 'sign_up_tos_sub_container',
      inputClass: 'sign_up_form_tos',
      name: 'TOSagreement',
      onChange: onChecked,
      text: tosText,
      type: 'checkbox',
      val: checked
    }
  ]
}

export default makeSignUpFormInputs