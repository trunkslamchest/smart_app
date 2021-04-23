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

import ModalHeader from '../../components/headers/modalHeader/modalHeader'
import Modal from '../../modal/modal'
import DefaultForm from '../../forms/defaultForm'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './logIn.css'

class LogIn extends React.Component {

  state = {
    email: '',
    enableButton: true,
    enableInput: true,
    errors: {},
    form: { valid: false, pending: false },
    password: ''
  }

  componentDidUpdate() {
    if(this.props.auth.loading && this.state.enableButton) this.setState({ enableButton: false, enableInput: false })
    if(!this.props.auth.loading && (!this.state.enableButton || !this.state.enableInput)) this.setState({ enableButton: true, enableInput: true })
    if(this.props.auth.status === 'fail' && !!this.props.auth.errors.length && !Object.values(this.state.errors).length){
      let email = [], password = []
      if(this.props.auth.errors[0].code === 421) this.props.auth.errors.forEach(error => email.push(error) )
      else if(this.props.auth.errors[0].code === 423) this.props.auth.errors.forEach(error => password.push(error) )
      this.setState({ errors: { email: email, password: password, } })
      this.props.onClearAuthStatus()
    }
  }

  componentWillUnmount(){ this.clearLocalState() }

  onChange = (event) => { this.setState( { [event.target.id]: event.target.value } ) }

  onSubmit = (event) => {
    event.preventDefault()
    if(!!this.props.auth.errors.length) this.props.onClearAuthErrors()
    this.setState({ errors: {}, form: { valid: false, pending: true } })
    let authCheck = validateLogIn(this.state.email, this.state.password)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.onValidateLogIn(authCheck)
  }

  onValidateLogIn = () => {
    if(!this.state.form.pending && this.state.enableButton) this.props.onAuthStart('logIn', {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true
    })
  }

  onReset = () => {
    this.clearLocalState()
    if(!!this.props.auth.errors.length) this.props.onClearAuthErrors()
  }

  onCancel = () => {
    this.onReset()
    this.props.onLogInModal(false)
  }

  clearLocalState = () => { this.setState({ email: '', enableButton: true, enableInput: true, errors: {}, form: { valid: false, pending: false }, password: '' }) }

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
        showModal={ this.props.modal.login }
      >
        <div className='log_in_wrapper'>
          <ModalHeader header_text='Log In' />
          { this.props.auth.loading && loading }
            <DefaultForm
              // buttonClass={ 'log_in_button' }
              // containerClass={ 'log_in_buttons_container' }
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogInModal: (bool) => dispatch(login(bool)),
    onAuthStart: (type, obj, props) => dispatch(authStart(type, obj, props)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)