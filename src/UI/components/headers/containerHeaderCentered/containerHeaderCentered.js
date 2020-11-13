import React from 'react'

import './containerHeaderCentered.css'

const ContainerHeaderCentered = (props) => {

  return(
    <div className='container_header_centered'>
      <div className='container_header_centered_text'>
        <h1>{ !!props.header_text && props.header_text }</h1>
      </div>
    </div>
  )
}

export default ContainerHeaderCentered