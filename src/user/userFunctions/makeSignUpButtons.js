const makeSignUpButtons = (formGlyphIndex, onSubmit, onReset, onCancel) => {
  return [
    {
      id: 'sign_up_form_submit',
      image: formGlyphIndex.formWhiteCheckMark,
      imageHover: formGlyphIndex.formBlackCheckMark,
      name: 'SignUpFormSubmit',
      onClickFunction: onSubmit,
      tooltipText: [ 'Sign Up' ],
      type: 'submit',
      value: 'Create Account'
    },
    {
      id: 'sign_up_form_reset',
      image: formGlyphIndex.formWhiteReset,
      imageHover: formGlyphIndex.formBlackReset,
      name: 'SignUpFormReset',
      onClickFunction: onReset,
      tooltipText: [ 'Reset' ],
      type: 'button',
      value: 'Reset'
    },
    {
      id: 'sign_up_form_cancel',
      image: formGlyphIndex.formWhiteX,
      imageHover: formGlyphIndex.formBlackX,
      name: 'SignUpFormCancel',
      onClickFunction: onCancel,
      tooltipText: [ 'Cancel' ],
      type: 'button',
      value: 'Cancel'
    }
  ]
}

export default makeSignUpButtons