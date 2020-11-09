import React from 'react'

import SignUpFormButton from '../signUpFormButton/signUpFormButton'

import formGlyphIndex from '../../../../assets/glyphs/formGlyphIndex'

import './signUpFormButtonContainer.css'

const SignUpFormButtonContainer = (props) => {

  const signUpButtons = [
    {
      enableButton: props.enableButton,
      id: 'sign_up_form_submit',
      image: formGlyphIndex.formWhiteCheckMark,
      imageHover: formGlyphIndex.formBlackCheckMark,
      name: 'SignUpFormSubmit',
      onClickFunction: props.onSubmit,
      tooltipText: 'Sign Up',
      type: 'submit',
      value: 'Create Account'
    },
    {
      enableButton: props.enableButton,
      id: 'sign_up_form_reset',
      image: formGlyphIndex.formWhiteReset,
      imageHover: formGlyphIndex.formBlackReset,
      name: 'SignUpFormReset',
      onClickFunction: props.onReset,
      tooltipText: 'Reset',
      type: 'button',
      value: 'Reset'
    },
    {
      enableButton: props.enableButton,
      id: 'sign_up_form_cancel',
      image: formGlyphIndex.formWhiteX,
      imageHover: formGlyphIndex.formBlackX,
      name: 'SignUpFormCancel',
      onClickFunction: props.onCancel,
      tooltipText: 'Cancel',
      type: 'button',
      value: 'Cancel'
    }
  ]

  const distribSignUpButtons = signUpButtons.map((button, index) => {
    return(
      <SignUpFormButton
        type={ button.type }
        id={ button.id }
        image={ button.image }
        imageHover={ button.imageHover }
        key={ index }
        name={ button.name }
        enableButton={ props.enableButton }
        onClickFunction={ button.onClickFunction }
        tooltipText={ button.tooltipText }
        value={ button.value }
      />
    )
  })

  return(
    <div className='sign_up_buttons_container'>

      { distribSignUpButtons }

      {/* <SignUpFormButton
        type='submit'
        id='sign_up_form_submit'
        name='sign_up_form_submit'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onSubmit }
        value='Create Account'
      /> */}
      {/* <SignUpFormButton
        type='reset'
        id='sign_up_form_reset'
        name='sign_up_form_reset'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onReset }
        value='Reset'
      /> */}
      {/* <SignUpFormButton
        type='button'
        id='sign_up_form_cancel'
        name='sign_up_form_cancel'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onCancel }
        value='Cancel'
      /> */}
    </div>
  )
}

export default SignUpFormButtonContainer