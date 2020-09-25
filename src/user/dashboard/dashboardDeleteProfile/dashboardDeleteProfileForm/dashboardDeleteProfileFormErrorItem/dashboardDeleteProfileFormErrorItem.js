import React from 'react'

import './dashboardDeleteProfileFormErrorItem.scss'

const DashboardDeleteProfileFormErrorItem = (props) => {
  return(
    <div className='delete_profile_error_item'>
      err{ props.error.code }: { props.error.msg }
    </div>
  )
}

export default DashboardDeleteProfileFormErrorItem