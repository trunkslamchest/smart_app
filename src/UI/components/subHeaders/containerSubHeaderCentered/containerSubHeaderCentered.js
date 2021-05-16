import React from 'react'

import './containerSubHeaderCentered.css'

const ContainerSubHeaderCentred = (props) => {

  return(
    <div className='container_sub_header_centered'>
      <div className='container_sub_header_centered_text'>
        <h3>{ !!props.header_text && props.header_text }</h3>
      </div>
    </div>
  )
}

export default ContainerSubHeaderCentred