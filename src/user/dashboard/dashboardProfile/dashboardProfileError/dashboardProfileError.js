import React from 'react'

import './dashboardProfileError.css'

const DashboardProfileError = (props) => {
  return(
    <> { props.error &&
      <li className='profile_error'>
        <span>
          { props.error }
        </span>
      </li>
    } </>
  )
}

export default DashboardProfileError