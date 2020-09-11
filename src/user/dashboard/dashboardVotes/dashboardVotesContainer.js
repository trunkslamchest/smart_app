import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardVoteCard from './dashboardVoteCard'

import './dashboardVotes.css'

class DashboardVotesContainer extends React.Component {
  render(){

    let distribVotes

    const noVotesHeader =
      <div className="dashboard_alt_header">
        <h4> You have not voted on any questions yet!</h4>
      </div>

    if(this.props.user.questions){
      if(this.props.user.questions.votes){
        let questions = Object.values(this.props.user.questions.votes)
        distribVotes = questions.map(question =>
          typeof question === 'object' ?
            <DashboardVoteCard
              key={questions.indexOf(question) + 1}
              votedQuestion={question}
            />
          : null
        )
      } else {
        distribVotes = noVotesHeader
      }
    }

    return(
      <div className={ "votes_wrapper"}>
        { distribVotes }
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardVotesContainer)