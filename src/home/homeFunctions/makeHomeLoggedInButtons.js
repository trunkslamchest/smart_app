const makeHomeLoggedInButtons = (onPushLink, onHelp, onLogOut, routes, user_name) => {
  return [
    {
      buttonType: 'NavLink',
      desc: 'Select a game mode and start answering questions from the SmartApp™ Nexus',
      id: 'play_button',
      name: 'playButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ mode: 'quick_play', route: routes.play }),
      route: routes.play,
      text: 'Play'
    },
    {
      buttonType: 'NavLink',
      desc: 'View the dashboard for your SmartApp™ Profile',
      id: 'profile_button',
      name: 'profileButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_profile }),
      route: routes.dashboard_profile,
      text: 'My Dashboard'
    },
    {
      buttonType: 'NavLink',
      desc: 'View your public SmartApp™ Profile',
      id: 'public_profile_button',
      name: 'publicProfileButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.user_profile + '/' + user_name }),
      route: routes.user_profile + '/' + user_name,
      text: 'My Profile'
    },
    {
      buttonType: 'NavLink',
      desc: 'View the SmartApp™ Leaderboards',
      id: 'leaderboards_button',
      name: 'leaderboardsButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.leader_boards + '/overall' }),
      route: routes.leader_boards + '/overall',
      text: 'Leaderboards'
    },
    {
      buttonType: 'button',
      desc: 'View help Information about SmartApp™',
      id: 'help_button',
      name: 'HelpButton',
      onClickFunction: onHelp,
      text: 'Help'
    },
    {
      buttonType: 'button',
      desc: 'Log out of your SmartApp™ Account',
      id: 'log_out_button',
      name: 'logOutButton',
      onClickFunction: onLogOut,
      text: "Log Out",
    },
  ]
}

export default makeHomeLoggedInButtons