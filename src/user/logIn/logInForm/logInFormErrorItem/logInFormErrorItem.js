import React from 'react'

import './logInFormErrorItem.scss'

const LogInFormErrorItem = (props) => {
  return(
    <div className='log_in_error_item'>
      err{ props.error.code }: { props.error.message }
    </div>
  )
}

export default LogInFormErrorItem