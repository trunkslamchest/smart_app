import React from 'react'

import './homeGreeting.css'

const HomeGreeting = (props) => {

  return(
    <div className='home_logged_in_greeting'>
      <h1>Hi, { props.user_name }!</h1>
    </div>
  )
}

export default HomeGreeting