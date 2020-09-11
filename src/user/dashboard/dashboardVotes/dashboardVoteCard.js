import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardVotes.css'

class DashboardVoteCard extends React.Component {
  render(){
    const vote_header_switch =
      (() => {
        switch(this.props.votedQuestion.vote) {
          case 'good': return "vote_card_header_upvote";
          case 'neutral': return "vote_card_header";
          case 'bad': return "vote_card_header_downvote";
          default: return "vote_card_header";
        }
      })()

    return(
      <div className="vote_card">
        <div className={ vote_header_switch }>
          <h3>{ this.props.votedQuestion.question }</h3>
        </div>
        <span><h4>Difficulty</h4> { this.props.votedQuestion.difficulty }</span>
        <span><h4>Category</h4> { this.props.votedQuestion.category }</span>
        <span><h4>Correct Answer</h4> { this.props.votedQuestion.correct_answer }</span>
        <span><h4>Your Answer</h4> { this.props.votedQuestion.answer }</span>
        <span><h4>Result</h4> { this.props.votedQuestion.result }</span>
        <span><h4>Your Vote</h4> { this.props.votedQuestion.vote }</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardVoteCard)