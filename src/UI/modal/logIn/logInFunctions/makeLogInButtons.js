const makeLogInButtons = (glyphIndex, onSubmit, onReset, onCancel) => {
  return [
    {
      id: 'log_in_submit',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formGreyCheckMark,
      name: 'LogInSubmit',
      onClickFunction: onSubmit,
      tooltipText: [ 'Login' ],
      type: 'submit',
      value: 'Login'
    },
    {
      id: 'log_in_reset',
      image: glyphIndex.formWhiteReset,
      imageHover: glyphIndex.formGreyReset,
      name: 'LogInReset',
      onClickFunction: onReset,
      tooltipText: [ 'Reset' ],
      type: 'button',
      value: 'Reset'
    },
    {
      id: 'log_in_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formGreyX,
      name: 'LogInCancel',
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'reset',
      value: 'Cancel'
    }
  ]
}

export default makeLogInButtons