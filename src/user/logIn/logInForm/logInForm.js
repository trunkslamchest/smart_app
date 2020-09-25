import React from 'react'

import { connect } from 'react-redux'

import LogInFormInput from './logInFormInput/logInFormInput'
import LogInFormButtonContainer from './logInFormButtonContainer/logInFormButtonContainer'
import LogInFormErrorItem from './logInFormErrorItem/logInFormErrorItem'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import './logInForm.css'

const LogInForm = (props) => {

  let distribEmailErrors,
      distribPasswordErrors,
      distribAuthErrors

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogIn' } />
    </div>

  if(props.auth.status === 'fail'){
    distribAuthErrors = props.auth.errors.map(error => {
      return <LogInFormErrorItem
        key={ props.auth.errors.indexOf(error) }
        error={ error }
      />
    })
  }

  if(!props.form.valid) {
    if(!!props.form.email && props.form.email.errors){
      distribEmailErrors = props.form.email.errors.map(error => {
        return <LogInFormErrorItem
          key={ props.form.email.errors.indexOf(error) }
          error={ error }
        />
      })
    }
    if(!!props.form.password && props.form.password.errors){
      distribPasswordErrors = props.form.password.errors.map(error => {
        return <LogInFormErrorItem
          key={ props.form.password.errors.indexOf(error) }
          error={ error }
        />
      })
    }
  }

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
          { !!props.form.email && props.form.email.errors.length ? <div className='log_in_error_container'>{ distribEmailErrors }</div> : <br /> }
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
        { !!props.form.password && props.form.password.errors.length ? <div className='log_in_error_container'>{ distribPasswordErrors }</div> : <br /> }
        </div>
        { props.auth.status === 'fail' && props.auth.errors.length ? <div className='log_in_error_container'>{ distribAuthErrors }</div> : <br /> }
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
    auth: state.auth,
    modal: state.modal,
    user: state.user,
    question: state.question
  }
}

export default connect(mapStateToProps)(LogInForm)