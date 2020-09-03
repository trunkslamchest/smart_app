import React from 'react'
import { NavLink } from 'react-router-dom'

import './headerButton.css'

const HeaderButton = (props) => {
  return(
    <NavLink
      menu={props.menu}
      activeClassName='default_active'
      exact to={props.link}
      className='default_header_link'
      name={props.name}
    >
      {props.children}
    </NavLink>
  )
}

export default HeaderButton