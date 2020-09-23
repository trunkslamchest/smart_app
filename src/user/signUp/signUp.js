import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import Modal from '../../UI/modal/modal'
import SignUpForm from './signUpForm/signUpForm'

import './signUp.css'

class SignUp extends React.Component {

  state = {
    user_name: '',
    password: '',
    email: '',
    TOSagreement: false,
    enableButton: true,
    enableInput: true
  }

  componentDidUpdate() {
    if(this.props.auth.loading && this.state.enableButton){
      this.setState({
        enableButton: false,
        enableInput: false,
      })
    }

    if(!this.props.auth.loading && !this.state.enableButton){
      this.setState({
        enableButton: true,
        enableInput: true,
      })
    }
  }

  onChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  onChecked = (event) => {
    let flipChecked = !event.target.checked
    this.setState({TOSagreement: !flipChecked})
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()

    this.setState({
      enableButton: false,
      enableInput: false,
    })

    if(this.state.enableButton) {
      if (!this.state.TOSagreement) alert('You must agree to the Terms of Service Agreement in order to make a new account.')
      else this.props.onAuthStart('signUp', {
            displayName: this.state.user_name,
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
          })
    }
  }

  onReset = () => {
    this.setState({
      TOSagreement: false,
      user_name: '',
      password: '',
      email: '',
    })
  }

  onCancel = () => {
    this.setState({
      enableButton: false,
      enableInput: false,
    })

    this.onReset()
    this.props.onSignUpModal(false)
    this.props.onClearAuthErrors()
  }

  render(){
    return (
      <Modal
        showModal={ this.props.modal.signup }
      >
        <SignUpForm
          email={ this.state.email }
          enableButton={ this.state.enableButton }
          enableInput={ this.state.enableInput }
          onChange={ this.onChange }
          onChecked={ this.onChecked }
          onSubmit={ this.onSubmit }
          onCancel={ this.onCancel }
          onReset={ this.onReset }
          password={ this.state.password }
          TOSagreement={ this.state.TOSagreement }
          user_name={ this.state.user_name }
        />
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
    onClearAuthErrors: () => dispatch(actions.clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)