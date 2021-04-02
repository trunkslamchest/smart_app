import React from 'react'
import { connect } from 'react-redux'
import {
  help,
  setHelpHeader,
  setHelpSections
} from '../../../store/actions/actionIndex'

import makeHomeHelpSections from '../../homeFunctions/makeHomeHelpSections'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeBottomBanner.css'

class HomeBottomBanner extends React.Component {

  onHelp = () => {
    this.props.onSetHelpHeader('Getting Started')
    this.props.onSetHelpSections(makeHomeHelpSections)
    this.props.onHelpModal(true)
  }

  render(){

    const helpButton = [
      {
        id: 'help_button',
        name: 'HelpButton',
        onClickFunction: this.onHelp,
        text: 'Would You Like To Know More?',
        tooltipText: [ 'Information on how to get started' ]
      }
    ]

    return(
      <div className='home_logged_out_bottom_banner'>
          <DefaultButtonsContainer
            buttons={ helpButton }
            buttonClass={ 'home_button' }
            buttonContainerClass={ 'home_help_button_container' }
            containerClass={ 'home_help_buttons_container' }
            enableButton={ true }
            // tooltipClass={  }
          />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(null, mapDispatchToProps)(HomeBottomBanner)