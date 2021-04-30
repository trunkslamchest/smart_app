const makeLeaderBoardsNavButtons = (navBarIconIndex, onHelp, routes) => {
  return [
      {
        buttonType: 'NavLink',
        id: 'nav_overall',
        image: navBarIconIndex.internationalNavBarIconWhite,
        imageHover: navBarIconIndex.internationalNavBarIconGrey,
        name: 'overall',
        route: routes.overall,
        tooltipText: [ 'International Leaderboard' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_countries',
        image: navBarIconIndex.regionalNavBarIconWhite,
        imageHover: navBarIconIndex.regionalNavBarIconGrey,
        name: 'countries',
        route: routes.countries,
        tooltipText: [ 'Regional Leaderboard' ]
      },
      {
        buttonType: 'NavLink',
        id: 'nav_cat',
        image: navBarIconIndex.categoriesNavBarIconWhite,
        imageHover: navBarIconIndex.categoriesNavBarIconGrey,
        name: 'cat',
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