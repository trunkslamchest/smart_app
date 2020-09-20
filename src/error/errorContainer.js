import React from 'react'

import './errorContainer.scss'

const ErrorContainer = (props) => {
  return(
    <div className='error_container'>
      <div className='error_item'>
        ERROR { props.error.code }: { props.error.message }
      </div>
    </div>
  )
}

export default ErrorContainer