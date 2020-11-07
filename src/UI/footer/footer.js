import React from 'react'

import { routes } from '../../utility/paths'

import FooterLinks from './footerComponents/footerLinks/footerLinks'
import FooterCreditLogos from './footerComponents/footerCreditLogos/footerCreditLogos'
import FooterFinePrint from './footerComponents/footerFinePrint/footerFinePrint'
import FooterLogo from './footerComponents/footerLogo/footerLogo'

import footerLogosIndex from '../../assets/logos/footerLogosIndex'

import './footer.css'

const Footer = (props) => {
  return(
    <div className='footer'>
      <div className='footer_left'>
        <FooterLinks />
        <FooterCreditLogos />
      </div>
      <div className='footer_right'>
        <FooterFinePrint />
        <FooterLogo
          history={ props.history }
          route={ routes.home }
          logo={ footerLogosIndex.blackFooterLogo }
          logoHover={ footerLogosIndex.whiteFooterLogo }
        />
      </div>
    </div>
  )
}

export default Footer