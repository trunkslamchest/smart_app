const makeHomeButton = (iconsIndex, onPushLink, routes) => {
  // <HeaderIconButtonContainer
  //   buttonClass='header_home_button'
  //   buttonType='link'
  //   history={ props.history }
  //   icon={ iconsIndex.homeWhiteIcon }
  //   iconClass="header_home_icon"
  //   iconHover={ iconsIndex.homeBlackIcon }
  //   id="header_home_button"
  //   key="0header_home_button"
  //   name="headerHomeButton"
  //   route={ routes.home }
  // />

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