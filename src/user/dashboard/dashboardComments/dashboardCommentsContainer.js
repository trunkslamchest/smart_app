import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardCommentCard from './dashboardCommentCard'

import './dashboardComments.css'

class DashboardCommentsContainer extends React.Component {
  render(){

    let distribComments

    const noCommentsHeader =
      <div className="dashboard_alt_header">
        <h4> You have not commented on any questions yet!</h4>
      </div>

    if(this.props.user.questions){
      if(this.props.user.questions.comments){
        let questions = Object.values(this.props.user.questions.comments)
        distribComments = questions.map(question =>
          typeof question === 'object' ?
            <DashboardCommentCard
              key={questions.indexOf(question) + 1}
              commentedQuestion={question}
            />
          : null
        )
      } else {
        distribComments = noCommentsHeader
      }
    }

    return(
      <div className={ "comment_wrapper"}>
        { distribComments }
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