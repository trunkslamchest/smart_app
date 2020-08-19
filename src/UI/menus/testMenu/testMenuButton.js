import React from 'react'
import { NavLink } from 'react-router-dom'

const testButton = (props) => {
  return(
    <NavLink
      exact to={props.link}
      name={props.name}
      className='testMenuButton'
      activeClassName='default_active'
      onClick={props.onClick}
    >
      {props.children}
    </NavLink>
  )
}

export default testButton