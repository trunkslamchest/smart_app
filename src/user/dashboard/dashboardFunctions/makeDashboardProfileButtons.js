const makeDashboardProfileHeaderButtons = (onClickHeaderButtonFunction, user_name, routes) => {
  return [
    {
      id: 'edit_profile_button',
      // buttonClass: 'dashboard_profile_header_button',
      name: 'editProfileButton',
      onClickFunction: onClickHeaderButtonFunction,
      params: JSON.stringify({ route: routes.dashboard_profile_edit }),
      target: '_blank',
      text: 'Edit Profile',
      type: 'button'
    },
    {
      id: 'view_public_profile_button',
      // buttonClass: 'dashboard_profile_header_button',
      name: 'viewPublicProfileButton',
      onClickFunction: onClickHeaderButtonFunction,
      params: JSON.stringify({ route: routes.user_profile + '/' + user_name }),
      target: '_blank',
      text: 'View Public Profile',
      type: 'button'
    }
    ]
}

export default makeDashboardProfileHeaderButtons