import React from 'react'
import { connect } from 'react-redux'
import {
  login,
  signup,
  help,
  setHelpHeader,
  setHelpSections
} from '../../../store/actions/actionIndex'

import makeHomeHelpSections from '../../homeFunctions/makeHomeHelpSections'
import makeHomeLoggedOutButtons from '../../homeFunctions/makeHomeLoggedOutButtons'

import HomeLogoContainer from '../homeLogoContainer/homeLogoContainer'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = (props) => {

  const onLogIn = () => { props.onLoginModal(true) }
  const onSignUp = () => { props.onSignupModal(true) }
  const onHelp = () => {
    props.onSetHelpHeader('Getting Started')
    props.onSetHelpSections(makeHomeHelpSections)
    props.onHelpModal(true)
  }

  let homeButtons = makeHomeLoggedOutButtons(onLogIn, onSignUp, onHelp, props.modal)

  return(
    <div className='home_logged_out_wrapper'>
      <div className='home_logged_out_top_container'>
        <HomeLogoContainer />
          <div className='home_logged_out_top_right_container'>
            <div className='home_logged_out_tagline_container'>
              {/* <h3>
                SmartApp™ is a trivia application
              </h3> */}
              <h3>
                Answer questions. Gain Experience. Unlock Achievements. Improve Your Rank. Climb The Leaderboards. Challenge Your Friends.
              </h3>
              <h3>
                Get Smart.
              </h3>
              {/* <span>
                It's all for the pursuit of knowledge!
              </span> */}
            </div>
            <DefaultButtonsContainer
              buttons={ homeButtons }
              buttonClass={ 'home_button' }
              buttonContainerClass={ 'home_button_container' }
              containerClass={ 'home_buttons_container' }
              enableButton={ true }
              // tooltipClass={  }
            />
          </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool)),
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(null, mapDispatchToProps)(HomeLoggedOutContainer)