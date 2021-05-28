const makeDashboardProfileHeaderButtons = (glyphIndex, onClickButtonFunction, onDelete, user_name, routes) => {
  return [
    {
      buttonType: 'NavLink',
      id: 'edit_profile_button',
      image: glyphIndex.whiteEdit,
      imageHover: glyphIndex.greyEdit,
      name: 'editProfileButton',
      onClickFunction: onClickButtonFunction,
      params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      route: routes.dashboard_profile_edit,
      target: '_blank',
      tooltipText: [ 'Edit Your Profile' ]
    },
    {
      buttonType: 'NavLink',
      id: 'view_public_profile_button',
      image: glyphIndex.whiteView,
      imageHover: glyphIndex.greyView,
      name: 'viewPublicProfileButton',
      onClickFunction: onClickButtonFunction,
      params: JSON.stringify({ route: routes.user_profile + '/' + user_name }),
      route: routes.user_profile + '/' + user_name,
      target: '_blank',
      tooltipText: [ 'View Your Public Profile' ]
    },
    {
      buttonType: 'button',
      id: 'delete_profile_button',
      image: glyphIndex.whiteDelete,
      imageHover: glyphIndex.greyDelete,
      name: 'deleteProfileButton',
      onClickFunction: onDelete,
      target: '_blank',
      tooltipText: [ 'Delete Your Profile' ]
    }
  ]
}

export default makeDashboardProfileHeaderButtons