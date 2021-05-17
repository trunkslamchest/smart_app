const makeFooterLinkButtons = (onPushLink, routes) => {
  return [
    {
      buttonType: 'NavLink',
      id: 'footer_disclaimer_button',
      name: 'footerDisclaimer',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.disclaimer }),
      route: routes.disclaimer,
      text: 'Disclaimer'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_license_button',
      name: 'footerLicense',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.license }),
      route: routes.license,
      text: 'License'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_privacy_button',
      name: 'footerPrivacyPolicy',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.privacy }),
      route: routes.privacy,
      text: 'Privacy Policy'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_tos_button',
      name: 'footerTOS',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.tos }),
      route: routes.tos,
      text: 'Terms of Service'
    },
  ]
}

export default makeFooterLinkButtons