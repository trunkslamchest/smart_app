const makePlayMenuButtons = (onInitGame, routes) => {
  return [
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      buttonType: 'onMenu',
      id: 'quick_play_menu_button',
      name: 'quickPlayMenuButton',
      onClickFunction: onInitGame,
      params: JSON.stringify({ gameMode: 'quick_play', route: routes.quick_question }),
      text: "Quick Play",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      buttonType: 'onMenu',
      id: 'by_category_menu_button',
      name: 'byCategoryMenuButton',
      onClickFunction: onInitGame,
      params: JSON.stringify({ gameMode: 'by_cat', route: routes.by_cat_select }),
      text: "By Category",
    },
    {
      buttonClass: 'header_menu_button',
      buttonContainerClass: 'header_menu_button_container',
      buttonType: 'onMenu',
      id: 'by_difficulty_menu_button',
      name: 'byDifficultyMenuButton',
      onClickFunction: onInitGame,
      params: JSON.stringify({ gameMode: 'by_diff', route: routes.by_diff_select }),
      text: "By Difficulty",
    }
  ]
}

export default makePlayMenuButtons