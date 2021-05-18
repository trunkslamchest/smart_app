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

const HomeLoggedOutContainer = (props) => {

  useEffect(() => { document.body.scrollTop = 0 }, [])

  return(
    <div className='home_logged_out_wrapper'>
      <HomeBanner logo_class={ 'home_logged_out_logo_container' } />
      <div className='divider_medium'></div>
      <HomeButtonBanner history={ props.history } />
      <div className='divider_medium'></div>
      <DefaultCarouselContainer slides={ makeHomeCarouselSlides(homeCarouselIndex) } />
      <div className='divider_medium'></div>
      <HomeBottomBanner history={props.history} />
      <HomeSubBanner history={props.history} />
      <HomeTech history={ props.history } />
    </div>
  )
}

export default HomeLoggedOutContainer