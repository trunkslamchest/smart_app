import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { check } from '../../utility/paths'
import checkFunctions from '../../utility/checkFunctions'

import validateSignUp from '../../utility/validation/validateSignUp'

import Modal from '../../UI/modal/modal'
import SignUpForm from './signUpForm/signUpForm'

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
    if(!!this.props.auth.errors.length) {
      this.props.onClearAuthErrors()
      this.props.onClearAuthStatus()
    }
    event.preventDefault()
    // this.setState({ enableButton: false, enableInput: false, form: { valid: false, pending: true } })
    this.setState({ form: { valid: false, pending: true } })

    let authCheck = validateSignUp(this.state.user_name, this.state.email, this.state.password, this.state.TOSagreement)
    this.setState({ form: authCheck })
    if(authCheck.valid && !this.state.form.pending && this.state.enableButton){
      this.checkUserExists(authCheck.valid)
      // this.props.onAuthStart('signUp', {
      //   displayName: this.state.user_name,
      //   email: this.state.email,
      //   password: this.state.password,
      //   returnSecureToken: true
      // })
    }
  }

  checkUserExists = (authCheck) => {
    checkFunctions('checkUserName', check.user_name, { user_name: this.state.user_name })
    .then(userNameRes => {
      if(!userNameRes.valid) this.setState({ form: { valid: false, user_name: { valid: userNameRes.valid, errors: [ userNameRes.errors ] }, pending: false  } })
      else this.onValidateSignUp(authCheck)
    })
  }

  onValidateSignUp = (authCheck) => {
    console.log(authCheck, !this.state.form.pending, this.state.enableButton)

    if(authCheck && !this.state.form.pending && this.state.enableButton){
      this.props.onAuthStart('signUp', {
        displayName: this.state.user_name,
        email: this.state.email,
        password: this.state.password,
        returnSecureToken: true
      })
    }
  }


  // checkUserName = () => {
  //   checkFunctions('checkUserName', check.user_name, { user_name: this.state.user_name })
  //   .then(userNameRes => {
  //     if(!userNameRes.valid) this.setState({ form: { valid: false, user_name: { valid: userNameRes.valid, errors: [ userNameRes.errors ] }, pending: false  } })
  //     else this.checkEmail()
  //   })
  // }

  // checkEmail = () => {
  //   checkFunctions('checkEmail', check.email, { email: this.state.email })
  //   .then(emailRes => {
  //     if(!emailRes.valid) this.setState({ form: { valid: false, email: { valid: emailRes.valid, errors: [emailRes.errors] }, pending: false  } })
  //     else this.onValidateSignUp()
  //   })
  // }

  // onValidateSignUp = () => {
  //   if(this.state.form.valid && !this.state.form.pending){
  //     if(this.state.enableButton) {
  //       this.props.onAuthStart('signUp', {
  //         displayName: this.state.user_name,
  //         email: this.state.email,
  //         password: this.state.password,
  //         returnSecureToken: true
  //       })
  //     }
  //   }
  // }

  onReset = () => {
    this.setState({
      user_name: '',
      password: '',
      email: '',
      form: { valid: true },
      TOSagreement: false,
      enableButton: true,
      enableInput: true
    })
    this.props.onClearAuthErrors()
  }

  onCancel = () => {
    this.onReset()
    this.props.onSignUpModal(false)
    this.props.onClearAuthErrors()
  }

  render(){

    // console.log(this.state.form.valid, !this.state.form.pending, this.state.enableButton)

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
    onSignUpModal: (bool) => dispatch(actions.signup(bool)),
    onAuthStart: (type, obj, props) => dispatch(actions.authStart(type, obj, props)),
    onClearAuthStatus: () => dispatch(actions.clearAuthStatus()),
    onClearAuthErrors: () => dispatch(actions.clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)