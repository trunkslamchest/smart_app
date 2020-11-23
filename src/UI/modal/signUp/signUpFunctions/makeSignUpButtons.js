const makeSignUpButtons = (glyphIndex, onSubmit, onReset, onCancel) => {
  return [
    {
      id: 'sign_up_form_submit',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formBlackCheckMark,
      name: 'SignUpFormSubmit',
      onClickFunction: onSubmit,
      tooltipText: [ 'Sign Up' ],
      type: 'submit',
      value: 'Create Account'
    },
    {
      id: 'sign_up_form_reset',
      image: glyphIndex.formWhiteReset,
      imageHover: glyphIndex.formBlackReset,
      name: 'SignUpFormReset',
      onClickFunction: onReset,
      tooltipText: [ 'Reset' ],
      type: 'button',
      value: 'Reset'
    },
    {
      id: 'sign_up_form_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formBlackX,
      name: 'SignUpFormCancel',
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'button',
      value: 'Cancel'
    }
  ]
}

export default makeSignUpButtons