import React from 'react'

import { NavLink } from 'react-router-dom'

const FooterLink = (props) => {
  return(
    <NavLink
      exact to={props.link}
      name={props.name}
      className='footer_link'
      activeClassName='footer_link_active'
      target='_blank'
    >
      {props.children}
    </NavLink>
  )
}

export default FooterLink