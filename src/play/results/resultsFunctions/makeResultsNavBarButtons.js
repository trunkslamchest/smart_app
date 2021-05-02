const makeResultsNavBarButtons = (navBarIconIndex, onHelp, onPushLink, routes) => {
  return [
    {
      buttonType: 'NavLink',
      id: 'nav_results',
      image: navBarIconIndex.statsNavBarIconWhite,
      imageHover: navBarIconIndex.statsNavBarIconGrey,
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.stats }),
      name: 'results',
      route: routes.stats,
      tooltipText: [ 'Results' ],
    },
    {
      buttonType: 'NavLink',
      id: 'nav_discuss',
      image: navBarIconIndex.discussNavBarIconWhite,
      imageHover: navBarIconIndex.discussNavBarIconGrey,
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.discuss }),
      name: 'Discuss',
      route: routes.discuss,
      tooltipText: [ 'Discuss!' ],
    },
    {
      buttonType: 'button',
      id: 'nav_help',
      image: navBarIconIndex.helpNavBarIconWhite,
      imageHover: navBarIconIndex.helpNavBarIconGrey,
      name: 'Help',
      onClickFunction: onHelp,
      tooltipText: [ 'Help' ],
    }
  ]
}

export default makeResultsNavBarButtons