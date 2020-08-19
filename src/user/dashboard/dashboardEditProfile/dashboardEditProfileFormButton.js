import React from 'react'

const DashboardEditProfileFormButton = (props) => {
  return(
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      className='alt_button'
      onClick={props.onClick}
      value={props.value}
    />
  )
}

export default DashboardEditProfileFormButton