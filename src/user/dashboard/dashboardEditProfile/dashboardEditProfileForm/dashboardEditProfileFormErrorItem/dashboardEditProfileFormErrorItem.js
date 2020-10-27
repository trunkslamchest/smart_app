import React from 'react'

import './dashboardEditProfileFormErrorItem.css'

const DashboardEditProfileFormErrorItem = (props) => {
  return(
    <> { props.error &&
      <div className='edit_profile_form_error_item_container'>
        <span>
          { props.error }
        </span>
      </div>
    } </>
  )
}

export default DashboardEditProfileFormErrorItem