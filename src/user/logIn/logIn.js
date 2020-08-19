import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths.js'

import Modal from '../../UI/modal/modal'
import LogInForm from './logInForm'

import authFunctions from '../../utility/authFunctions'

import './logIn.css'

class LogIn extends React.Component {

  state = {
    errors: [],
    user_name: '',
    password: ''
  }

  onChange = (event) => {this.setState({[event.target.name]: event.target.value})}

  onSubmit = (event) => {
    event.preventDefault()
    event.persist()

    let logInObj = {
      user_name: this.state.user_name,
      password: this.state.password
    }

    authFunctions('logIn', 'http://localhost:3001/login', logInObj)
    .then(res_obj => {
      if (res_obj.errors) this.setState({ errors: res_obj.errors })
      else {
        this.props.setToken(res_obj)
        this.props.updateLogin()
        this.props.onLoginModal(false)
        this.props.history.push( routes.dashboard )
      }
    })
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
            user_name={this.state.user_name}
            password={this.state.password}
          />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(actions.login(bool)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)