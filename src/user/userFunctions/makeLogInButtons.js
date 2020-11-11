const makeLogInButtons = (glyphIndex, onSubmit, onCancel, enableButton) => {
  return [
    {
      name: 'LogInSubmit',
      id: 'log_in_submit',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formBlackCheckMark,
      onClickFunction: onSubmit,
      tooltipText: 'Login',
      type: 'submit',
      enableButton: enableButton,
      value: 'Login'
    },
    {
      name: 'LogInCancel',
      id: 'log_in_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formBlackX,
      onClickFunction: onCancel,
      tooltipText: 'Cancel',
      type: 'reset',
      enableButton: enableButton,
      value: 'Cancel'
    }
  ]
}

export default makeLogInButtons