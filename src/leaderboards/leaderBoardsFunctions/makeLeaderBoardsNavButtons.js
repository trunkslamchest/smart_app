const makeLeaderBoardsNavButtons = (navBarIconIndex, onHelp, onPushLink, routes) => {
  return [
      {
        buttonType: 'NavLink',
        id: 'nav_overall',
        image: navBarIconIndex.internationalNavBarIconWhite,
        imageHover: navBarIconIndex.internationalNavBarIconGrey,
        name: 'overall',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.overall }),
        route: routes.overall,
        tooltipText: [ 'International Leaderboard' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_countries',
        image: navBarIconIndex.regionalNavBarIconWhite,
        imageHover: navBarIconIndex.regionalNavBarIconGrey,
        name: 'countries',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.countries }),
        route: routes.countries,
        tooltipText: [ 'Regional Leaderboard' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_cat',
        image: navBarIconIndex.categoriesNavBarIconWhite,
        imageHover: navBarIconIndex.categoriesNavBarIconGrey,
        name: 'cat',
        onClickFunction: onPushLink,
        params: JSON.stringify({ route: routes.categories }),
        route: routes.categories,
        tooltipText: [ 'Category Leaderboard' ]
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

export default makeLeaderBoardsNavButtons