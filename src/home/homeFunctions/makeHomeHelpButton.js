const makeHomeHelpButton = (onHelp) => {
  return [
    {
      id: 'help_button',
      name: 'HelpButton',
      onClickFunction: onHelp,
      text: 'Would You Like To Know More?',
      tooltipText: [ 'Information on how to get started' ]
    }
  ]
}

export default makeHomeHelpButton