const makePlayMenuButtons = (onPushLink, onLogOut, routes) => {
  return [
    {
      buttonClass: 'menu_button',
      id: 'profile_menu_button',
      name: 'profileMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_profile }),
      text: "Profile",
    },
    {
      buttonClass: 'menu_button',
      id: 'stats_menu_button',
      name: 'statsMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_stats }),
      text: "Statistics",
    },
    {
      buttonClass: 'menu_button',
      id: 'achievements_menu_button',
      name: 'achievementsMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_achievements }),
      text: "Achievements",
    },
    {
      buttonClass: 'menu_button',
      id: 'settings_menu_button',
      name: 'settingsMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_settings }),
      text: "Settings",
    },
    {
      buttonClass: 'menu_button',
      id: 'log_out_menu_button',
      name: 'logOutMenuButton',
      onClickFunction: onLogOut,
      text: "Log Out",
    },
  ]
}

export default makePlayMenuButtons