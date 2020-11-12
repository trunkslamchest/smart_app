import React from 'react'

import './containerSpan.css'

const ContainerSpan = (props) => {

  return(
    <div className='container_span'>
      <span>{ !!props.span_text && props.span_text }</span>
    </div>
  )
}

export default ContainerSpan