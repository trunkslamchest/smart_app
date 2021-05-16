import React from 'react'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './dashboardHeader.css'

const DashboardHeader = (props) => {

  return(
    <div className='dashboard_header'>
      <div className='dashboard_header_left'>
        <h3>{ props.header_text }</h3>
      </div>
        <div className='dashboard_header_right'>
          { !!props.sub_text && <span>{ props.sub_text }</span> }
          { !!props.buttons &&
            <DefaultButtonsContainer
              buttons={ props.buttons }
              button_class={ 'dashboard_header_button' }
              containerClass={ 'dashboard_buttons_header_container' }
              enableButton={ true }
            />
          }
        </div>
    </div>
  )
}

export default DashboardHeader