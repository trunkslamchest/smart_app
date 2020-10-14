import React from 'react'
import { NavLink } from 'react-router-dom'

import './resultsNavBarButton.css'

const ResultsNavBarButton = (props) => {
  return(
    <NavLink
      to={ props.link }
      name={ props.name }
      className='results_navbar_button'
      activeClassName='results_navbar_button_active'
    >
      { props.children }
    </NavLink>
  )
}

export default ResultsNavBarButton