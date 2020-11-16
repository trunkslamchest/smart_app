const makeDashboardNavButtons = (routes) => {
  return [
      {
        id: 'nav_profile',
        name: 'profile',
        // onClickFunction: null,
        // params: {},
        route: routes.dashboard_profile,
        text: 'Profile',
        tooltipText: [ 'My Profile' ],
        type: 'NavLink'
      },
      {
        id: 'nav_stats',
        name: 'stats',
        // onClickFunction: null,
        // params: {},
        route: routes.dashboard_stats,
        text: 'Stats',
        tooltipText: [ 'My Statistics' ],
        type: 'NavLink'
      },
      {
        id: 'nav_achievements',
        name: 'achievements',
        // onClickFunction: null,
        // params: {},
        route: routes.dashboard_achievements,
        text: 'Achievements',
        tooltipText: [ 'My Achievements' ],
        type: 'NavLink'
      },
      {
        id: 'nav_settings',
        name: 'settings',
        // onClickFunction: null,
        // params: {},
        route: routes.dashboard_settings,
        text: 'Settings',
        tooltipText: [ 'My Settings' ],
        type: 'NavLink'
      }
    ]
}

export default makeDashboardNavButtons