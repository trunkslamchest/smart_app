import React from 'react'

import './docsSpan.css'

const DocsSpan = (props) => {

  return(
    <div className='docs_span'>
      <span>{ !!props.span_text && props.span_text }</span>
    </div>
  )
}

export default DocsSpan