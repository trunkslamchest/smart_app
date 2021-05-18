import React from 'react'

import fullColorIndexLogo from '../../../assets/logos/indexLogos/full_color_index_logo.svg'

import './homeLogoContainer.css'
import './homeLogoResponse.css'

const HomeLogoContainer = (props) => {
  return(
    <div className={ props.logo_class }>
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