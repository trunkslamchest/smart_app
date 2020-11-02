import React from 'react'
// import { Link } from 'react-router-dom'
// import { routes } from '../../../../utility/paths.js'
// import { connect } from 'react-redux'
// import * as actions from '../../../../store/actions/actionIndex'

import DashboardButton from '../../dashboardComponents/dashboardButton/dashboardButton'

import './dashboardButtonsContainer.css'

const DashboardButtonsContainer = (props) => {

  const distribButtons = props.buttons.map((button, index) => {
    return(
      <DashboardButton
        button_class={ props.button_class }
        enableButtons={ props.enableButtons }
        form_type={ !!button.form_type ? button.form_type : null }
        id={ button.idName }
        key={ index }
        name={ button.idName }
        onClickFunction={ !!button.onClickFunction ? button.onClickFunction : null }
        route={ !!button.route ? button.route : null }
        target={ !!button.target ? button.target : null }
        type={ button.type }
        value={ button.value }
      />
    )
  })

  return(
    <div className={ props.container_class }>
      { distribButtons }
    </div>
  )
}

export default DashboardButtonsContainer
