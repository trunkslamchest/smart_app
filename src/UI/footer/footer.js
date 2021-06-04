import React from 'react'

import FooterLinks from './footerComponents/footerLinks/footerLinks'
import FooterCreditLogos from './footerComponents/footerCreditLogos/footerCreditLogos'
import FooterFinePrint from './footerComponents/footerFinePrint/footerFinePrint'
import FooterLogo from './footerComponents/footerLogo/footerLogo'

import './footer.css'
import './footerResponse.css'

const Footer = () => {
  return(
    <div className='footer'>
      <div className='footer_left'>
        <FooterLinks />
        <FooterCreditLogos />
        <FooterFinePrint />
      </div>
      <div className='footer_right'>
        <FooterLogo />
      </div>
    </div>
  )
}

export default React.memo(Footer)