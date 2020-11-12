import React from 'react'

import './containerHeader.css'

const ContainerHeader = (props) => {

  return(
    <div className='container_header'>
      <div className='container_header_left'>
        <h1>{ !!props.header_text && props.header_text }</h1>
      </div>
        <div className='container_header_right'>
          <h2>{ !!props.sub_text && props.sub_text }</h2>
        </div>
    </div>
  )
}

export default ContainerHeader