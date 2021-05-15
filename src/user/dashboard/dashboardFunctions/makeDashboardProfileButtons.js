const makeDashboardProfileHeaderButtons = (onClickButtonFunction, onDelete, user_name, routes) => {
  return [
    //   buttonClass: 'header_home_button',
    //   buttonType: 'NavLink',
    //   // buttonType: 'link',
    //   id: 'header_home_button',
    //   image: iconsIndex.homeWhiteIcon,
    //   imageHover: iconsIndex.homeBlackIcon,
    //   name: 'HomeButton',
    //   homeButton: true,
    //   onClickFunction: onPushLink,
    //   params: JSON.stringify({ route: routes.home }),
    //   route: routes.home
    // }
    {
      buttonType: 'NavLink',
      id: 'edit_profile_button',
      name: 'editProfileButton',
      onClickFunction: onClickButtonFunction,
      params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      route: routes.dashboard_profile_edit,
      target: '_blank',
      text: 'Edit Profile',
      tooltipText: [ 'Edit Your Profile' ]

    },
    {
      buttonType: 'NavLink',
      id: 'view_public_profile_button',
      name: 'viewPublicProfileButton',
      onClickFunction: onClickButtonFunction,
      params: JSON.stringify({ route: routes.user_profile + '/' + user_name }),
      route: routes.user_profile + '/' + user_name,
      target: '_blank',
      text: 'View Public Profile',
      tooltipText: [ 'View Your Public Profile' ]

    },
    {
      buttonType: 'button',
      id: 'delete_profile_button',
      name: 'deleteProfileButton',
      onClickFunction: onDelete,
      target: '_blank',
      text: 'Delete Profile',
      tooltipText: [ 'Delete Your Profile' ]

    }
  ]
}

export default makeDashboardProfileHeaderButtons