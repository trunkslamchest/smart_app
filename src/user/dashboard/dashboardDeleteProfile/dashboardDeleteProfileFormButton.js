import React from 'react'

const DashboardDeleteProfileFormButton = (props) => {
  return(
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      className='delete_profile_button'
      onClick={props.onClick}
      value={props.value}
    />
  )
}

export default DashboardDeleteProfileFormButton