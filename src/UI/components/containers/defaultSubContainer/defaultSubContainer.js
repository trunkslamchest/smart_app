import React from 'react'

import './defaultSubContainer.css'

const DefaultSubContainer = (props) => {

  return(
    <div className={ props.containerClass }>
      { props.blocks }
    </div>
  )
}

export default DefaultSubContainer