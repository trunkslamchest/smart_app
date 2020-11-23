import React from 'react'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

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
            <DefaultButtonsContainer
              buttons={ props.buttons }
              button_class={ 'dashboard_sub_header_button' }
              containerClass={ 'dashboard_buttons_sub_header_container' }
              enableButtons={ true }
            />
          }
        </div>
    </div>
  )
}

export default DashboardSubHeader