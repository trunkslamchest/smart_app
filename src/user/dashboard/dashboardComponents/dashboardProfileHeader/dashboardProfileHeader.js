import React from 'react'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './dashboardProfileHeader.css'

const DashboardProfileHeader = (props) => {

  return(
    <div className='dashboard_profile_header'>
      <div className='dashboard_profile_header_left'>
       <img
          alt={ `${props.user_name}'s Avatar` }
          className='dashboard_profile_header_left_img'
          src={ props.avatar }
          title={ `${props.user_name}'s Avatar` }
        />
        <div className='dashboard_profile_header_left_text'>
          <h3>{ props.user_name }</h3>
          <h5>{ props.email }</h5>
        </div>
      </div>
      <div className='dashboard_profile_header_right'>
        <DefaultButtonsContainer
          buttons={ props.buttons }
          containerClass={ props.containerClass }
          enableButton={ true }
        />
      </div>
    </div>
  )
}

export default DashboardProfileHeader