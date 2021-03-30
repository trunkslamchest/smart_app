import React from 'react'

import HomeBanner from '../../homeComponents/homeBanner/homeBanner'
import HomeFeatures from '../../homeComponents/homeFeatures/homeFeatures'
import HomeTech from '../../homeComponents/homeTech/homeTech'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = (props) => {

  return(
    <div className='home_logged_out_wrapper'>
      <HomeBanner history={ props.history } />
      <HomeFeatures history={ props.history } />
      <div className='home_logged_out_features_divider'></div>
      <HomeTech history={ props.history } />
    </div>
  )
}

export default HomeLoggedOutContainer