import React from 'react'

import './deleteProfileFormErrorItem.css'

const DeleteProfileFormErrorItem = (props) => {
  return(
    <div className='delete_profile_error_item'>
      err{ props.error.code }: { props.error.message }
    </div>
  )
}

export default DeleteProfileFormErrorItem