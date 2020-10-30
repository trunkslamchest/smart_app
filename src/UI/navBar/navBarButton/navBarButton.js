import React from 'react'
import { NavLink } from 'react-router-dom'

import './navBarButton.css'

const NavBarButton = (props) => {
  return(
    <NavLink
      to={ props.link }
      name={ props.name }
      className='navbar_button'
      activeClassName='navbar_button_active'
    >
      { props.children }
    </NavLink>
  )
}

export default NavBarButton