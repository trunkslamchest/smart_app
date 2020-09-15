import React from 'react'

import { connect} from 'react-redux'

const DashboardIndex = (props) => {
  return(
    <div className='dashboard_index'>
      <div className='alt_header'>
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