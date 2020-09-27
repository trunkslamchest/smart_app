import React from 'react'
import { NavLink } from 'react-router-dom'

import './playButton.css'

const PlayButton = (props) => {
  return(
    <NavLink
      exact to={ props.link }
      name={ props.buttonName }
      className={props.classType }
      onClick={ props.onClick }
    >
      { props.children }
    </NavLink>
  )
}

export default PlayButton