const makeHomeLoggedInButtons = (onStartGame) => {
  return [
    {
      id: 'start_button',
      name: 'startButton',
      onClickFunction: onStartGame,
      text: 'Start',
      tooltipText: [ 'Select A Game Mode and start answering questions.' ]
    }
  ]
}

export default makeHomeLoggedInButtons