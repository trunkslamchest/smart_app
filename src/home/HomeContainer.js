import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import makeHomeHelpSections from './homeFunctions/makeHomeHelpSections'

import HomeLoggedInContainer from './homeContainers/homeLoggedInContainer/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeContainers/homeLoggedOutContainer/homeLoggedOutContainer'

import Help from '../help/help'

// import fullColorIndexLogo from '../assets/logos/indexLogos/full_color_index_logo.png'

import './HomeContainer.css'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage
  let homeHelpSections

  if(!props.auth.loading) {
    if(props.auth.status === 'authValid') {
      homePage = <HomeLoggedInContainer history={ props.history } />
    } else {
      homePage = <HomeLoggedOutContainer history={ props.history } />
      homeHelpSections = makeHomeHelpSections
    }
  }

  // console.log(!!fullColorIndexLogo)

  return(
    <>
      { props.modal.help && <Help headerText={ 'Getting Started' } helpType={ 'home' } helpSections = { homeHelpSections } history={ props.history } /> }
      { homePage }
    </>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    modal: state.modal
  }
}

export default connect(mapStateToProps)(HomeContainer)