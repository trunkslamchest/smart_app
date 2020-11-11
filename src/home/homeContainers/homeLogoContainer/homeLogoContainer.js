import React from 'react'

import fullColorIndexLogo from '../../../assets/logos/indexLogos/full_color_index_logo.png'

import './homeLogoContainer.css'

const HomeLogoContainer = (props) => {
  return(
    <div className="home_logo_container">
      <img
        alt='home_log'
        id='home_logo'
        name='homeLogo'
        src={ fullColorIndexLogo }
        title='SmartApp™ Logo'
      />
    </div>
  )
}

export default HomeLogoContainer