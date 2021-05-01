const makeFooterLinkButtons = (routes) => {
    // { name: 'footerDisclaimer', id: 'footer_disclaimer_button', route: routes.disclaimer, text: 'Disclaimer' },
    // { name: 'footerLicense', id: 'footer_license_button', route: routes.license, text: 'License' },
    // { name: 'footerPrivacyPolicy', id: 'footer_privacy_button', route: routes.privacy, text: 'Privacy Policy' },
    // { name: 'footerTOS', id: 'footer_tos_button', route: routes.tos, text: 'Terms of Service' }
  return [
    {
      buttonType: 'NavLink',
      id: 'footer_disclaimer_button',
      name: 'footerDisclaimer',
      // onClickFunction: onClickButtonFunction,
      // params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      route: routes.disclaimer,
      // target: '_blank',
      text: 'Disclaimer'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_license_button',
      name: 'footerLicense',
      // onClickFunction: onClickButtonFunction,
      // params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      route: routes.license,
      // target: '_blank',
      text: 'License'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_privacy_button',
      name: 'footerPrivacyPolicy',
      // onClickFunction: onClickButtonFunction,
      // params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      route: routes.privacy,
      // target: '_blank',
      text: 'Privacy Policy'
    },
    {
      buttonType: 'NavLink',
      id: 'footer_tos_button',
      name: 'footerTOS',
      // onClickFunction: onClickButtonFunction,
      // params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      route: routes.tos,
      // target: '_blank',
      text: 'Terms of Service'
    },
  ]
}

export default makeFooterLinkButtons