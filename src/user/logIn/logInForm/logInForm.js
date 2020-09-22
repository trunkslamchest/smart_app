import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import LogInFormInput from './logInFormInput/logInFormInput'
import LogInFormButtonContainer from './logInFormButtonContainer/logInFormButtonContainer'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import ErrorContainer from '../../../error/errorContainer'

const LogInForm = (props) => {

  const distribErrors = props.auth.errors.map(error => {
    return <ErrorContainer
      key={ props.auth.errors.indexOf(error) }
      error={ error }
    />
  })

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogIn' } />
    </div>

  return(
    <>
      <div className='alt_header'>
        <h3>Log In</h3>
      </div>
      <form
        id='log_in_form'
        name='log_in_form'
        className='log_in_form'
      >
        <div className='log_in_div'>
          <LogInFormInput
            type='text'
            label='Email'
            id='email'
            name='email'
            disabled={ !props.enableInput }
            onChange={ props.onChange }
            value={ props.email }
          />
          <br />
          <LogInFormInput
            type='password'
            label='Password'
            id='password'
            name='password'
            disabled={ !props.enableInput }
            onChange={ props.onChange }
            value={ props.password }
          />
        </div>
        { distribErrors }
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