import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import Modal from '../../UI/modal/modal'
import LogInForm from './logInForm/logInForm'

import './logIn.css'

class LogIn extends React.Component {

  state = {
    email: '',
    password: '',
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

  onChange = (event) => { this.setState({[event.target.name]: event.target.value}) }

  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      enableButton: false,
      enableInput: false,
    })

    if(this.state.enableButton) this.props.onAuthStart('logIn', {email: this.state.email, password: this.state.password, returnSecureToken: true})
  }

  onCancel = () => {
    this.props.onLogInModal(false)
    this.props.onClearAuthErrors()
  }

  render(){

    return (
        <Modal
          showModal={ this.props.modal.login }
        >
        <div className='login_wrapper'>
          <LogInForm
            enableButton={ this.state.enableButton }
            enableInput={ this.state.enableInput }
            email={ this.state.email }
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
    onLogInModal: (bool) => dispatch(actions.login(bool)),
    onAuthStart: (type, obj) => dispatch(actions.authStart(type, obj)),
    onClearAuthErrors: () => dispatch(actions.clearAuthErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)