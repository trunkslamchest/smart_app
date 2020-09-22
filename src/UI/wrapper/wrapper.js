import React from 'react'

import './wrapper.css'

const Wrapper = (props) => {
  return(
    <div className='empty_wrapper'>
      { props.children }
    </div>
  )
}

export default Wrapper