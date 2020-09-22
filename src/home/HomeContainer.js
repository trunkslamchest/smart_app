import React, { useEffect } from 'react'

import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeLoggedIn/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeLoggedOut/homeLoggedOutContainer'

import './Home.css'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage = <></>

  if(!props.auth.loading) {
    if(props.auth.status === 'authValid') homePage = <HomeLoggedInContainer />
    else  homePage = <HomeLoggedOutContainer history={props.history} />
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