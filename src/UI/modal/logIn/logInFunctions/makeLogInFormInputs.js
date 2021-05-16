const makeLogInFormInputs = ( onChange, email, password) => {
    return [
      {
        errorContainerClass: 'log_in_form_error_container',
        errorClass: 'log_in_form_error',
        id: 'email',
        inputSubContainerClass: 'log_in_input_sub_container',
        inputClass: 'log_in_form_input',
        name: 'logInEmail',
        onChange: onChange,
        placeholder: 'Email Address...',
        type: 'text',
        val: email
      },
      {
        errorContainerClass: 'log_in_form_error_container',
        errorClass: 'log_in_form_error',
        id: 'password',
        inputSubContainerClass: 'log_in_input_sub_container',
        inputClass: 'log_in_form_input',
        name: 'logInPassword',
        onChange: onChange,
        placeholder: 'Password...',
        type: 'password',
        val: password
      }
    ]
  }

export default makeLogInFormInputs