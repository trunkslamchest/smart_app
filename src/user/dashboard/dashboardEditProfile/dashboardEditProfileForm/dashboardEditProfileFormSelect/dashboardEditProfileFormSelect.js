import React from 'react'

const DashboardEditProfileFormSelect = (props) => {
  return(
    <select
      disabled={ !props.enableInputs }
      id={ props.id }
      name={ props.name }
      onChange={ props.onChange }
      value={ props.value }
    >
      { props.name !== "country" && props.options.map( option => <option value={ option } key={props.options.indexOf(option)}>{ option }</option> )}
      { props.name === "country" && Object.entries(props.options).map( option => <option value={ option[0] } key={ Object.entries(props.options).indexOf(option[0]) + option[0]}>{ option[0] }</option> )}
    </select>
  )
}

export default DashboardEditProfileFormSelect