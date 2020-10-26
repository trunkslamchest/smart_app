import React from 'react'

const DashboardEditProfileFormTextArea = (props) => {
  return(
    <textarea
      rows="3"
      className={ props.className ? props.className : null }
      id={ props.id }
      name={ props.name }
      onChange={ props.onChange ? props.onChange : null }
      placeholder={ props.placeholder ? props.placeholder : null }
      value={ props.value ? props.value : '' }
    />
  )
}

export default DashboardEditProfileFormTextArea