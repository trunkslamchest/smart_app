import React from 'react'

import './dashboardDeleteProfileFormErrorItem.css'

const DashboardDeleteProfileFormErrorItem = (props) => {
  return(
    <div className='delete_profile_error_item'>
      err{ props.error.code }: { props.error.message }
    </div>
  )
}

export default DashboardDeleteProfileFormErrorItem