import React from 'react'
import { connect } from 'react-redux'
import {
  login,
  signup,
  help
} from '../../../store/actions/actionIndex'

import makeHomeLoggedOutButtons from '../../homeFunctions/makeHomeLoggedOutButtons'

import HomeLogoContainer from '../homeLogoContainer/homeLogoContainer'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = (props) => {

  const onLogIn = () => { props.onLoginModal(true) }
  const onSignUp = () => { props.onSignupModal(true) }
  const onHelp = () => { props.onHelpModal(true) }

  let homeButtons = makeHomeLoggedOutButtons(onLogIn, onSignUp, onHelp, props.modal)

  return(
    <div className='home_logged_out_container'>
      <HomeLogoContainer />
      <DefaultButtonsContainer
        buttons={ homeButtons }
        buttonClass={ 'home_button' }
        containerClass={ 'home_buttons_container' }
        enableButton={ true }
        // tooltipClass={  }
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
    onSignupModal: (bool) => dispatch(signup(bool)),
    onHelpModal: (bool) => dispatch(help(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedOutContainer)