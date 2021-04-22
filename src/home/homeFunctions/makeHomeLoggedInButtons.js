const makeHomeLoggedInButtons = (onPushLink, onHelp, routes, user_name) => {
  return [
    {
      desc: 'Select a game mode and start answering questions from the SmartApp™ Nexus',
      id: 'Play_button',
      name: 'playButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ mode: 'quick_play', route: routes.play }),
      text: 'Play'
    },
    {
      desc: 'View the dashboard for your SmartApp™ Profile',
      id: 'profile_button',
      name: 'profileButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_profile }),
      text: 'My Dashboard'
    },
    {
      desc: 'View your public SmartApp™ Profile',
      id: 'public_profile_button',
      name: 'publicProfileButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.user_profile + '/' + user_name }),
      text: 'My Profile'
    },
    {
      desc: 'View the SmartApp™ Leaderboards',
      id: 'leaderboards_button',
      name: 'leaderboardsButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.leader_boards + '/overall' }),
      text: 'Leaderboards'
    },
    {
      desc: 'View help Information about SmartApp™',
      id: 'help_button',
      name: 'HelpButton',
      onClickFunction: onHelp,
      text: 'Help'
    }
  ]
}

export default makeHomeLoggedInButtons