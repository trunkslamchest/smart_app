import React from 'react'
import { connect } from 'react-redux'

import HomeLogoContainer from '../../homeContainers/homeLogoContainer/homeLogoContainer'

import './homeBanner.css'
import './homeBannerResponse.css'

const HomeBanner = (props) => {

  let homeBannerContent

  if(localStorage.authValid === 'true' && props.authStatus === 'authValid'){
    homeBannerContent =
      <HomeLogoContainer logo_class={ props.logo_class } />
  } else {
    homeBannerContent =
      <>
        <HomeLogoContainer logo_class={ props.logo_class } />
        <div className='home_logged_out_banner_right_container'>
          <div className='home_logged_out_banner_text_container'>
            <h1>
              <span>SmartApp</span>™ is for people who love trivia.
            </h1>
            <h2>
              Whether you are newbie or a mastermind know-it-all,
              <br />
              <span>SmartApp</span>™ is made to help you expand your mind.
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
    authStatus: store.auth.status
  }
}

export default connect(store)(HomeBanner)