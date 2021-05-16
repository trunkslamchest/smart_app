const makeSelectionButtons = (gameModes, routes, setGameMode) => {
  return gameModes.map((gameMode, index) => {
    return {
      buttonType: 'NavLink',
      id: `${gameMode.val}_button`,
      key: index,
      name: gameMode.name,
      onClickFunction: setGameMode,
      params: JSON.stringify({ gameMode: gameMode.val, route: gameMode.val === 'quick_play' ? routes.quick_question : routes[gameMode.val] + '/select' }),
      route: gameMode.val === 'quick_play' ? routes.quick_question : routes[gameMode.val] + '/select',
      text: gameMode.name,
      tooltipText: gameMode.description
    }
  })
}

export default makeSelectionButtons