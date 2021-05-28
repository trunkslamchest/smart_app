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
      <HomeBanner containerClass={ 'home_logged_in_banner_container' } logo_class={ 'home_logged_in_logo_container' } />
      {/* <div className='divider_medium' /> */}
      <HomeGreeting user_name={ props.user_name } />
      {/* <div className='divider_medium' /> */}
      <HomeLoggedInSections />
      <HomeSubBanner containerClass={ 'home_logged_in_sub_banner_container' } wrapperClass={ 'home_logged_in_sub_banner_wrapper' } />
      <HomeTech />
    </div>
  )
}

export default HomeLoggedInContainer