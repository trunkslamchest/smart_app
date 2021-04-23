import React from 'react'

import './docsHeader.css'

const DocsHeader = (props) => {

  return(
    <div className='docs_header'>
      <div className='docs_header_left'>
        <h1>{ !!props.header_text && props.header_text }</h1>
      </div>
        <div className='docs_header_right'>
          <h2>{ !!props.sub_text && props.sub_text }</h2>
        </div>
      <div className='divider_left' />
    </div>
  )
}

export default DocsHeader