import React from 'react'

import HomeBanner from '../../homeComponents/homeBanner/homeBanner'
import HomeButtonBanner from '../../homeComponents/homeButtonBanner/homeButtonBanner'
import HomeSubBanner from '../../homeComponents/homeSubBanner/homeSubBanner'
import HomeBottomBanner from '../../homeComponents/homeBottomBanner/homeBottomBanner'
import HomeFeatures from '../../homeComponents/homeFeatures/homeFeatures'
import HomeTech from '../../homeComponents/homeTech/homeTech'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = (props) => {

  return(
    <div className='home_logged_out_wrapper'>
      <HomeBanner history={ props.history } />
      <div className='home_logged_out_features_divider'></div>
      <HomeButtonBanner history={ props.history } />
      <div className='home_logged_out_features_divider'></div>
      <HomeSubBanner history={props.history} />
      {/* <div className='home_logged_out_features_divider'></div> */}
      <HomeFeatures history={ props.history } />
      <div className='home_logged_out_features_divider'></div>
      <HomeBottomBanner history={props.history} />
      <div className='home_logged_out_features_divider'></div>
      <HomeTech history={ props.history } />
      {/* <div className='home_logged_out_features_divider'></div> */}
    </div>
  )
}

export default HomeLoggedOutContainer