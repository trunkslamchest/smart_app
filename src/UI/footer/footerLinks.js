import React from 'react'

import { routes } from '../../utility/paths.js'

import FooterLink from './footerLink'

import './footerLinks.css'

const FooterLinks = (props) => {
  return(
    <div className='footer_links'>
      <FooterLink
        link={ routes.tos }
        name='footer_tos_button'
      >
        Terms Of Service
      </FooterLink>
      <FooterLink
        link={ routes.privacy }
        name='footer_privacy_button'
      >
        Privacy
      </FooterLink>
      <FooterLink
        link={ routes.disclaimer }
        name='footer_disclaimer_button'
      >
        Disclaimer
      </FooterLink>
    </div>
  )
}

export default FooterLinks