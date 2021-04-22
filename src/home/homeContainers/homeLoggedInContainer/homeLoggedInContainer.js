import React from 'react'

import HomeBanner from '../../homeComponents/homeBanner/homeBanner'
import HomeGreeting from '../../homeComponents/homeGreeting/homeGreeting'
import HomeLoggedInSections from '../../homeComponents/homeLoggedInSections/homeLoggedInSections'
import HomeSubBanner from '../../homeComponents/homeSubBanner/homeSubBanner'
import HomeTech from '../../homeComponents/homeTech/homeTech'

import './homeLoggedInContainer.css'

const HomeLoggedInContainer = (props) => {
  return(
    <div className='home_logged_in_wrapper'>
      <HomeBanner />
      <div className='divider_medium' />
      <HomeGreeting user_name={ props.user_name } />
      <div className='divider_medium' />
      <HomeLoggedInSections history={props.history} />
      <div className='divider_medium' />
      <HomeSubBanner history={props.history} />
      <div className='divider_medium' />
      <HomeTech history={ props.history } />
      <div className='divider_medium' />
    </div>
  )
}

export default HomeLoggedInContainer