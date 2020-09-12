import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

// import { routes } from '../../utility/paths.js'

import Modal from '../../UI/modal/modal'
import LogInForm from './logInForm'

// import userFunctions from '../../utility/userFunctions'
// import authFunctions from '../../utility/authFunctions'

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

    this.props.onAuthStart('logIn', {email: this.state.email, password: this.state.password, returnSecureToken: true}, this.props)
  }

  onCancel = (event) => {
    this.props.onLoginModal(false)
  }

  render(){
    return (
        <Modal
          showModal={ this.props.modal.login }
        >
        <div className='login_wrapper'>
          <LogInForm
            errors={this.state.errors}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            onCancel={this.onCancel}
            email={this.state.email}
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
    onLoginModal: (bool) => dispatch(actions.login(bool)),
    onAuthStart: (type, obj, props) => dispatch(actions.authLogIn(type, obj, props)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)