import React from 'react'

// import { useEffect } from 'react'

const DashboardIndex = (props) => {
  return(
    <div className='dashboard_index'>
      <div className='alt_header'>
        <h3>Welcome, {props.firstName}!</h3>
      </div>
    </div>
  )
}

export default DashboardIndex