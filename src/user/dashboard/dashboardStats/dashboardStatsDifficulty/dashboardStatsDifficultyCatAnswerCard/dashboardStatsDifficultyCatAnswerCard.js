import React from 'react'

import './dashboardStatsDifficultyCatAnswerCard.css'

const DashboardStatsDifficultyCatAnswerCard = (props) => {

  let vote, distribComments

  if(props.answer.vote) vote = <span>Your Vote: { Object.values(props.answer.vote)[0].vote } </span>

  if(props.answer.comments){
    let comments = Object.entries(props.answer.comments)
    distribComments= comments.map(comment => <span key={ comments.indexOf(comment) }>Comment: { comment[1].comment } Timestamp: { comment[1].timestamp }</span>)
  }

  return(
    <div className="dashboard_stats_difficulty_cat_answer_card">
      <h5>{ props.answer.question }</h5>
      <span>Your Answer: { props.answer.answer }</span>
      <span>Correct Answer: { props.answer.correct_answer }</span>
      <span>Your Time: { props.answer.time } seconds</span>
      <span>Your Performance:</span>
      <span>Rank: { props.answer.performance.rank } Rating: { props.answer.performance.rating }</span>
      { props.answer.vote && vote }
      { props.answer.comments && <span>Your Comments: { distribComments }</span> }
    </div>
  )
}

export default DashboardStatsDifficultyCatAnswerCard