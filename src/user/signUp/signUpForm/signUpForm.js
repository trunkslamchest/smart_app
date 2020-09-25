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

  let distribUserNameErrors,
      distribEmailErrors,
      distribPasswordErrors,
      distribTOSErrors,
      distribAuthErrors

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authSignUp' } />
    </div>

  if(props.auth.status === 'fail'){
    distribAuthErrors = props.auth.errors.map(error => {
      return <SignUpFormErrorItem
        key={ props.auth.errors.indexOf(error) }
        error={ error }
      />
    })
  }

  if(!props.form.valid) {
    if(!!props.form.user_name && props.form.user_name.errors){
      distribUserNameErrors = props.form.user_name.errors.map(error => {
        return <SignUpFormErrorItem
          key={ props.form.user_name.errors.indexOf(error) }
          error={ error }
        />
      })
    }
    if(!!props.form.email && props.form.email.errors){
      distribEmailErrors = props.form.email.errors.map(error => {
        return <SignUpFormErrorItem
          key={ props.form.email.errors.indexOf(error) }
          error={ error }
        />
      })
    }
    if(!!props.form.password && props.form.password.errors){
      distribPasswordErrors = props.form.password.errors.map(error => {
        return <SignUpFormErrorItem
          key={ props.form.password.errors.indexOf(error) }
          error={ error }
        />
      })
    }
    if(!!props.form.tos && props.form.tos.errors){
      distribTOSErrors = props.form.tos.errors.map(error => {
        return <SignUpFormErrorItem
          key={ props.form.tos.errors.indexOf(error) }
          error={ error }
        />
      })
    }
  }

  const signUpFormRef = React.createRef()

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
        ref={ signUpFormRef }
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
          { !!props.form.user_name && props.form.user_name.errors.length ? <div className='sign_up_error_container'>{ distribUserNameErrors }</div> : <br /> }
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
          { !!props.form.email && props.form.email.errors.length ? <div className='sign_up_error_container'>{ distribEmailErrors }</div> : <br /> }
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
          { !!props.form.password && props.form.password.errors.length ? <div className='sign_up_error_container'>{ distribPasswordErrors }</div> : <br /> }
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
          { !!props.form.tos && !!props.form.tos.errors.length && <div className='sign_up_error_container'>{ distribTOSErrors }</div> }
        </div>
      </form>
      { props.auth.status === 'fail' && props.auth.errors.length ? <div className='sign_up_error_container'>{ distribAuthErrors }</div> : <br /> }
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