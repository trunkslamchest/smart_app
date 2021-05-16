import React from 'react'

import './modalSubHeader.css'

const ModalSubHeader = (props) => {

  return(
    <div className='modal_sub_header'>
      <div className='modal_sub_header_top'>
        <h5>{ !!props.sub_header_text && props.sub_header_text }</h5>
      </div>
        <div className='modal_sub_header_bottom'>
          { !!props.sub_text && props.sub_text }
        </div>
    </div>
  )
}

export default ModalSubHeader