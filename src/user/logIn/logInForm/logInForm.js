import React from 'react'
import { connect } from 'react-redux'

import makeLogInButtons from '../../userFunctions/makeLogInButtons'

import LogInFormInput from './logInFormInput/logInFormInput'
import LogInFormErrorItem from './logInFormErrorItem/logInFormErrorItem'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './logInForm.css'

const LogInForm = (props) => {

  let emailErrors = [], distribEmailErrors,
      passwordErrors = [], distribPasswordErrors,
      allOtherErrors = [], distribAllOtherErrors

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogIn' } />
    </div>

  if(props.auth.status === 'fail'){
    if(props.auth.errors[0].code === 421) props.auth.errors.forEach(error => emailErrors.push(error))
    else if(props.auth.errors[0].code === 423) props.auth.errors.forEach(error => passwordErrors.push(error))
    else props.auth.errors.forEach(error => allOtherErrors.push(error))
  }

  if(!props.form.valid) {
    if(!!props.form.email && props.form.email.errors) props.form.email.errors.forEach(error => emailErrors.push(error))
    if(!!props.form.password && props.form.password.errors) props.form.password.errors.forEach(error => passwordErrors.push(error))
  }

  if(!!emailErrors.length) distribEmailErrors = emailErrors.map(error => <LogInFormErrorItem key={ emailErrors.indexOf(error) } error={ error } /> )
  if(!!passwordErrors.length) distribPasswordErrors = passwordErrors.map(error => <LogInFormErrorItem key={ passwordErrors.indexOf(error) } error={ error } /> )
  if(!!allOtherErrors.length) distribAllOtherErrors = allOtherErrors.map(error => <LogInFormErrorItem key={ allOtherErrors.indexOf(error) } error={ error } /> )

  const formInputs = [
    { errors: emailErrors, distribErrors: distribEmailErrors, id: 'email_input', label: 'Email Address', name: 'email', placeholder: 'Email', type: 'text', value: props.email },
    { errors: passwordErrors, distribErrors: distribPasswordErrors, id: 'password_input', label: 'Password', name: 'password', placeholder: 'Password', type: 'password', value: props.password }
  ]

  const distribFormInputs = formInputs.map((input, index) => {
    return(
      <LogInFormInput
        disabled={ !props.enableInput }
        distribErrors={ input.distribErrors }
        errors={ input.errors }
        id={ input.id }
        key={ index }
        label={ input.label }
        name={ input.name }
        onChange={ props.onChange }
        placeholder={ input.placeholder }
        type={ input.type }
        value={ input.value }
      />
    )
  })

  let logInButtons = makeLogInButtons(glyphIndex, props.onSubmit, props.onCancel)

  return(
    <form
      id='log_in_form'
      name='log_in_form'
      className='log_in_form'
    >
      { distribFormInputs }
      { !!allOtherErrors.length && <div className='log_in_error_container'>{ distribAllOtherErrors }</div> }
      { props.auth.loading && loading }
      <DefaultButtonsContainer
        buttons={ logInButtons }
        buttonClass={ 'modal_button' }
        containerClass={ 'modal_button_container' }
        enableButton={ props.enableButton }
        tooltipClass={ 'modal_button_tooltip' }
      />
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(LogInForm)