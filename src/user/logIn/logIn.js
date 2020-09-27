import React from 'react'
import { connect } from 'react-redux'
import { login, authStart, clearAuthStatus, clearAuthErrors } from '../../store/actions/actionIndex'

import validateLogIn from '../../utility/validation/validateLogIn'

import LogInForm from './logInForm/logInForm'
import Modal from '../../UI/modal/modal'

import './logIn.css'

class LogIn extends React.Component {

  state = {
    email: '',
    enableButton: true,
    enableInput: true,
    form: { valid: false, pending: false },
    password: ''
  }

  componentDidUpdate() {
    if(this.props.auth.loading && this.state.enableButton) this.setState({ enableButton: false, enableInput: false })
    if(!this.props.auth.loading && !this.state.enableButton) this.setState({ enableButton: true, enableInput: true })
  }

  onChange = (event) => { this.setState({[event.target.name]: event.target.value}) }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({ form: { valid: false, pending: true } })
    if(!!this.props.auth.errors.length) {
      this.props.onClearAuthErrors()
      this.props.onClearAuthStatus()
    }
    let authCheck = validateLogIn(this.state.email, this.state.password)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.onValidateLogIn(authCheck)
  }

  onValidateLogIn = () => {
    if(!this.state.form.pending && this.state.enableButton)this.props.onAuthStart('logIn', { email: this.state.email, password: this.state.password, returnSecureToken: true })
  }

  onCancel = () => {
    this.setState({
      email: '',
      enableButton: true,
      enableInput: true,
      form: { valid: true },
      password: ''
    })
    this.props.onClearAuthErrors()
    this.props.onLogInModal(false)
  }

  render(){
    return (
        <Modal
          showModal={ this.props.modal.login }
        >
        <div className='log_in_wrapper'>
          <LogInForm
            email={ this.state.email }
            enableButton={ this.state.enableButton }
            enableInput={ this.state.enableInput }
            form={ this.state.form }
            onChange={ this.onChange }
            onSubmit={ this.onSubmit  }
            onCancel={ this.onCancel }
            password={ this.state.password }
          />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    user: state.user,
    question: state.question
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