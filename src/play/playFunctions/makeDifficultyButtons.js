const makedifficultyButtons = (difficulties, routes, setQset) => {
  return difficulties.map((difficulty, index) => {
    return {
      buttonType: 'NavLink',
      id: `${difficulty.val}_button`,
      key: index,
      name: difficulty.name,
      onClickFunction: setQset,
      params: JSON.stringify({ qSet: difficulty.name, route: routes.by_diff_question }),
      route: routes.by_diff,
      text: difficulty.name,
      tooltipText: difficulty.description
    }
  })
}

export default makedifficultyButtons