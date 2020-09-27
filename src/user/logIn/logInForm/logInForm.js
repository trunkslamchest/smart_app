import React from 'react'

import { connect } from 'react-redux'

import LogInFormInput from './logInFormInput/logInFormInput'
import LogInFormButtonContainer from './logInFormButtonContainer/logInFormButtonContainer'
import LogInFormErrorItem from './logInFormErrorItem/logInFormErrorItem'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

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

  return(
    <>
      <div className='log_in_header'>
        <h3>Log In</h3>
      </div>
      <form
        id='log_in_form'
        name='log_in_form'
        className='log_in_form'
      >
        <div className='log_in_div'>
          <LogInFormInput
            disabled={ !props.enableInput }
            id='email'
            label='Email'
            name='email'
            onChange={ props.onChange }
            placeholder='Email...'
            type='text'
            value={ props.email }
          />
          { !!emailErrors.length ? <div className='log_in_error_container'>{ distribEmailErrors }</div> : <br /> }
        </div>
        <div className='log_in_div'>
          <LogInFormInput
            disabled={ !props.enableInput }
            id='password'
            label='Password'
            name='password'
            onChange={ props.onChange }
            placeholder='Password...'
            type='password'
            value={ props.password }
          />
          { !!passwordErrors.length ? <div className='log_in_error_container'>{ distribPasswordErrors }</div> : <br /> }
        </div>
        { !!allOtherErrors.length && <div className='log_in_error_container'>{ distribAllOtherErrors }</div> }
        { props.auth.loading && loading }
        <LogInFormButtonContainer
          enableButton={ props.enableButton }
          onSubmit={ props.onSubmit }
          onCancel={ props.onCancel }
        />
      </form>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(LogInForm)