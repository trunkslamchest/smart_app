const makeLoggedOutHeaderButtons = (iconsIndex, onLogIn, onSignUp, onPushLink, routes) => {
  return [
    {
      buttonClass: 'header_leader_board_button',
      buttonType: 'NavLink',
      id: 'header_leader_board_button',
      headerButton: true,
      image: iconsIndex.leaderboardWhiteIcon,
      imageHover: iconsIndex.leaderboardBlackIcon,
      name: 'LeaderboardsButton',
      navButton: false,
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.leader_boards + '/overall' }),
      route: routes.leader_boards + '/overall',
      tooltipText: [ 'Leaderboards' ]
    },
    {
      buttonClass: 'header_button',
      buttonType: 'modal',
      id: 'header_login_button',
      image: iconsIndex.loginWhiteIcon,
      imageHover: iconsIndex.loginBlackIcon,
      name: 'LoginButton',
      onClickFunction: onLogIn,
      tooltipText: [ 'Login' ]
    },
    {
      buttonClass: 'header_button',
      buttonType: 'modal',
      id: 'header_sign_up_button',
      image: iconsIndex.signUpWhiteIcon,
      imageHover: iconsIndex.signUpBlackIcon,
      name: 'SignUpButton',
      onClickFunction: onSignUp,
      tooltipText: [ 'Sign Up' ]
    }
  ]
}

export default makeLoggedOutHeaderButtons