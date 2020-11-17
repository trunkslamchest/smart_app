const makeLeaderBoardsNavButtons = (navBarIconIndex, routes) => {
  return [
      {
        id: 'nav_overall',
        image: navBarIconIndex.internationalNavBarIconWhite,
        imageHover: navBarIconIndex.internationalNavBarIconGrey,
        name: 'overall',
        route: routes.overall,
        tooltipText: [ 'International Leaderboard' ],
        type: 'NavLink'
      },
      {
        id: 'nav_countries',
        image: navBarIconIndex.regionalNavBarIconWhite,
        imageHover: navBarIconIndex.regionalNavBarIconGrey,
        name: 'countries',
        route: routes.countries,
        tooltipText: [ 'Regional Leaderboard' ],
        type: 'NavLink'
      },
      {
        id: 'nav_cat',
        image: navBarIconIndex.categoriesNavBarIconWhite,
        imageHover: navBarIconIndex.categoriesNavBarIconGrey,
        name: 'cat',
        route: routes.categories,
        tooltipText: [ 'Category Leaderboard' ],
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

export default makeLeaderBoardsNavButtons