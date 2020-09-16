import React from 'react'

import './dashboardProfileError.css'

const DashboardProfileError = (props) => {

  // console.log(props)

  return(
    <li className='profile_error'>
      <span>
        { props.error }
      </span>
    </li>
  )
}

export default DashboardProfileError