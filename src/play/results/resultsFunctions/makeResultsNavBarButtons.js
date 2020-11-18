const makeResultsNavBarButtons = (navBarIconIndex, onHelp, routes) => {
  return [
      {
        id: 'nav_results',
        image: navBarIconIndex.statsNavBarIconWhite,
        imageHover: navBarIconIndex.statsNavBarIconGrey,
        name: 'results',
        route: routes.stats,
        tooltipText: [ 'Results' ],
        type: 'NavLink'
      },
      {
        id: 'nav_discuss',
        image: navBarIconIndex.discussNavBarIconWhite,
        imageHover: navBarIconIndex.discussNavBarIconGrey,
        name: 'Discuss',
        route: routes.discuss,
        tooltipText: [ 'Discuss!' ],
        type: 'NavLink'
      },
      {
        id: 'nav_help',
        image: navBarIconIndex.helpNavBarIconWhite,
        imageHover: navBarIconIndex.helpNavBarIconGrey,
        name: 'Help',
        onClickFunction: onHelp,
        tooltipText: [ 'Help' ],
        type: 'button'
      }
    ]
}

export default makeResultsNavBarButtons