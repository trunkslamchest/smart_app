import React from 'react'

import './errorContainer.css'

const ErrorContainer = (props) => {
  return(
    <div className='error_container'>
      <div className='error_item'>
        ERROR { props.error.code }: { props.error.msg }
      </div>
    </div>
  )
}

export default ErrorContainer