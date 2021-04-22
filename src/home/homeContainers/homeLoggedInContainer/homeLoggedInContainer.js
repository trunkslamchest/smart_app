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
      <div className='divider_medium'></div>
      <HomeGreeting user_name={ props.user_name } />
      <HomeLoggedInSections history={props.history} />
      <div className='divider_medium'></div>
      <HomeSubBanner history={props.history} />
      <div className='divider_medium'></div>
      <HomeTech history={ props.history } />
      <div className='divider_medium'></div>
    </div>
  )
}

export default HomeLoggedInContainer