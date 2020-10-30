import React from 'react'

import NavBarButton from './navBarButton/navBarButton'

import './navBarContainer.css'

const NavBarContainer = (props) => {
  const distribButtons = props.buttons.map(button =>
    <NavBarButton
      key={ props.buttons.indexOf(button) }
      link={ button.route }
      name={`dashboard_${button.name}_button`}
    >
      { button.text }
    </NavBarButton>
  )

  return(
    <div className='navbar_container'>
      <ul>
        { distribButtons }
      </ul>
    </div>
  )
}

export default NavBarContainer