import React from 'react'
import { NavLink } from 'react-router-dom'

import './dashboardNavBarButton.css'

const DashboardNavBarButton = (props) => {
  return(
    <NavLink
      to={ props.link }
      name={ props.name }
      className='dashboard_navbar_button'
      activeClassName='dashboard_navbar_button_active'
    >
      { props.children }
    </NavLink>
  )
}

export default DashboardNavBarButton