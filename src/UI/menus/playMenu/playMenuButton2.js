import React from 'react'

const playMenuButton2 = (props) => {
  return(
    <button
      menu={ props.menu }
      name={ props.name }
      className='playMenuButton2'
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  )
}

export default playMenuButton2