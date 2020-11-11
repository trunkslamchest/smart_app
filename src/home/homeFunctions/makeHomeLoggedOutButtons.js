const makeHomeLoggedOutButtons = (onLogIn, onSignUp, modal) => {
  return [
    {
      classType: modal.login ? 'home_auth_button_active' : 'home_auth_button',
      clickFunction: onLogIn,
      id: 'log_in_button',
      name: 'logInButton',
      text: modal.login ? '|' : 'Log In',
      textContainerClass: modal.login ? 'home_button_text_container_active' : 'home_button_text_container',
      wrapperClass: modal.login ? 'home_button_wrapper_active' : 'home_button_wrapper'
    },
    {
      classType: modal.signup ? 'home_auth_button_active' : 'home_auth_button',
      clickFunction: onSignUp,
      id: 'sign_up_button',
      name: 'SignUpButton',
      text: modal.signup ? '|' : 'Sign Up',
      textContainerClass: modal.signup ? 'home_button_text_container_active' : 'home_button_text_container',
      wrapperClass: modal.signup ? 'home_button_wrapper_active' : 'home_button_wrapper'
    }
  ]
}

export default makeHomeLoggedOutButtons