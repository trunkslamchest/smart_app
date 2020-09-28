import React from 'react'
import { connect } from 'react-redux'

import DashboardCommentCard from './dashboardCommentCard/dashboardCommentCard'

import './dashboardComments.css'

class DashboardCommentsContainer extends React.Component {

  componentDidMount(){ document.title = "SmartApp™ | Dashboard | Comments" }

  render(){

    let distribComments

    const noCommentsHeader =
      <div className="dashboard_alt_header">
        <h4> You have not commented on any questions</h4>
      </div>

    if(this.props.user.questions){
      if(this.props.user.questions.comments){
        let questions = Object.entries(this.props.user.questions.comments)
        distribComments = questions.map(question =>
          typeof question[1] === 'object' &&
            <DashboardCommentCard
              key={ questions.indexOf(question) + 1 }
              cid={ question[0] }
              commentedQuestion={ question[1] }
            />
        )
      } else distribComments = noCommentsHeader
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

export default connect(mapStateToProps)(DashboardCommentsContainer)