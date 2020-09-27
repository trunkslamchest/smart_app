import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderButton = (props) => {
  return(
    <NavLink
      menu={ props.menu }
      exact to={ props.link }
      name={ props.name }
      className='myProfileMenuButton'
      activeClassName='default_active'
      onClick={ props.onClick }
    >
      { props.children }
    </NavLink>
  )
}

export default HeaderButton