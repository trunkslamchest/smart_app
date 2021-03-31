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

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeSubBanner.css'

class HomeSubBanner extends React.Component {

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
      <div className='home_logged_out_sub_banner'>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSubBanner)

// export default HomeSubBanner


      // <div className='home_logged_out_sub_banner'>
      //   <div className='home_logged_out_tagline_container'>
      //     <h1>
      //       SmartApp™ is for people who love trivia and love to test their knowledge
      //     </h1>
      //     <h2>
      //       Answer Questions. Unlock Achievements. Improve Your Rank. Climb The Leaderboards.
      //     </h2>
      //     <h3>
      //       Get Smart
      //     </h3>
      //   </div>
      // </div>