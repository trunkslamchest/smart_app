const makeFooterLogoButton = (image, imageHover, onClickFunctions, route) => {
  return [
    {
      buttonClass: 'footer_logo_button',
      buttonType: 'NavLink',
      id: 'footer_logo_button',
      image: image,
      imageHover: imageHover,
      name: 'footerLogoButton',
      homeButton: true,
      onClickFunction: onClickFunctions,
      params: JSON.stringify({ route: route }),
      route: route
    }
  ]
}

export default makeFooterLogoButton