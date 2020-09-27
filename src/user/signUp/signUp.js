import React from 'react'
import { connect } from 'react-redux'
import { signup, authStart, clearAuthStatus, clearAuthErrors } from '../../store/actions/actionIndex'

import { check } from '../../utility/paths'
import checkFunctions from '../../utility/checkFunctions'
import validateSignUp from '../../utility/validation/validateSignUp'

import SignUpForm from './signUpForm/signUpForm'
import Modal from '../../UI/modal/modal'

import './signUp.css'

class SignUp extends React.Component {

  state = {
    user_name: '',
    password: '',
    email: '',
    form: { valid: false, pending: false },
    TOSagreement: false,
    enableButton: true,
    enableInput: true
  }

  componentDidUpdate() {
    if(this.props.auth.loading && this.state.enableButton) this.setState({ enableButton: false, enableInput: false })
    if(!this.props.auth.loading && !this.state.enableButton) this.setState({ enableButton: true, enableInput: true })
  }

  onChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  onChecked = (event) => {
    let flipChecked = !event.target.checked
    this.setState({TOSagreement: !flipChecked})
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({ form: { valid: false, pending: true } })
    if(!!this.props.auth.errors.length) {
      this.props.onClearAuthErrors()
      this.props.onClearAuthStatus()
    }
    let authCheck = validateSignUp(this.state.user_name, this.state.email, this.state.password, this.state.TOSagreement)
    this.setState({ form: authCheck })
    if(authCheck.valid) this.checkUserExists()
  }

  checkUserExists = () => {
    checkFunctions('checkUserName', check.user_name, { user_name: this.state.user_name })
    .then(userNameRes => {
      if(!userNameRes.valid) this.setState({ form: { valid: false, user_name: { valid: userNameRes.valid, errors: [ userNameRes.errors ] }, pending: false  } })
      else this.onValidateSignUp()
    })
  }

  onValidateSignUp = () => {
    if(!this.state.form.pending && this.state.enableButton){
      this.props.onAuthStart('signUp', {
        displayName: this.state.user_name,
        email: this.state.email,
        password: this.state.password,
        returnSecureToken: true
      })
    }
  }

  onReset = () => {
    this.setState({
      user_name: '',
      password: '',
      email: '',
      form: { valid: false, pending: false },
      TOSagreement: false,
      enableButton: true,
      enableInput: true
    })
    this.props.onClearAuthErrors()
    this.props.onClearAuthStatus()
  }

  onCancel = () => {
    this.onReset()
    this.props.onSignUpModal(false)
  }

  render(){
    return (
      <Modal
        showModal={ this.props.modal.signup }
      >
        <div className='sign_up_wrapper'>
          <SignUpForm
            email={ this.state.email }
            enableButton={ this.state.enableButton }
            enableInput={ this.state.enableInput }
            form={ this.state.form }
            onChange={ this.onChange }
            onChecked={ this.onChecked }
            onSubmit={ this.onSubmit }
            onCancel={ this.onCancel }
            onReset={ this.onReset }
            password={ this.state.password }
            TOSagreement={ this.state.TOSagreement }
            user_name={ this.state.user_name }
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
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpModal: (bool) => dispatch(signup(bool)),
    onAuthStart: (type, obj, props) => dispatch(authStart(type, obj, props)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthErrors: () => dispatch(clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)






// checkEmail = () => {
//   checkFunctions('checkEmail', check.email, { email: this.state.email })
//   .then(emailRes => {
//     if(!emailRes.valid) this.setState({ form: { valid: false, email: { valid: emailRes.valid, errors: [emailRes.errors] }, pending: false  } })
//     else this.onValidateSignUp()
//   })
// }