import React from 'react'
import { connect } from 'react-redux'

import HomeLogoContainer from '../../homeContainers/homeLogoContainer/homeLogoContainer'

import './homeBanner.css'

const HomeBanner = (props) => {

  let homeBannerContent

  if(localStorage.authValid === 'true' && props.auth.status === 'authValid'){
    homeBannerContent =
      <>
        <HomeLogoContainer />
      </>
  } else {
    homeBannerContent =
      <>
        <HomeLogoContainer />
        <div className='home_logged_out_banner_right_container'>
          <div className='home_logged_out_banner_text_container'>
            <h1>
              <span>SmartApp</span>™ is for people who love trivia and love to test their knowledge.
            </h1>
            <h2>
              Whether you are noobie or a mastermind know-it-all, <span>SmartApp</span>™ is made to help you expand your mind.
            </h2>
            <h3>
              <span>Login</span> or <span>Sign Up</span> and get smart today.
            </h3>
          </div>
        </div>
    </>
  }

  return(
    <div className='home_banner_container'>
      { homeBannerContent }
    </div>
  )
}

const store = (store) => {
  return {
    auth: store.auth
  }
}

export default connect(store)(HomeBanner)