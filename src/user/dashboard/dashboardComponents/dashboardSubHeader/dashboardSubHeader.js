import React from 'react'

import DashboardButtonsContainer from '../../dashboardContainers/dashboardButtonsContainer/dashboardButtonsContainer'

import './dashboardSubHeader.css'

const DashboardSubHeader = (props) => {

  return(
    <div className='dashboard_sub_header'>
      <div className='dashboard_sub_header_left'>
        <h3>{ props.header_text }</h3>
      </div>
        <div className='dashboard_sub_header_right'>
          { !!props.sub_text && <span>{ props.sub_text }</span> }
          { !!props.buttons &&
            <DashboardButtonsContainer
              buttons={ props.buttons }
              button_class={ 'dashboard_sub_header_button' }
              container_class={ 'dashboard_buttons_sub_header_container' }
              enableButtons={ true }
            />
          }
        </div>
    </div>
  )
}

export default DashboardSubHeader