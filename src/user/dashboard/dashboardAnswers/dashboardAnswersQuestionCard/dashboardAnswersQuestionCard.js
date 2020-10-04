import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardAnswersQuestionCard.css'

class DashboardAnswersQuestionCard extends React.Component {

  render(){

    let question = this.props.question[1], distribComments, vote

    if(question.vote) vote = <span>Your Vote: {Object.values(question.vote)[0].vote} </span>

    if(question.comments){
      let comments = Object.entries(question.comments)
      distribComments= comments.map(comment => <span key={ comments.indexOf(comment) }>Comment: { comment[1].comment } Timestamp: { comment[1].timestamp }</span>)
    }

    return(
      <div className='dashboard_answers_question_card_container'>
        <div className='dashboard_answers_question_card'>
          <h5>{ question.question }</h5>
          <span>Your Answer: { question.answer }</span>
          <span>Correct Answer: { question.correct_answer }</span>
          <span>Your Time: { question.time } seconds</span>
          <span>Your Performance:</span>
          <span>Rank: { question.performance.rank } Rating: { question.performance.rating }</span>
          { question.vote && vote }
          { question.comments && <span>Your Comments: { distribComments }</span> }
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnswersQuestionCard)