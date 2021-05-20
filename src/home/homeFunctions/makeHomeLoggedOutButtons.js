const makeHomeLoggedOutButtons = (onLogIn, onSignUp) => {
  return [
    {
      id: 'log_in_button',
      name: 'logInButton',
      onClickFunction: onLogIn,
      text: 'Log In',
      tooltipText: [ 'Log into an existing account' ]
    },
    {
      id: 'sign_up_button',
      name: 'SignUpButton',
      onClickFunction: onSignUp,
      text: 'Sign Up',
      tooltipText: [ 'Create a new account' ]
    }
  ]
}

export default makeHomeLoggedOutButtons