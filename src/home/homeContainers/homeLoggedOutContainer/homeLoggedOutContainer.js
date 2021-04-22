import React from 'react'

import HomeBanner from '../../homeComponents/homeBanner/homeBanner'
import HomeButtonBanner from '../../homeComponents/homeButtonBanner/homeButtonBanner'
import HomeSubBanner from '../../homeComponents/homeSubBanner/homeSubBanner'
import HomeBottomBanner from '../../homeComponents/homeBottomBanner/homeBottomBanner'
import HomeTech from '../../homeComponents/homeTech/homeTech'

import homeFeaturesIndex from '../../../assets/home_features/homeFeaturesIndex'
import homeFeaturesCarousel from '../../homeComponents/homeFeatures/homeFeaturesCarousel'

import DefaultCarouselContainer from '../../../UI/carousel/defaultCarouselContainer'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = (props) => {

  return(
    <div className='home_logged_out_wrapper'>
      <HomeBanner history={ props.history } />
      <div className='divider_medium'></div>
      <HomeButtonBanner history={ props.history } />
      <div className='divider_medium'></div>
      <DefaultCarouselContainer slides={ homeFeaturesCarousel(homeFeaturesIndex) } />
      <div className='divider_medium'></div>
      <HomeBottomBanner history={props.history} />
      <div className='divider_medium'></div>
      <HomeSubBanner history={props.history} />
      <div className='divider_medium'></div>
      <HomeTech history={ props.history } />
      <div className='divider_medium'></div>
    </div>
  )
}

export default HomeLoggedOutContainer