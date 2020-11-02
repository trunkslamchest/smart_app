import React from 'react'

import './dashboardHeaderButton.css'
import './dashboardFormButton.css'


const dashboardButton = (props) => {


  return(
    <props.type
      className={ props.enableButtons ? props.button_class : `${props.button_class}_disabled` }
      id={ props.id }
      name={ props.name }
      onClick={ props.onClickFunction }
      target={ props.target }
      to={ props.route }
      type={ props.form_type }
      value={ props.value }
    >
      { props.form_type ? props.children : props.value }
    </props.type>
  )
}

export default dashboardButton