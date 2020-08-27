import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardComments.css'

class DashboardCommentsContainer extends React.Component {

  render(){
    return(
      <div className={ "comment_wrapper"}>
        {/* { this.state.userComments.length === 0 ? no_comments_header: distributeCombineQuestionsComments } */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCommentsContainer)