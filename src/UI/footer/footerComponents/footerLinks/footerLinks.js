import React from 'react'

import { routes } from '../../../../utility/paths.js'

import FooterLinkButton from './footerLinkButton/footerLinkButton'

import './footerLinks.css'

const FooterLinks = (props) => {

  const footerLinkButtons = [
    { name: 'footerTOS', id: 'footer_tos_button', route: routes.tos, text: 'Terms of Service' },
    { name: 'footerPrivacyPolicy', id: 'footer_privacy_button', route: routes.privacy, text: 'Privacy Policy' },
    { name: 'footerDisclaimer', id: 'footer_disclaimer_button', route: routes.disclaimer, text: 'Disclaimer' }
  ]

  const distribFooterLinkButtons = footerLinkButtons.map((button, index) => {
    return(
      <FooterLinkButton
        id={ button.id }
        key={ index }
        name={ button.name }
        route={ button.route }
        text={ button.text }
      />
    )
  })

  return(
    <div className='footer_links'>
      { distribFooterLinkButtons }
    </div>
  )
}

export default FooterLinks