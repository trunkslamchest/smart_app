const makeSignUpInputField = (fieldProps) => {
  return [
    {
      changed: fieldProps.onChange,
      containerClass: 'sign_up_div',
      distribErrors: fieldProps.distribUserNameErrors,
      errors: fieldProps.userNameErrors,
      id: 'user_name_input',
      label: 'UserName',
      name: 'user_name',
      placeholder: 'User Name',
      type: 'text',
      value: fieldProps.user_name
    },
    {
      changed: fieldProps.onChange,
      containerClass: 'sign_up_div',
      distribErrors: fieldProps.distribEmailErrors,
      errors: fieldProps.emailErrors,
      id: 'email_input',
      label: 'Email',
      name: 'email',
      placeholder: 'Email Address',
      type: 'text',
      value: fieldProps.email
    },
    {
      changed: fieldProps.onChange,
      containerClass: 'sign_up_div',
      distribErrors: fieldProps.distribPasswordErrors,
      errors: fieldProps.passwordErrors,
      id: 'password_input',
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      value: fieldProps.password
    },
    {
      changed: fieldProps.onChecked,
      checked: fieldProps.checked,
      containerClass: 'tos_agree_div',
      distribErrors: fieldProps.distribTOSErrors,
      errors: fieldProps.tosErrors,
      id: 'TOS_agreement',
      label: 'Terms Of Service Agreement',
      name: 'TOSagreement',
      subContainerClass: 'tos_agree_statement',
      text: fieldProps.TOStext,
      type: 'checkbox'
    }
  ]
}

export default makeSignUpInputField