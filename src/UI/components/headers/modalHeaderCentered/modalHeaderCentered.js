import React from 'react'

import './modalHeaderCentered.css'
import './modalHeaderCenteredResponse.css'

const ModalHeaderCentered = (props) => {

  return(
    <div className='modal_header_centered'>
      <div className='modal_header_centered_top'>
        <h3>{ !!props.header_text && props.header_text }</h3>
      </div>
        <div className='modal_header_centered_bottom'>
          { !!props.sub_text && props.sub_text }
        </div>
    </div>
  )
}

export default ModalHeaderCentered