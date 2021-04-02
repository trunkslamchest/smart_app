import React from 'react'
import { connect } from 'react-redux'
import {
  login,
  signup
} from '../../../store/actions/actionIndex'

import makeHomeLoggedOutButtons from '../../homeFunctions/makeHomeLoggedOutButtons'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeButtonBanner.css'

const HomeButtonBanner = (props) => {

  const onLogIn = () => { props.onLoginModal(true) }
  const onSignUp = () => { props.onSignupModal(true) }

  const homeButtons = makeHomeLoggedOutButtons(onLogIn, onSignUp)

    return(
      <div className='home_logged_out_button_banner'>
            <DefaultButtonsContainer
              buttons={ homeButtons }
              buttonClass={ 'home_button' }
              buttonContainerClass={ 'home_button_container' }
              containerClass={ 'home_buttons_container' }
              enableButton={ true }
              // tooltipClass={  }
            />
      </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool)),
  }
}

export default connect(null, mapDispatchToProps)(HomeButtonBanner)