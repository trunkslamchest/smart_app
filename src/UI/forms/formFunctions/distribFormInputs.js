import React from 'react'

import DefaultFormInput from '../formInputs/defaultFormInput'
import DefaultFormError from '../formErrors/defaultFormError'

import '../formInputs/inputStyles/default/defaultFormInput.css'
import '../formInputs/inputStyles/default/defaultFormImageButtonLabel.css'
import '../formInputs/inputStyles/default/defaultFormSelect.css'
import '../formInputs/inputStyles/editProfile/editProfileInput.css'
import '../formInputs/inputStyles/editProfile/editProfileSelect.css'
import '../formInputs/inputStyles/editProfile/editProfileImageButtonLabel.css'
import '../formInputs/inputStyles/editProfile/editProfileModalInput.css'
import '../formInputs/inputStyles/logIn/logInInput.css'
import '../formInputs/inputStyles/signUp/signUpInput.css'
import '../formInputs/inputStyles/signUp/signUpCheckBoxTOS.css'
import '../formInputs/inputStyles/deleteProfile/deleteProfileInput.css'

const distribFormInputs = (formValid, errors, enableInput, field, index) => {
  let fieldValue = field.val

  if(field.type === 'text' || field.type === 'textarea') if(field.val === 'null') fieldValue = null

  return (
    <>
    { !!field.label && <h3>{ field.label }</h3> }
    <div
      className={ field.inputSubContainerClass || 'default_input_sub_container' }
      key={ index.toString() + (field.label || field.id) }
    >
      { Object.values(field).length > 2 &&
        <>
          <DefaultFormInput
            accept={ field.accept }
            buttonText={ field.buttonText }
            enableInput={ enableInput }
            checkBoxContainerClass={ field.checkBoxContainerClass }
            checkBoxButtonContainerClass={ field.checkBoxButtonContainerClass }
            checkBoxClass={ field.checkBoxClass }
            checkBoxImgClass={ field.checkBoxImgClass }
            checkBoxDisabledClass={ field.checkBoxDisabledClass }
            className={ field.inputClass }
            label={ field.label }
            id={ field.id }
            imgAlt={ field.imgAlt }
            imgId={ field.imgId }
            imgClass={ field.imgClass }
            imageSubContainerClass={ field.imageSubContainerClass }
            imgName={ field.imgName }
            imgTitle={ field.imgTitle }
            img={ field.img }
            inputClass={ field.inputClass }
            key={ (index + 10).toString() + (field.label || field.id) }
            labelClass={ field.labelClass }
            max={ field.max }
            min={ field.min }
            multiple={ field.multiple }
            name={ field.name }
            onChange={ field.onChange }
            options={ field.options }
            placeholder={ field.placeholder }
            rows={ field.rows }
            selectClass={ field.selectClass }
            text={ field.text }
            type={ field.type }
            value={ fieldValue }
          />
          { formValid[field.id] && !!formValid[field.id].errors.length &&
            <div className={ field.errorContainerClass || "default_form_error_container"}>
              { formValid[field.id].errors.map((error, index) => <DefaultFormError key={ index } error={ error } errorClass={ field.errorClass || 'default_form_error_item_container' } />) }
            </div>
          }
          { errors[field.id] &&
            <div className={ field.errorContainerClass || "default_form_error_container"}>
              { errors[field.id].map((error, index) => <DefaultFormError key={ index } error={ error } errorClass={ field.errorClass || 'default_form_error_item_container' } />) }
            </div>
          }
        </>
      }
    </div>
    </>
  )
}

export default distribFormInputs