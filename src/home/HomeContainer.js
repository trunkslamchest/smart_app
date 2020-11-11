import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// import HomeLoggedInContainer from './homeLoggedIn/homeLoggedInContainer'

import HomeLoggedInContainer from './homeContainers/homeLoggedInContainer/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeContainers/homeLoggedOutContainer/homeLoggedOutContainer'

import HomeLogoContainer from './homeContainers/homeLogoContainer/homeLogoContainer'

// import fullColorIndexLogo from '../assets/logos/indexLogos/full_color_index_logo.png'

import './HomeContainer.css'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage = <></>

  if(!props.auth.loading) {
    if(props.auth.status === 'authValid') {
      homePage = <HomeLoggedInContainer history={ props.history } />
    } else {
      homePage = <HomeLoggedOutContainer history={ props.history } />
    }
  }

  // console.log(!!fullColorIndexLogo)

  return(
    <div className='home_container'>
      <HomeLogoContainer />
      { homePage }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(HomeContainer)