const makeHomeLoggedOutButtons = (onStartGame, route) => {
  return [
    {
      classType: 'home_start_button',
      clickFunction: onStartGame,
      id: 'start_button',
      name: 'startButton',
      text: 'Start',
      textContainerClass: 'home_button_text_container',
      route: route,
      wrapperClass: 'home_button_wrapper'
    }
  ]
}

export default makeHomeLoggedOutButtons