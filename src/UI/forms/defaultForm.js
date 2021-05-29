import React from 'react'

import distribFormInputs from './formFunctions/distribFormInputs'

import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './formStyles/defaultForm.css'
import './formStyles/editProfileForm.css'
import './formStyles/editProfileModalForm.css'
import './formStyles/logInForm.css'
import './formStyles/signUpForm.css'
import './formStyles/deleteProfileForm.css'
import './defaultFormResponse.css'

const DefaultForm = (props) => {

  let componentClasses = {
    form: props.formClass || 'default_form_container',
    formHeader: props.formHeaderClass || 'default_form_header',
    inputContainer: props.inputContainerClass || 'default_input_container'
  }

  const distribInputFields = props.inputFields.map((field, index) => {
    let input
    componentClasses.inputContainer = index < props.inputFields.length - 1 ? componentClasses.inputContainer : `${componentClasses.inputContainer}_last`
    if(Array.isArray(field)){
      input =
        <div className={ componentClasses.inputContainer } key={ index.toString() + field[0].label }>
          { field.map((nField, nIndex) => distribFormInputs(props.formValid, props.errors, props.enableInput, nField, nIndex)) }
        </div>
    } else {
      input =
        <div className={ componentClasses.inputContainer } key={ index.toString() + field.id }>
          { distribFormInputs(props.formValid, props.errors, props.enableInput, field, index) }
        </div>
    }
    return input
  })

  return(
    <>
      {(!!props.formHeaderText || !!props.formSubHeaderText) &&
        <div className={ componentClasses.formHeader }>
          { !!props.formHeaderText && <h2>{ props.formHeaderText }</h2> }
          { !!props.formSubHeaderText && <h3>{ props.formSubHeaderText }</h3> }
        </div>
      }
      <form
        id={ props.formId }
        name={ props.formName }
        className={ componentClasses.form }
      >
        { distribInputFields }
        <DefaultButtonsContainer
          buttons={ props.formButtons }
          buttonClass={ props.buttonClass }
          buttonRow={ props.buttonRow }
          containerClass={ props.buttonContainerClass }
          enableButton={ props.enableButton }
          tooltipClass={ props.tooltipClass }
        />
      </form>
    </>
  )
}

export default DefaultForm