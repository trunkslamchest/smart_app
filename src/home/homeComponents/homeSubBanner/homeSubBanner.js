import React from 'react'

import whiteHomeSubBannerLogo from '../../../assets/home_sub_banner/white_home_sub_banner_logo.svg'

import './homeSubBanner.css'
import './homeSubBannerResponse.css'

const HomeSubBanner = (props) => {

  return(
    <div className={ props.containerClass }>
      <div className={ props.wrapperClass }>
        <div className='home_sub_banner_text_container'>
          <h2>
            Answer Questions. Unlock Achievements. Improve Your Rank. Climb The Leaderboards.
          </h2>
          <h3>
            Get Smart
          </h3>
        </div>
        <div className='home_sub_banner_img_container'>
          <img
            alt='PP'
            id='home_sub_banner_logo'
            name='homeSubBannerLogo'
            src={ whiteHomeSubBannerLogo }
          />
        </div>
      </div>
    </div>
  )
}

export default HomeSubBanner