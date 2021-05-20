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
      <HomeBanner logo_class={ 'home_logged_in_logo_container' } />
      <div className='divider_medium' />
      <HomeGreeting user_name={ props.user_name } />
      <div className='divider_medium' />
      <HomeLoggedInSections />
      <HomeSubBanner />
      <HomeTech />
    </div>
  )
}

export default HomeLoggedInContainer