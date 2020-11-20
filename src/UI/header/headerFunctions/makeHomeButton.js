const makeHomeButton = (iconsIndex, onPushLink, routes) => {
  return [
    {
      buttonClass: 'home_button',
      buttonType: 'link',
      id: 'header_home_button',
      image: iconsIndex.homeWhiteIcon,
      imageHover: iconsIndex.homeBlackIcon,
      name: 'HomeButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.home }),
    }
  ]
}

export default makeHomeButton