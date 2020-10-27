import React from 'react'

import './dashboardEditProfileFormErrorItem.css'

const DashboardEditProfileFormErrorItem = (props) => {

  let errorBlock

  if(typeof props.error === 'string')
    errorBlock =
      <div className='edit_profile_form_error_item_container'>
        <span>{ props.error }</span>
      </div>

  if(typeof props.error === 'object')
    errorBlock =
      <div className='edit_profile_form_error_item_container'>
        <span>ERR_{ props.error.code }: { props.error.message }</span>
      </div>

  return(
    <>{ props.error && errorBlock }</>
  )
}

export default DashboardEditProfileFormErrorItem