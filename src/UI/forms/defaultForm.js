import React from 'react'

import distribFormInputs from './formFunctions/distribFormInputs'

import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './formStyles/defaultForm.css'
import './formStyles/editProfileForm.css'
import './formStyles/editProfileModalForm.css'
import './formStyles/logInForm.css'
import './formStyles/signUpForm.css'
import './formStyles/deleteProfileForm.css'

const DefaultForm = (props) => {

  const distribInputFields = props.inputFields.map((field, index) => {
    let input
    if(Array.isArray(field)){
      input =
        <div className={ props.inputContainerClass || 'default_input_container' } key={ index + field[0].label }>
          { field.map((nField, nIndex) => distribFormInputs(props.formValid, props.errors, props.enableInput, nField, nIndex)) }
          { props.dividers && <div className='divider_medium' /> }
        </div>
    } else {
      input =
        <div className={ props.inputContainerClass || 'default_input_container' } key={ index + field.id }>
          { distribFormInputs(props.formValid, props.errors, props.enableInput, field, index) }
          { props.dividers && <div className='divider_medium' /> }
        </div>
    }
    return input
  })

  return(
    <>
      {(!!props.formHeaderText || !!props.formSubHeaderText) &&
        <div className={ props.formHeaderClass || 'default_form_header' }>
          { !!props.formHeaderText && <h2>{ props.formHeaderText }</h2> }
          { !!props.formSubHeaderText && <h3>{ props.formSubHeaderText }</h3> }
        </div>
      }
      <form
        id={ props.formId }
        name={ props.formName }
        className={ props.formClass || 'default_form_container' }
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