import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import Modal from '../../UI/modal/modal'
import LogInForm from './logInForm'

import './logIn.css'

class LogIn extends React.Component {

  state = {
    errors: [],
    email: '',
    password: ''
  }

  onChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  onSubmit = (event) => {
    event.preventDefault()
    event.persist()

    this.props.onAuthStart('logIn', {email: this.state.email, password: this.state.password, returnSecureToken: true})
  }

  onCancel = () => { this.props.onLogInModal(false) }

  render(){
    return (
        <Modal
          showModal={ this.props.modal.login }
        >
        <div className='login_wrapper'>
          <LogInForm
            email={this.state.email}
            errors={this.state.errors}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            password={this.state.password}
          />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    login: state.login,
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogInModal: (bool) => dispatch(actions.login(bool)),
    onAuthStart: (type, obj) => dispatch(actions.authStart(type, obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)