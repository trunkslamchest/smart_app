import React from 'react'

import './modalHeader.css'

const ModalHeader = (props) => {

  return(
    <div className='modal_header'>
      <div className='modal_header_top'>
        <h3>{ !!props.header_text && props.header_text }</h3>
      </div>
        <div className='modal_header_bottom'>
          { !!props.sub_text && props.sub_text }
        </div>
    </div>
  )
}

export default ModalHeader