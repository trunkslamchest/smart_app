import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

// import { routes } from '../../utility/paths.js'

import Modal from '../../UI/modal/modal'
import SignUpForm from './signUpForm'

// import userFunctions from '../../utility/userFunctions'
// import authFunctions from '../../utility/authFunctions'

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
    else {

      this.props.onSignUp(this.state.user_name, this.state.email, this.state.password, this.props)


      // userFunctions('signUp', 'http://localhost:3001/users', signUpObj)
      // .then(res_obj => {
        // if (res_obj.errors) this.setState({errors: res_obj.errors})
        // else {

          // let logInObj = {
          //   user_name: this.state.user_name,
          //   password: this.state.password
          // }

          // authFunctions('logIn', 'http://localhost:3001/login', logInObj)
          // .then(res_obj => {
          //   if (res_obj.errors) this.setState({errors: res_obj.errors})
          //   else {
          //     this.props.setToken(res_obj)
          //     this.props.updateLogin()
          //     this.props.onSignupModal(false)
          //     this.props.history.push( routes.dashboard )
          //   }
          // })
        // }
      // })
    }
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

  onCancel = () => { this.props.onSignupModal(false) }

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
    onSignupModal: (bool) => dispatch(actions.signup(bool)),
    onAuth: (email, password) => dispatch(actions.authUser(email, password)),
    onSignUp: (user_name, email, password, props) => dispatch(actions.signUpUser(user_name, email, password, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)