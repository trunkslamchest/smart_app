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

  useEffect(() => { requestAnimationFrame(() => { requestAnimationFrame(() => { document.body.scrollTo({ behavior: "smooth", top: 0 }) }) }) }, [])

  return(
    <div className='home_logged_out_wrapper'>
      <HomeBanner containerClass={ 'home_logged_out_banner_container' } logo_class={ 'home_logged_out_logo_container' } />
      <HomeButtonBanner />
      <DefaultCarouselContainer slides={ makeHomeCarouselSlides(homeCarouselIndex) } />
      <HomeBottomBanner />
      <HomeSubBanner containerClass={ 'home_logged_out_sub_banner_container' } wrapperClass={ 'home_logged_out_sub_banner_wrapper' } />
      <HomeTech />
    </div>
  )
}

export default HomeLoggedOutContainer