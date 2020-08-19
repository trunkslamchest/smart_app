import React from 'react'

import FooterLink from './footerLink'

import './footerLinks.css'

const FooterLinks = (props) => {
  return(
    <div className='footer_links'>
      <FooterLink
        link='/terms_of_service'
        name='footer_tos_button'
      >
        Terms Of Service
      </FooterLink>
      <FooterLink
        link='/privacy'
        name='footer_privacy_button'
      >
        Privacy
      </FooterLink>
      <FooterLink
        link='/disclaimer'
        name='footer_disclaimer_button'
      >
        Disclaimer
      </FooterLink>
    </div>
  )
}

export default FooterLinks