const makeDashboardNavButtons = (navBarIconIndex, onHelp, onPushLink, routes) => {
  return [
      {
        buttonType: 'NavLink',
        id: 'nav_profile',
        image: navBarIconIndex.profileNavBarIconWhite,
        imageHover: navBarIconIndex.profileNavBarIconGrey,
        name: 'profile',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.dashboard_profile }),
        route: routes.dashboard_profile,
        tooltipText: [ 'Profile' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_stats',
        image: navBarIconIndex.statsNavBarIconWhite,
        imageHover: navBarIconIndex.statsNavBarIconGrey,
        name: 'stats',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.dashboard_stats }),
        route: routes.dashboard_stats,
        tooltipText: [ 'Statistics' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_achievements',
        image: navBarIconIndex.achievementsNavBarIconWhite,
        imageHover: navBarIconIndex.achievementsNavBarIconGrey,
        name: 'achievements',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.dashboard_achievements }),
        route: routes.dashboard_achievements,
        tooltipText: [ 'Achievements' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_settings',
        image: navBarIconIndex.settingsNavBarIconWhite,
        imageHover: navBarIconIndex.settingsNavBarIconGrey,
        name: 'settings',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.dashboard_settings }),
        route: routes.dashboard_settings,
        tooltipText: [ 'Settings' ]
      },
      {
        buttonType: 'button',
        id: 'nav_help',
        image: navBarIconIndex.helpNavBarIconWhite,
        imageHover: navBarIconIndex.helpNavBarIconGrey,
        name: 'Help',
        onClickFunction: onHelp,
        tooltipText: [ 'Help' ]
      }
    ]
}

export default makeDashboardNavButtons