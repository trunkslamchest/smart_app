import React from 'react'

const HeaderMenuButton2 = (props) => {
  return(
    <button
      menu={ props.menu }
      name={ props.name }
      className='header_menu_button2'
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  )
}

export default HeaderMenuButton2