import React from 'react'

import './containerP.css'

const ContainerP = (props) => {

  return(
    <div className='container_p'>
      <p>{ !!props.p_text && props.p_text }</p>
    </div>
  )
}

export default ContainerP