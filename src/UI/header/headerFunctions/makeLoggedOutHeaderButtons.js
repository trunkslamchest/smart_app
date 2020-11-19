const makeLoggedOutHeaderButtons = (iconsIndex, onLogIn, onSignUp, onPushLink, routes) => {
  return [
    {
      buttonType: 'link',
      id: 'header_leader_board_button',
      image: iconsIndex.leaderboardWhiteIcon,
      imageHover: iconsIndex.leaderboardBlackIcon,
      name: 'LeaderboardsButton',
      params: JSON.stringify({ route: routes.leader_boards + '/overall' }),
      onClickFunction: onPushLink,
      tooltipText: [ 'Leaderboards' ]
    },
    {
      buttonType: 'modal',
      id: 'header_login_button',
      image: iconsIndex.loginWhiteIcon,
      imageHover: iconsIndex.loginBlackIcon,
      name: 'LoginButton',
      onClickFunction: onLogIn,
      tooltipText: [ 'Login' ]
    },
    {
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