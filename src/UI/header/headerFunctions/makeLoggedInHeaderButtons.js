const makeLoggedInHeaderButtons = (iconsIndex, onPushLink, playMenuButtons, profileMenuButtons, avatar, routes) => {
  return [
    {
      buttonClass: 'header_button',
      buttonType: 'link',
      id: 'header_leader_board_button',
      image: iconsIndex.leaderboardWhiteIcon,
      imageHover: iconsIndex.leaderboardBlackIcon,
      name: 'LeaderboardsButton',
      onClickFunction: onPushLink,
      params: JSON.stringify({ route: routes.leader_boards + '/overall' }),
      tooltipText: [ 'Leaderboards' ]
    },
    {
      buttonClass: 'header_button',
      buttonType: 'menu',
      id: 'header_play_button',
      image: iconsIndex.playWhiteIcon,
      imageHover: iconsIndex.playBlackIcon,
      name: 'PlayButton',
      menuButtons: playMenuButtons,
      tooltipText: [ 'Play' ]
    },
    {
      buttonClass: 'header_profile_button',
      buttonType: 'menu',
      id: 'header_profile_button',
      image: avatar,
      imageHover: avatar,
      name: 'ProfileButton',
      menuButtons: profileMenuButtons,
      tooltipText: [ 'My Profile' ]
    },
  ]
}

export default makeLoggedInHeaderButtons