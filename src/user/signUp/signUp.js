import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths.js'

import Modal from '../../UI/modal/modal'
import SignUpForm from './signUpForm'

import userFunctions from '../../utility/userFunctions'
import authFunctions from '../../utility/authFunctions'

import './signUp.css'

class SignUp extends React.Component {

  state = {
    errors: [],
    TOSagreement: false,
    user_name: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    house_number: '',
    street_name: '',
    city_town: '',
    state: '',
    zip_code: ''
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

      let signUpObj = {
        user_name: this.state.user_name,
        password: this.state.password,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        gender: this.state.gender,
        birth_month: this.state.birth_month,
        birth_day: this.state.birth_day,
        birth_year: this.state.birth_year,
        house_number: this.state.house_number,
        street_name: this.state.street_name,
        city_town: this.state.city_town,
        state: this.state.state,
        zip_code: this.state.zip_code
      }

      userFunctions('signUp', 'http://localhost:3001/users', signUpObj)
      .then(res_obj => {
        if (res_obj.errors) this.setState({errors: res_obj.errors})
        else {

          let logInObj = {
            user_name: this.state.user_name,
            password: this.state.password
          }

          authFunctions('logIn', 'http://localhost:3001/login', logInObj)
          .then(res_obj => {
            if (res_obj.errors) this.setState({errors: res_obj.errors})
            else {
              this.props.setToken(res_obj)
              this.props.updateLogin()
              this.props.onSignupModal(false)
              this.props.history.push( routes.dashboard )
            }
          })
        }
      })
    }
  }

  onReset = () => {
    this.setState({
      errors: [],
      TOSagreement: false,
      user_name: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      gender: '',
      birth_day: '',
      birth_month: '',
      birth_year: '',
      house_number: '',
      street_name: '',
      city_town: '',
      state: '',
      zip_code: '',
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
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          gender={this.state.gender}
          birth_day={this.state.birth_day}
          birth_month={this.state.birth_month}
          birth_year={this.state.birth_year}
          house_number={this.state.house_number}
          street_name={this.state.street_name}
          city_town={this.state.city_town}
          state={this.state.state}
          zip_code={this.state.zip_code}
          TOSagreement={this.state.TOSagreement}
        />
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
    onSignupModal: (bool) => dispatch(actions.signup(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)