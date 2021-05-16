const makePlayMenuButtons = (onPushLink, onLogOut, routes) => {
  return [
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      id: 'profile_menu_button',
      name: 'profileMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_profile }),
      text: "Profile",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      id: 'stats_menu_button',
      name: 'statsMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_stats }),
      text: "Statistics",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      id: 'achievements_menu_button',
      name: 'achievementsMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_achievements }),
      text: "Achievements",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      id: 'settings_menu_button',
      name: 'settingsMenuButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.dashboard_settings }),
      text: "Settings",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      id: 'log_out_menu_button',
      name: 'logOutMenuButton',
      onClickFunction: onLogOut,
      text: "Log Out",
    },
  ]
}

export default makePlayMenuButtons