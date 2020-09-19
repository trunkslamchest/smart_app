import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import Modal from '../../UI/modal/modal'
import SignUpForm from './signUpForm/signUpForm'

import './signUp.css'

class SignUp extends React.Component {

  state = {
    errors: [],
    TOSagreement: false,
    user_name: '',
    password: '',
    email: '',
  }

  onChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  onChecked = (event) => {
    let flipChecked = !event.target.checked
    this.setState({TOSagreement: !flipChecked})
  }

  onSubmit = (event) => {
    event.persist()
    event.preventDefault()

    if (!this.state.TOSagreement) alert('You must agree to the Terms of Service Agreement in order to make a new account.')
    else this.props.onAuthStart('signUp', {
          displayName: this.state.user_name,
          email: this.state.email,
          password: this.state.password,
          returnSecureToken: true
        })
  }

  onReset = () => {
    this.setState({
      errors: [],
      TOSagreement: false,
      user_name: '',
      password: '',
      email: '',
    })
  }

  onCancel = () => { this.props.onSignUpModal(false) }

  render(){
    return (
      <Modal
        showModal={ this.props.modal.signup }
      >
        <SignUpForm
          errors={this.state.errors}
          onChange={this.onChange}
          onChecked={this.onChecked}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          onReset={this.onReset}
          user_name={this.state.user_name}
          password={this.state.password}
          email={this.state.email}
          TOSagreement={this.state.TOSagreement}
        />
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    signUp: state.signUp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUpModal: (bool) => dispatch(actions.signup(bool)),
    onAuthStart: (type, obj, props) => dispatch(actions.authStart(type, obj, props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)