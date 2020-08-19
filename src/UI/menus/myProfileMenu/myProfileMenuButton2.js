import React from 'react'

const MyProfileMenuButton2 = (props) => {
  return(
    <button
      name={props.name}
      className='myProfileMenuButton'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default MyProfileMenuButton2