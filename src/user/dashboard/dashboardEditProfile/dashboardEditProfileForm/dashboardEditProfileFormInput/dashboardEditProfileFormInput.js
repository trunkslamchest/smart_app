import React from 'react'

const DashboardEditProfileFormInput = (props) => {
  return(
    <input
      className={ props.className ? props.className : null }
      disabled={ !props.enableInputs }
      id={ props.id }
      max={ props.max ? props.max : null }
      min={ props.min ? props.min : null }
      name={ props.name }
      onChange={ props.onChange ? props.onChange : null }
      onClick={ props.onClick ? props.onClick : null }
      placeholder={ props.placeholder ? props.placeholder : null }
      type={ props.type }
      value={ props.value ? props.value : '' }
    />
  )
}

export default DashboardEditProfileFormInput