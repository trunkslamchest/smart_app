import React from 'react'

const DashboardEditProfileFormInput = (props) => {
  return(
    <input
      type={ props.type }
      id={ props.id }
      name={ props.name }
      className={ props.className ? props.className : null }
      placeholder={ props.placeholder ? props.placeholder : null }
      min={ props.min ? props.min : null }
      max={ props.max ? props.max : null }
      onChange={ props.onChange ? props.onChange : null }
      onClick={ props.onClick ? props.onClick : null }
      value={ props.value ? props.value : '' }
    />
  )
}

export default DashboardEditProfileFormInput