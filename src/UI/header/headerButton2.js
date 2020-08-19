import React from 'react'

import './headerButton2.css'

const HeaderButton2 = (props) => {
  return(
    <button
      className='header_button2'
      name={props.name}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default HeaderButton2