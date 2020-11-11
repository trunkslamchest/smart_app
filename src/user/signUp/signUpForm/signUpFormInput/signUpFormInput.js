import React from 'react'

import formGlyphIndex from '../../../../assets/glyphs/formGlyphIndex'

import FormCheckBox from '../../../../UI/checkboxes/formCheckBox/formCheckBox'

import './signUpFormInput.css'
import './signUpFormTOS.css'

const SignUpFormInput = (props) => {

  let inputField

  if(props.type === 'checkbox')
    inputField =
      <>
        <div className={ props.disabled ? 'tos_agree_check_box_container_disabled' : 'tos_agree_check_box_container' }>
          <FormCheckBox
            checkBoxClass={ props.disabled ? 'tos_form_check_box_button_disabled' : 'tos_form_check_box_button'}
            checkedImageHover={ formGlyphIndex.formWhiteCheckMark }
            checkedImage={ formGlyphIndex.formGreenCheckMark }
            disabled={ props.disabled }
            id={ props.id }
            name={ props.name }
            onChecked={ props.onChange }
            status={ props.checked ? props.checked : false }
            uncheckedImageHover={ formGlyphIndex.formWhiteX }
            uncheckedImage={ formGlyphIndex.formRedX }
          />
        </div>
        { props.text }
      </>
  else
    inputField =
      <>
        <input
          className={ props.className }
          disabled={ props.disabled }
          id={ props.id }
          name={ props.name }
          placeholder={ props.placeholder ? props.placeholder : null }
          onChange={ props.onChange }
          type={ props.type }
          value={ props.value ? props.value : '' }
        />
        { !!props.text && props.text }
      </>

  return(
    <div className={ props.containerClass }>
      <div className={ props.subContainerClass }>
        { inputField }
      </div>
      { !!props.errors.length && <div className='sign_up_error_container'>{ props.distribErrors }</div> }
    </div>
  )
}

export default SignUpFormInput