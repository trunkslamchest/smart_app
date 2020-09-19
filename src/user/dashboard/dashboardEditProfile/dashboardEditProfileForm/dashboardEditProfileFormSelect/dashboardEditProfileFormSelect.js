import React from 'react'

const DashboardEditProfileFormSelect = (props) => {
  return(
    <select
      id={ props.id }
      name={ props.name }
      onChange={ props.onChange }
      value={ props.value }
    >
      { props.options.map ( option => <option value={option} key={props.options.indexOf(option)}>{option}</option> )}
    </select>
  )
}

export default DashboardEditProfileFormSelect