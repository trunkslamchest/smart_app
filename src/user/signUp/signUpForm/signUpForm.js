import React from 'react'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import SignUpFormInput from './signUpFormInput/signUpFormInput'
import SignUpFormButtonContainer from './signUpFormButtonContainer/signUpFormButtonContainer'
import SignUpFormErrorItem from './signUpFormErrorItem/signUpFormErrorItem'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import './signUpForm.css'

const SignUpForm = (props) => {

  let userNameErrors = [], distribUserNameErrors,
      emailErrors = [], distribEmailErrors,
      passwordErrors = [], distribPasswordErrors,
      tosErrors = [], distribTOSErrors,
      allOtherErrors = [], distribAllOtherErrors

  // const signUpFormRef = React.createRef()

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authSignUp' } />
    </div>

  if(props.auth.status === 'fail'){
    if(props.auth.errors[0].code === 422) props.auth.errors.forEach(error => emailErrors.push(error))
    else props.auth.errors.forEach(error => allOtherErrors.push(error))
  }

  if(!props.form.valid) {
    if(!!props.form.user_name && props.form.user_name.errors) props.form.user_name.errors.forEach(user_name => userNameErrors.push(user_name))
    if(!!props.form.email && props.form.email.errors) props.form.email.errors.forEach(error => emailErrors.push(error))
    if(!!props.form.password && props.form.password.errors) props.form.password.errors.forEach(error => passwordErrors.push(error))
    if(!!props.form.tos && props.form.tos.errors) props.form.tos.errors.forEach(error => tosErrors.push(error))
  }

  if(!!userNameErrors.length) distribUserNameErrors = userNameErrors.map(error =>  <SignUpFormErrorItem key={ userNameErrors.indexOf(error) } error={ error } /> )
  if(!!emailErrors.length) distribEmailErrors = emailErrors.map(error => <SignUpFormErrorItem key={ emailErrors.indexOf(error) } error={ error } /> )
  if(!!passwordErrors.length) distribPasswordErrors = passwordErrors.map(error => <SignUpFormErrorItem key={ passwordErrors.indexOf(error) } error={ error } /> )
  if(!!tosErrors.length) distribTOSErrors = tosErrors.map(error => <SignUpFormErrorItem key={ tosErrors.indexOf(error) } error={ error } /> )
  if(!!allOtherErrors.length) distribAllOtherErrors = allOtherErrors.map(error => <SignUpFormErrorItem key={ allOtherErrors.indexOf(error) } error={ error } /> )

  const onSubmit = (event) => {
    // if(props.auth.errors.length === 0) signUpFormRef.current.scrollTop = 0
    props.onSubmit(event)
  }

  return(
    <>
      <div className='sign_up_header'>
        <h3>Create New Account</h3>
      </div>
      <form
        id='sign_up_form'
        name='sign_up_form'
        className='sign_up_form'
        // ref={ signUpFormRef }
      >
        <div className='sign_up_div'>
          <SignUpFormInput
            type='text'
            id='user_name'
            name='user_name'
            placeholder='User Name'
            disabled={ !props.enableInput }
            onChange={ props.onChange }
            value={ props.user_name }
          />
          { !!userNameErrors.length ? <div className='sign_up_error_container'>{ distribUserNameErrors }</div> : <br /> }
        </div>
        <div className='sign_up_div'>
          <SignUpFormInput
            type='text'
            id='email'
            name='email'
            placeholder='Email Address'
            disabled={ !props.enableInput }
            onChange={props.onChange }
            value={ props.email }
          />
          { !!emailErrors.length ? <div className='sign_up_error_container'>{ distribEmailErrors }</div> : <br /> }
        </div>
        <div className='sign_up_div'>
          <SignUpFormInput
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            disabled={ !props.enableInput }
            onChange={ props.onChange }
            value={ props.password }
          />
          { !!passwordErrors.length ? <div className='sign_up_error_container'>{ distribPasswordErrors }</div> : <br /> }
        </div>
        <div className='tos_agree_div'>
          <div className='tos_agree_statement'>
            <SignUpFormInput
              type='checkbox'
              id='TOS_agreement'
              name='TOS_agreement'
              className='TOS_check'
              disabled={ !props.enableInput }
              checked={ props.TOSagreement }
              onChange={ props.onChecked }
            />
            <p>I acknowledge that I have read and agree to the <Link to='/terms_of_service' target='_blank'>Terms and Conditions</Link> and <Link to='/privacy' target='_blank'>Privacy Policy</Link> statements supplied by SmartApp™.</p>
          </div>
          { !!tosErrors.length ? <div className='sign_up_error_container'>{ distribTOSErrors }</div> : <br /> }
        </div>
        { !!allOtherErrors.length && <div className='sign_up_error_container'>{ distribAllOtherErrors }</div> }
      </form>
      { props.auth.loading && loading }
      <SignUpFormButtonContainer
        enableButton={ props.enableButton }
        onSubmit={ onSubmit }
        onReset={ props.onReset }
        onCancel={ props.onCancel }
      />
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

export default connect(mapStateToProps)(SignUpForm)