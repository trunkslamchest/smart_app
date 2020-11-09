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
        <div className='tos_agree_check_box_container'>
          <FormCheckBox
            checkBoxClass='tos_form_check_box_button'
            checkedImageHover={ formGlyphIndex.formWhiteCheckMark }
            checkedImage={ formGlyphIndex.formGreenCheckMark }
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
          checked={ props.checked ? props.checked : false }
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