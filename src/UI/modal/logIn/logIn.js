import React from 'react'
import { connect } from 'react-redux'
import {
  login,
  authStart,
  clearAuthStatus,
  clearAuthErrors
} from '../../../store/actions/actionIndex'

import makeLogInFormInputs from './logInFunctions/makeLogInFormInputs'
import makeLogInButtons from './logInFunctions/makeLogInButtons'
import validateLogIn from '../../../utility/validation/validateLogIn'

import BaseDynamicBar from '../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../loading/smallLoadingSpinner/smallLoadingSpinner'

import ModalHeaderCentered from '../../components/headers/modalHeaderCentered/modalHeaderCentered'
import Modal from '../../modal/modal'
import DefaultForm from '../../forms/defaultForm'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './logIn.css'
import './logInResponse.css'

class LogIn extends React.Component {

  state = {
    email: '',
    enableButton: true,
    enableInput: true,
    errors: {},
    form: { valid: false, pending: false },
    password: '',
    validationLoading: false
  }

  componentDidUpdate() {
    if(this.props.authStatus === 'fail' && !!this.props.authErrors.length && !Object.values(this.state.errors).length){
      let email = [], password = []
      if(this.props.authErrors[0].code === 421) this.props.authErrors.forEach(error => email.push(error) )
      else if(this.props.authErrors[0].code === 423) this.props.authErrors.forEach(error => password.push(error) )
      else this.props.authErrors.forEach(error => password.push(error) )
      this.setState({ errors: { email: email, password: password, }, validationLoading: false, enableButton: true, enableInput: true })
      this.props.onClearAuthErrors()
      this.props.onClearAuthStatus()
    }
  }

  componentWillUnmount(){ this.clearLocalState() }

  onChange = (event) => { this.setState( { [event.target.id]: event.target.value } ) }

  onSubmit = (event) => {
    event.preventDefault()
    if(!!this.props.authErrors.length) this.props.onClearAuthErrors()
    this.setState({ errors: {}, form: { valid: false, pending: true }, validationLoading: true, enableButton: false, enableInput: false })
    let authCheck = validateLogIn(this.state.email, this.state.password)
    this.setState({ form: authCheck })
    if(authCheck.valid) {
      this.onValidateLogIn(authCheck)
    } else {
      this.setState({
        validationLoading: false,
        enableButton: true,
        enableInput: true
      })
    }
  }

  onValidateLogIn = () => {
    if(!this.state.form.pending) {
      this.props.onAuthStart('logIn', {
        email: this.state.email,
        password: this.state.password
      })
    }
  }

  onReset = () => {
    if(this.state.email.length || this.state.password.length || this.state.form.email || this.state.form.password) this.clearLocalState()
    if(!!this.props.authErrors.length) {
      this.props.onClearAuthErrors()
      this.props.onClearAuthStatus()
    }
  }

  onCancel = () => {
    this.onReset()
    this.props.onLogInModal(false)
    if(this.props.authErrors.length) this.props.onClearAuthErrors()
    if(this.props.authStatus) this.props.onClearAuthStatus()
  }

  clearLocalState = () => {
    this.setState({
      email: '',
      validationLoading: false,
      enableButton: true,
      enableInput: true,
      errors: {},
      form: { valid: false, pending: false },
      password: ''
    })
  }

  render(){
    const loading =
      <div className='loading_wrapper'>
        <SmallLoadingSpinner />
        <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogIn' } />
      </div>

    const logInFormInputs = makeLogInFormInputs(this.onChange, this.state.email, this.state.password)
    const logInButtons = makeLogInButtons(glyphIndex, this.onSubmit, this.onReset, this.onCancel)

    return (
      <Modal
        modalClass={ 'log_in_modal' }
        showModal={ this.props.modalLogIn }
      >
        <div className='log_in_wrapper'>
          <ModalHeaderCentered header_text='Log In To An Existing Account' />
            { (this.props.authLoading || this.state.validationLoading) && loading }
            <DefaultForm
              buttonRow={ true }
              inputFields={ logInFormInputs }
              inputContainerClass={ 'log_in_input_container' }
              formButtons={ logInButtons }
              formClass={ 'log_in_form' }
              formId={ 'log_in_form' }
              formName={ 'logInForm' }
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
    modalLogIn: store.modal.login
  }
}

const dispatch = (dispatch) => {
  return {
    onLogInModal: (bool) => dispatch(login(bool)),
    onAuthStart: (type, obj, props) => dispatch(authStart(type, obj, props)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(store, dispatch)(LogIn)