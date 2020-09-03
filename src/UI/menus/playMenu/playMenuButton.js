import React from 'react'
import { NavLink } from 'react-router-dom'

const playMenuButton = (props) => {
  return(
    <NavLink
      menu={props.menu}
      exact to={props.link}
      name={props.name}
      className='playMenuButton'
      activeClassName='default_active'
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  )
}

export default playMenuButton