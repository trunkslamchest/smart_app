import React from 'react'

import { connect} from 'react-redux'

import './dashboardIndex.css'

const DashboardIndex = (props) => {
  return(
    <div className='dashboard_index'>
      <div className='dashboard_index_header'>
        <h3>{`Welcome, ${props.user.info.user_name}!`}</h3>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashboardIndex)