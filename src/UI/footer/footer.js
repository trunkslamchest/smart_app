import React from 'react'

import FooterLinks from './footerLinks'
import FooterLogos from './footerLogos'
import FooterFinePrint from './footerFinePrint'

import './footer.css'

const Footer = (props) => {
  return(
    <div className='footer'>
      <div className='footer_left'>
        <FooterLinks />
        <FooterLogos />
        <FooterFinePrint />
      </div>
    </div>
  )
}

export default Footer