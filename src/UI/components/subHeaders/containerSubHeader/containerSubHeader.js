import React from 'react'

import './containerSubHeader.css'

const ContainerSubHeader = (props) => {

  return(
    <div className='container_sub_header'>
      <div className='container_sub_header_left'>
        <h4>{ !!props.header_text && props.header_text }</h4>
      </div>
        <div className='container_sub_header_right'>
          <h5>{ !!props.sub_text && props.sub_text }</h5>
        </div>
    </div>
  )
}

export default ContainerSubHeader