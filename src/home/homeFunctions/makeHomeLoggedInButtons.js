const makeHomeLoggedInButtons = (onInitGame, onPushLink, onHelp, routes, user_name) => {

  console.log(user_name)

  return [
    // {
    //   desc: 'Answer a random question from the SmartApp™ Nexus.',
    //   id: 'quick_play_button',
    //   name: 'quickPlayButton',
    //   onClickFunction: onInitGame,
    //   params: JSON.stringify({ mode: 'quick_play', route: routes.quick_play }),
    //   text: 'Quick Play'
    // },
    // {
    //   desc: 'Select a category and answer a random question from that category.',
    //   id: 'by_category_button',
    //   name: 'byCategoryButton',
    //   onClickFunction: onInitGame,
    //   params: JSON.stringify({ mode: 'by_cat', route: routes.by_cat }),
    //   text: 'Play By Category'
    // },
    // {
    //   desc: 'Select a difficulty and answer a random question from that category.',
    //   id: 'by_difficulty_button',
    //   name: 'byDifficultyButton',
    //   onClickFunction: onInitGame,
    //   params: JSON.stringify({ mode: 'by_diff', route: routes.by_diff }),
    //   text: 'Play By Difficulty'
    // },
    {
      desc: 'Select a game mode and start answering questions from the SmartApp™ Nexus',
      id: 'Play_button',
      name: 'playButton',
      // onClickFunction: onInitGame,
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