const makeResultsNavBarButtons = (routes) => {
  return [
      {
        id: 'nav_results',
        name: 'results',
        // onClickFunction: null,
        // params: {},
        route: routes.stats,
        text: 'Results',
        tooltipText: [ 'Results' ],
        type: 'NavLink'
      },
      {
        id: 'nav_discuss',
        name: 'Discuss',
        // onClickFunction: null,
        // params: {},
        route: routes.discuss,
        text: 'Discuss',
        tooltipText: [ 'Discuss!' ],
        type: 'NavLink'
      }
    ]
}

export default makeResultsNavBarButtons