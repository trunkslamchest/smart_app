import React from 'react'

import HomeLogoContainer from '../../homeContainers/homeLogoContainer/homeLogoContainer'

import './homeBanner.css'

const HomeBanner = (props) => {

  return(
    <div className='home_logged_out_banner_container'>
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
    </div>
  )
}

export default HomeBanner