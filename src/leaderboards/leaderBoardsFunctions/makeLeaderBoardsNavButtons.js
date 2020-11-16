const makeLeaderBoardsNavButtons = (routes) => {
  return [
      {
        id: 'nav_overall',
        name: 'overall',
        // onClickFunction: null,
        // params: {},
        route: routes.overall,
        text: 'Overall',
        tooltipText: [ 'International Leaderboard' ],
        type: 'NavLink'
      },
      {
        id: 'nav_countries',
        name: 'countries',
        // onClickFunction: null,
        // params: {},
        route: routes.countries,
        text: 'Countries',
        tooltipText: [ 'Regional Leaderboard' ],
        type: 'NavLink'
      },
      {
        id: 'nav_cat',
        name: 'cat',
        // onClickFunction: null,
        // params: {},
        route: routes.categories,
        text: 'Categories',
        tooltipText: [ 'Categories Leaderboard' ],
        type: 'NavLink'
      }
    ]
}

export default makeLeaderBoardsNavButtons