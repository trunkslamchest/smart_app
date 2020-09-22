import React from 'react'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import SignUpFormInput from './signUpFormInput/signUpFormInput'
import SignUpFormButtonContainer from './signUpFormButtonContainer/signUpFormButtonContainer'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'


import ErrorContainer from '../../../error/errorContainer'

import './signUpForm.css'

const SignUpForm = (props) => {

  const signUpFormRef = React.createRef()

  const onSubmit = (event) => {
    if(props.errors.length === 0) signUpFormRef.current.scrollTop = 0
    props.onSubmit(event)
  }

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authSignUp' } />
    </div>

  return(
    <>
      <div className='alt_header'>
        <h3>Create New Account</h3>
      </div>
      <form
        id='sign_up_form'
        name='sign_up_form'
        className='sign_up_form'
        ref={signUpFormRef}
      >
        <div className='sign_up_div'>
          <SignUpFormInput
            type='text'
            id='user_name'
            name='user_name'
            placeholder='User Name'
            onChange={props.onChange}
            value={props.user_name}
          />
          {props.errors.user_name ? <ErrorContainer errors={props.errors.user_name} /> : null }
          <SignUpFormInput
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            onChange={props.onChange}
            value={props.password}
          />
          {props.errors.password ? <ErrorContainer errors={props.errors.password} /> : null }
          <SignUpFormInput
            type='text'
            id='email'
            name='email'
            placeholder='Email Address'
            onChange={props.onChange}
            value={props.email}
          />
          {props.errors.email ? <ErrorContainer errors={props.errors.email} /> : null }
        </div>
        <hr />
        <div className='tos_agree_div'>
          <SignUpFormInput
            type='checkbox'
            id='TOS_agreement'
            name='TOS_agreement'
            className='TOS_check'
            checked={props.TOSagreement}
            onChange={props.onChecked}
          />
          I acknowledge that I have read and agree to the <Link to='/terms_of_service' target='_blank'>Terms and Conditions</Link> and <Link to='/privacy' target='_blank'>Privacy Policy</Link> statelments supplied by this_project.com
        </div>
        <hr />
      </form>
      { props.auth.loading && loading }
      <SignUpFormButtonContainer
        onSubmit={onSubmit}
        onReset={props.onReset}
        onCancel={props.onCancel}
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