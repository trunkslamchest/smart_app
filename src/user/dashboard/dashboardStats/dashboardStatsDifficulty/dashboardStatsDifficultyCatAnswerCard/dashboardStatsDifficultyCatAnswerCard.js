import React from 'react'

import green_check_mark from '../../../../../assets/glyphs/green_check_mark.png'
import red_x from '../../../../../assets/glyphs/red_x.png'


import './dashboardStatsDifficultyCatAnswerCard.css'

const DashboardStatsDifficultyCatAnswerCard = (props) => {

  let vote, distribComments, resultGlyph

    const incorrect_glyph =
      <img
        alt='Incorrect'
        className='result_glyph'
        src={ red_x }
      />

    const correct_glyph =
      <img
        alt='Correct'
        className='result_glyph'
        src={ green_check_mark }
      />

  if(props.answer.result === "Correct") resultGlyph = correct_glyph
  if(props.answer.result === "Incorrect") resultGlyph = incorrect_glyph
  if(props.answer.result === "Outta Time") resultGlyph = incorrect_glyph

  

  if(props.answer.vote) vote = <span>Your Vote: { Object.values(props.answer.vote)[0].vote } </span>
  else vote = <span>You haven't voted on this question yet</span>

  if(props.answer.comments){
    let comments = Object.entries(props.answer.comments)
    distribComments = <span>Your Comments: { comments.map(comment => <span key={ comments.indexOf(comment) }>Comment: { comment[1].comment } Timestamp: { comment[1].timestamp }</span>) }</span>
  } else distribComments = <span>You haven't commented on this question yet</span>

  return(
    <div className="dashboard_stats_difficulty_cat_answer_card">
      <div className="dashboard_stats_difficulty_cat_answer_card_header">
        <h5>{ props.answer.question }</h5>
        { resultGlyph }
      </div>

      <div className="dashboard_stats_difficulty_cat_answer_card_wrapper">

        <div className="dashboard_stats_difficulty_cat_answer_card_left">
          <div className="dashboard_stats_difficulty_cat_answer_card_perf_container">
            <div className="dashboard_stats_difficulty_cat_answer_card_perf_rank_container">
              <h4>Rank</h4>
              <span>{ props.answer.performance.rank }</span>
            </div>
            <div className="dashboard_stats_difficulty_cat_answer_card_perf_rating_container">
              <h4>Rating</h4>
              <span>{ props.answer.performance.rating }</span>
            </div>
          </div>
          <div className="dashboard_stats_difficulty_cat_answer_card_answer_container">
            <span>Your Answer: { props.answer.answer }</span>
            <span>Correct Answer: { props.answer.correct_answer }</span>
          </div>
          <div className="dashboard_stats_difficulty_cat_answer_card_time_container">
            <span>Your Time: { props.answer.time } seconds</span>
          </div>
        </div>

        <div className="dashboard_stats_difficulty_cat_answer_card_right">
          <div className="dashboard_stats_difficulty_cat_answer_card_vote_container">
            { vote }
          </div>

          <div className="dashboard_stats_difficulty_cat_answer_card_comment_container">
            { distribComments }
          </div>

        </div>

      </div>

    </div>
  )
}

export default DashboardStatsDifficultyCatAnswerCard