import React from 'react'
import { connect } from 'react-redux'
import { check } from '../../../utility/paths'
import { Link } from 'react-router-dom'
import {
  signup,
  authStart,
  clearAuthStatus,
  clearAuthErrors
} from '../../../store/actions/actionIndex'

import makeSignUpFormInputs from './signUpFunctions/makeSignUpFormInputs'
import makeSignUpButtons from './signUpFunctions/makeSignUpButtons'
import checkFunctions from '../../../utility/checkFunctions'
import validateSignUp from '../../../utility/validation/validateSignUp'

import BaseDynamicBar from '../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../loading/smallLoadingSpinner/smallLoadingSpinner'

import ModalHeaderCentered from '../../components/headers/modalHeaderCentered/modalHeaderCentered'
import Modal from '../../modal/modal'
import DefaultForm from '../../forms/defaultForm'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './signUp.css'
import './signUpResponse.css'

class SignUp extends React.Component {

  state = {
    email: '',
    enableButton: true,
    enableInput: true,
    errors: {},
    form: { valid: false, pending: false },
    password: '',
    tos: false,
    user_name: '',
    validationLoading: false
  }

  componentDidUpdate() {
    if(this.props.authStatus === 'fail' && !!this.props.authErrors.length && !Object.values(this.state.errors).length){
      let email = []
      if(this.props.authErrors.length) this.props.authErrors.forEach(error => email.push(error) )
      this.setState({ errors: { email: email }, validationLoading: false, enableButton: true, enableInput: true })
      this.props.onClearAuthErrors()
      this.props.onClearAuthStatus()
    }
  }

  componentWillUnmount(){
    this.setState({
      email: '',
      enableButton: true,
      enableInput: true,
      errors: {},
      form: { valid: false, pending: false },
      password: '',
      tos: false, user_name: ''
    })
  }

  onChange = (event) => {
    event.preventDefault()
    this.setState({[event.target.id]: event.target.value})
  }

  onChecked = (event) => {
    event.preventDefault()
    let flipChecked = !this.state.tos
    this.setState({ tos: flipChecked })
  }

  onSubmit = (event) => {
    event.preventDefault()
    if(!!this.props.authErrors.length) this.props.onClearAuthErrors()
    this.setState({ errors: {}, form: { valid: false, pending: true }, validationLoading: true, enableButton: false, enableInput: false })
    let authCheck = validateSignUp(this.state.user_name, this.state.email, this.state.password, this.state.tos)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.checkUserExists()
    else {
      this.setState({
        validationLoading: false,
        enableButton: true,
        enableInput: true
      })
    }
  }

  checkUserExists = () => {
    checkFunctions('checkUserName', check.user_name, { user_name: this.state.user_name, type: 'signUp' })
    .then(userNameRes => {
      if(userNameRes.valid) this.onValidateSignUp()
      else {
        this.setState({
          form: {
            valid: false,
            user_name: { valid: userNameRes.valid, errors: [ userNameRes.errors ] },
            pending: false
          },
          validationLoading: false,
          enableButton: true,
          enableInput: true
        })
      }
    })
  }

  onValidateSignUp = () => {
    if(!this.state.form.pending) {
      this.props.onAuthStart('signUp', {
        displayName: this.state.user_name,
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  onReset = () => {
    if(this.state.email.length || this.state.password.length || this.state.user_name.length ||
       this.state.form.email || this.state.form.password || this.state.form.user_name || this.state.form.tos)
    this.clearLocalState()
    if(!!this.props.authErrors.length) this.props.onClearAuthErrors()
    if(this.props.authStatus) this.props.onClearAuthStatus()
  }

  onCancel = () => {
    this.onReset()
    this.props.onSignUpModal(false)
  }

  clearLocalState = () => {
    this.setState({
      email: '',
      enableButton: true,
      enableInput: true,
      form: { valid: false, pending: false },
      password: '',
      tos: false,
      user_name: ''
    })
  }

  render(){
    const loading =
      <div className='loading_wrapper'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogIn' } />
      </div>

    const tosText =
      <>
        I acknowledge that I have read and agree to the <Link to='/terms_of_service' target='_blank'>Terms and Conditions</Link> and <Link to='/privacy' target='_blank'>Privacy Policy</Link> statements supplied by SmartApp™
      </>

    const signUpFormInputs = makeSignUpFormInputs(
      this.state.tos,
      this.state.email,
      this.onChange,
      this.onChecked,
      this.state.password,
      tosText,
      this.state.user_name
    )

    const signUpButtons = makeSignUpButtons(glyphIndex, this.onSubmit, this.onReset, this.onCancel)

    return (
      <Modal
        modalClass={ 'sign_up_modal' }
        showModal={ this.props.modalSignUp }
      >
        <ModalHeaderCentered header_text='Create New Account' />
        <div className='sign_up_wrapper'>
          { (this.props.authLoading || this.state.validationLoading) && loading }
            <DefaultForm
              buttonRow={ true }
              inputFields={ signUpFormInputs }
              inputContainerClass={ 'sign_up_input_container' }
              formButtons={ signUpButtons }
              formClass={ 'sign_up_form' }
              formId={ 'sign_up_form' }
              formName={ 'signUpForm' }
              enableButton={ this.state.enableButton }
              enableInput={ this.state.enableInput }
              errors={ this.state.errors }
              formValid={ this.state.form }
            />
        </div>
      </Modal>
    )
  }
}

const store = (store) => {
  return {
    authErrors: store.auth.errors,
    authLoading: store.auth.loading,
    authStatus: store.auth.status,
    modalSignUp: store.modal.signup,

    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onSignUpModal: (bool) => dispatch(signup(bool)),
    onAuthStart: (type, obj, props) => dispatch(authStart(type, obj, props)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(store, dispatch)(SignUp)