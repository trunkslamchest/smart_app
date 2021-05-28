const makeHomeButton = (iconsIndex, onPushLink, routes) => {
  return [
    {
      buttonClass: 'header_home_button',
      buttonType: 'NavLink',
      id: 'header_home_button',
      image: iconsIndex.homeWhiteIcon,
      imageHover: iconsIndex.homeGreyIcon,
      name: 'HomeButton',
      homeButton: true,
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.home }),
      route: routes.home
    }
  ]
}

export default makeHomeButton