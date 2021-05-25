import React from 'react'

import { connect} from 'react-redux'

import './dashboardIndex.css'

const DashboardIndex = (props) => {
  return(
    <div className='dashboard_index'>
      <div className='dashboard_index_header'>
        <h3>{`Welcome, ${props.userName}!`}</h3>
      </div>
    </div>
  )
}

const store = (store) => {
  return {
    userName: store.user.info.user_name
  }
}

export default connect(store)(DashboardIndex)