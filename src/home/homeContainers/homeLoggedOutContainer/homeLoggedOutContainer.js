import React from 'react'
import { useEffect } from 'react'

import HomeBanner from '../../homeComponents/homeBanner/homeBanner'
import HomeButtonBanner from '../../homeComponents/homeButtonBanner/homeButtonBanner'
import HomeSubBanner from '../../homeComponents/homeSubBanner/homeSubBanner'
import HomeBottomBanner from '../../homeComponents/homeBottomBanner/homeBottomBanner'
import HomeTech from '../../homeComponents/homeTech/homeTech'

import homeCarouselIndex from '../../../assets/carousel/home_carousel/homeCarouselIndex'
import makeHomeCarouselSlides from '../../homeFunctions/makeHomeCarouselSlides'
import DefaultCarouselContainer from '../../../UI/carousel/defaultCarouselContainer'

import './homeLoggedOutContainer.css'

const HomeLoggedOutContainer = () => {

  useEffect(() => { document.body.scrollTop = 0 }, [])

  return(
    <div className='home_logged_out_wrapper'>
      <HomeBanner logo_class={ 'home_logged_out_logo_container' } />
      {/* <div className='divider_medium'></div> */}
      <HomeButtonBanner />
      {/* <div className='divider_medium'></div> */}
      <DefaultCarouselContainer slides={ makeHomeCarouselSlides(homeCarouselIndex) } />
      <HomeBottomBanner />
      <HomeSubBanner />
      <HomeTech />
    </div>
  )
}

export default HomeLoggedOutContainer