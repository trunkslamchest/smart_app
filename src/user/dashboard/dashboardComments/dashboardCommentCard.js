import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardComments.css'

class DashboardCommentCard extends React.Component {
  render(){
    const comment_header_switch =
      (() => {
        switch(this.props.commentedQuestion.result) {
          case 'Correct': return "comment_card_header_correct";
          case 'Incorrect': return "comment_card_header_incorrect";
          case 'Outta Time': return "comment_card_header_incorrect";
          default: return "comment_card_header";
        }
      })()

    return(
      <div className="comment_card">
        <div className={ comment_header_switch }>
          <h3>{ this.props.commentedQuestion.question }</h3>
        </div>
        <span><h4>Difficulty</h4> { this.props.commentedQuestion.difficulty }</span>
        <span><h4>Category</h4> { this.props.commentedQuestion.category }</span>
        <span><h4>Correct Answer</h4> { this.props.commentedQuestion.correct_answer }</span>
        <span><h4>Your Answer</h4> { this.props.commentedQuestion.answer }</span>
        <span><h4>Result</h4> { this.props.commentedQuestion.result }</span>
        <span><h4>Your Comment</h4> { this.props.commentedQuestion.comment }</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCommentCard)