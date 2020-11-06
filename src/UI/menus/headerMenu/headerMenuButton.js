import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderMenuButton = (props) => {

  const onClickFunction = (event) => {
    props.onSwitchMenu()
    if(props.args) props.onClick(event, props.args)
    else props.onClick(event)
  }

  let headerButton

  if(props.link)
    headerButton =
      <NavLink
        exact to={ props.link }
        name={ props.name }
        className='header_menu_button'
        activeClassName='default_active'
        onClick={ onClickFunction }
      >
        { props.children }
      </NavLink>
  else
    headerButton =
      <button
        name={ props.name }
        className='header_menu_button'
        onClick={ onClickFunction }
      >
        { props.children }
      </button>

  return(
    <>{ headerButton }</>
  )
}

export default HeaderMenuButton