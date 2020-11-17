const makeHomeLoggedOutButtons = (onLogIn, onSignUp, onHelp) => {
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

    },
    {
      id: 'help_button',
      name: 'HelpButton',
      onClickFunction: onHelp,
      text: 'Help',
      tooltipText: [ 'Information on how to get started' ]
    }
  ]
}

export default makeHomeLoggedOutButtons