const makeFooterLinkButtons = (onPushLink, routes) => {
    // { name: 'footerDisclaimer', id: 'footer_disclaimer_button', route: routes.disclaimer, text: 'Disclaimer' },
    // { name: 'footerLicense', id: 'footer_license_button', route: routes.license, text: 'License' },
    // { name: 'footerPrivacyPolicy', id: 'footer_privacy_button', route: routes.privacy, text: 'Privacy Policy' },
    // { name: 'footerTOS', id: 'footer_tos_button', route: routes.tos, text: 'Terms of Service' }
  return [
    {
      buttonType: 'NavLink',
      id: 'footer_disclaimer_button',
      name: 'footerDisclaimer',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.disclaimer }),
      route: routes.disclaimer,
      // target: '_blank',
      text: 'Disclaimer'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_license_button',
      name: 'footerLicense',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.license }),
      route: routes.license,
      // target: '_blank',
      text: 'License'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_privacy_button',
      name: 'footerPrivacyPolicy',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.privacy }),
      route: routes.privacy,
      // target: '_blank',
      text: 'Privacy Policy'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_tos_button',
      name: 'footerTOS',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.tos }),
      route: routes.tos,
      // target: '_blank',
      text: 'Terms of Service'
    },
  ]
}

export default makeFooterLinkButtons