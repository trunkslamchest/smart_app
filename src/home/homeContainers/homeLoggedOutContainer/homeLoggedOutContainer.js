import React from 'react'
import { connect } from 'react-redux'
import {
  login,
  signup
} from '../../../store/actions/actionIndex'

import makeHomeLoggedOutButtons from '../../homeFunctions/makeHomeLoggedOutButtons'

import HomeButtonsContainer from '../homeButtonsContainer/homeButtonsContainer'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = (props) => {

  const onLogIn = (event) => { props.onLoginModal(true) }
  const onSignUp = (event) => { props.onSignupModal(true) }

  let homeButtons = makeHomeLoggedOutButtons(onLogIn, onSignUp, props.modal)

  return(
    <div className='home_logged_out_container'>
      <HomeButtonsContainer
        containerClass='logged_out_buttons_container'
        buttons={ homeButtons }
        history={ props.history }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedOutContainer)