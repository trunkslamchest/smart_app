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

import HomeLogoContainer from '../../homeContainers/homeLogoContainer/homeLogoContainer'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeBanner.css'

class HomeBanner extends React.Component {

  state = { }

  onLogIn = () => { this.props.onLoginModal(true) }
  onSignUp = () => { this.props.onSignupModal(true) }
  onHelp = () => {
    this.props.onSetHelpHeader('Getting Started')
    this.props.onSetHelpSections(makeHomeHelpSections)
    this.props.onHelpModal(true)
  }

  render(){

    let homeButtons = makeHomeLoggedOutButtons(this.onLogIn, this.onSignUp, this.onHelp, this.props.modal)

    return(
      <div className='home_logged_out_banner_container'>
        <HomeLogoContainer />
          <div className='home_logged_out_banner_right_container'>
            <div className='home_logged_out_banner_text_container'>
              <p>
                <span>Login</span> or <span>Sign Up</span> to get started!
              </p>
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
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool)),
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner)