import React from 'react'

import { routes } from '../../../../utility/paths.js'

import makeFooterLinkButtons from '../footerFunctions/makeFooterLinkButtons'

import DefaultButtonsContainer from '../../../buttons/defaultButtonsContainer/defaultButtonsContainer'

// import FooterLinkButton from './footerLinkButton/footerLinkButton'

// import './footerLinks.css'

const FooterLinks = (props) => {

  // const footerLinkButtons = [
  //   { name: 'footerDisclaimer', id: 'footer_disclaimer_button', route: routes.disclaimer, text: 'Disclaimer' },
  //   { name: 'footerLicense', id: 'footer_license_button', route: routes.license, text: 'License' },
  //   { name: 'footerPrivacyPolicy', id: 'footer_privacy_button', route: routes.privacy, text: 'Privacy Policy' },
  //   { name: 'footerTOS', id: 'footer_tos_button', route: routes.tos, text: 'Terms of Service' }
  // ]

  const footerLinkButtons = makeFooterLinkButtons(routes)

  // const distribFooterLinkButtons = footerLinkButtons.map((button, index) => {
  //   return(
  //     // <FooterLinkButton
  //     //   history={ props.history }
  //     //   id={ button.id }
  //     //   key={ index }
  //     //   name={ button.name }
  //     //   route={ button.route }
  //     //   text={ button.text }
  //     // />
          // <DefaultButtonContainer
          //   buttons={ footerLinkButtons }
          //   buttonContainerClass={ 'header_button_container' }
          //   containerClass={ 'header_buttons_container' }
          //   enableButton={ true }
          //   history={ props.history }
          // />
  //   )
  // })

  return(
    <DefaultButtonsContainer
      buttons={ footerLinkButtons }
      buttonClass={ 'footer_link' }
      buttonContainerClass={ 'footer_link_container' }
      containerClass={ 'footer_links_container' }
      enableButton={ true }
      history={ props.history }
    />
  )
}

export default FooterLinks

      // {/* { distribFooterLinkButtons } */}