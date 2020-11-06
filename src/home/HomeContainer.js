import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeLoggedIn/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeLoggedOut/homeLoggedOutContainer'

import fullColorIndexLogo from '../assets/logos/indexLogos/full_color_index_logo.png'


import './Home.css'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage = <></>

  if(!props.auth.loading) {
    if(props.auth.status === 'authValid') homePage = <HomeLoggedInContainer indexLogo={ fullColorIndexLogo } />
    else  homePage = <HomeLoggedOutContainer history={ props.history } indexLogo={ fullColorIndexLogo } />
  }

  return(
    <div className='default_wrapper'>
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