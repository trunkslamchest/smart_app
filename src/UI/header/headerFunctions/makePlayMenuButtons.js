const makePlayMenuButtons = (onInitGame, routes) => {
  return [
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      buttonType: 'menu',
      id: 'quick_play_menu_button',
      name: 'quickPlayMenuButton',
      onClickFunction: onInitGame,
      params: JSON.stringify({ mode: 'quick_play', route: routes.quick_play }),
      text: "Quick Play",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      buttonType: 'menu',
      id: 'by_category_menu_button',
      name: 'byCategoryMenuButton',
      onClickFunction: onInitGame,
      params: JSON.stringify({ mode: 'by_cat', route: routes.by_cat }),
      text: "By Category",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      buttonType: 'menu',
      id: 'by_difficulty_menu_button',
      name: 'byDifficultyMenuButton',
      onClickFunction: onInitGame,
      params: JSON.stringify({ mode: 'by_diff', route: routes.by_diff }),
      text: "By Difficulty",
    }
  ]
}

export default makePlayMenuButtons