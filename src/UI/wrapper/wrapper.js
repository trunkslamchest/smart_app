import React from 'react'

import './wrapper.css'

const Wrapper = (props) => {
  return(
    <div className='main_wrapper'>
      { props.children }
    </div>
  )
}

export default Wrapper