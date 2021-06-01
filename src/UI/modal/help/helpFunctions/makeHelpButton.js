const makeLogInButtons = (onHideModal) => {
  return [
    {
      id: 'help_modal_button',
      name: 'HelpModalButton',
      onClickFunction: onHideModal,
      text: 'Close This Window',
      type: 'button'
    }
  ]
}

export default makeLogInButtons