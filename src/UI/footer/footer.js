import React from 'react'

import { routes } from '../../utility/paths'

import FooterLinks from './footerComponents/footerLinks/footerLinks'
import FooterCreditLogos from './footerComponents/footerCreditLogos/footerCreditLogos'
import FooterFinePrint from './footerComponents/footerFinePrint/footerFinePrint'
import FooterLogo from './footerComponents/footerLogo/footerLogo'

import footerLogosIndex from '../../assets/logos/footerLogosIndex'

import './footer.css'
import './footerResponse.css'

const Footer = (props) => {
  return(
    <div className='footer'>
      <div className='footer_left'>
        <FooterLinks history={ props.history } />
        <FooterCreditLogos />
        <FooterFinePrint />
      </div>
      <div className='footer_right'>
        <FooterLogo
          history={ props.history }
          route={ routes.home }
          logo={ footerLogosIndex.whiteFooterLogo }
          logoHover={ footerLogosIndex.blackFooterLogo }
        />
      </div>
    </div>
  )
}

export default Footer