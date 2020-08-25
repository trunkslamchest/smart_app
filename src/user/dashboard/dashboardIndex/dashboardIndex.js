import React from 'react'

import { connect} from 'react-redux'

// import { useEffect } from 'react'

const DashboardIndex = (props) => {
  return(
    <div className='dashboard_index'>
      <div className='alt_header'>
        <h3>{!!props.user.info && `Welcome, ${props.user.info.user_name}!`}</h3>
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