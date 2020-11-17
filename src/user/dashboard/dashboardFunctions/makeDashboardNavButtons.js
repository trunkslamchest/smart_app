const makeDashboardNavButtons = (navBarIconIndex, routes) => {
  return [
      {
        id: 'nav_profile',
        image: navBarIconIndex.profileNavBarIconWhite,
        imageHover: navBarIconIndex.profileNavBarIconGrey,
        name: 'profile',
        route: routes.dashboard_profile,
        tooltipText: [ 'Profile' ],
        type: 'NavLink'
      },
      {
        id: 'nav_stats',
        image: navBarIconIndex.statsNavBarIconWhite,
        imageHover: navBarIconIndex.statsNavBarIconGrey,
        name: 'stats',
        route: routes.dashboard_stats,
        tooltipText: [ 'Statistics' ],
        type: 'NavLink'
      },
      {
        id: 'nav_achievements',
        image: navBarIconIndex.achievementsNavBarIconWhite,
        imageHover: navBarIconIndex.achievementsNavBarIconGrey,
        name: 'achievements',
        route: routes.dashboard_achievements,
        tooltipText: [ 'Achievements' ],
        type: 'NavLink'
      },
      {
        id: 'nav_settings',
        image: navBarIconIndex.settingsNavBarIconWhite,
        imageHover: navBarIconIndex.settingsNavBarIconGrey,
        name: 'settings',
        route: routes.dashboard_settings,
        tooltipText: [ 'Settings' ],
        type: 'NavLink'
      },
      {
        id: 'nav_help',
        image: navBarIconIndex.helpNavBarIconWhite,
        imageHover: navBarIconIndex.helpNavBarIconGrey,
        name: 'Help',
        // onClickFunction: null,
        // params: {},
        // route: routes.discuss,
        // text: 'Discuss',
        tooltipText: [ 'Help' ],
        type: 'button'
      }
    ]
}

export default makeDashboardNavButtons