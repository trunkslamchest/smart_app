const makeFooterLogoButton = (footerLogosIndex, onClickFunctions, route) => {
  return [
    {
      buttonClass: 'footer_logo_button',
      buttonType: 'NavLink',
      id: 'footer_logo_button',
      image: footerLogosIndex.whiteFooterLogo,
      imageHover: footerLogosIndex.greyFooterLogo,
      name: 'footerLogoButton',
      homeButton: true,
      onClickFunction: onClickFunctions,
      params: JSON.stringify({ route: route }),
      route: route
    }
  ]
}

export default makeFooterLogoButton