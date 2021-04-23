const makeDashboardProfileHeaderButtons = (onClickButtonFunction, onDelete, user_name, routes) => {
  return [
    {
      id: 'edit_profile_button',
      name: 'editProfileButton',
      onClickFunction: onClickButtonFunction,
      params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      target: '_blank',
      text: 'Edit Profile',
      type: 'button'
    },
    {
      id: 'view_public_profile_button',
      name: 'viewPublicProfileButton',
      onClickFunction: onClickButtonFunction,
      params: JSON.stringify({ route: routes.user_profile + '/' + user_name }),
      target: '_blank',
      text: 'View Public Profile',
      type: 'button'
    },
    {
      id: 'delete_profile_button',
      name: 'deleteProfileButton',
      onClickFunction: onDelete,
      target: '_blank',
      text: 'Delete Profile',
      type: 'button'
    }
  ]
}

export default makeDashboardProfileHeaderButtons