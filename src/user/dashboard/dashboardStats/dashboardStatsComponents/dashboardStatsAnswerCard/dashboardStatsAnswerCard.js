import React from 'react'

import { routes } from '../../../../../utility/paths'


import green_check_mark from '../../../../../assets/glyphs/green_check_mark.png'
import red_x from '../../../../../assets/glyphs/red_x.png'


import './dashboardStatsAnswerCard.css'
import './dashboardStatsAnswerCardButton.css'

const DashboardStatsAnswerCard = (props) => {

  const onClickFunctions = () => { props.history.push(routes.static_results + '/' + props.diff + '/' + props.cat + '/' + props.qid + '/stats') }

  let vote, distribComments, resultGlyph, answer = props.answer

  const incorrect_glyph = <img alt='Incorrect' className='result_glyph' src={ red_x }/>
  const correct_glyph = <img alt='Correct' className='result_glyph' src={ green_check_mark } />

  if(answer.result === "Correct") resultGlyph = correct_glyph
  if(answer.result === "Incorrect") resultGlyph = incorrect_glyph
  if(answer.result === "Outta Time") resultGlyph = incorrect_glyph

  if(answer.vote) vote = <span>{ Object.values(answer.vote)[0].vote }</span>
  else vote = <span>ooooo</span>

  if(answer.comments){
    let comments = Object.entries(answer.comments)
    distribComments =
      <div className="dashboard_stats_answer_card_comment_sub_container">
        <h4>Your Comments</h4>
        { comments.map(comment =>
            <div
              className="dashboard_stats_answer_card_comment_card"
              key={ comments.indexOf(comment) }
            >
              <h5>{ comment[1].timestamp }</h5>
              <span>{ comment[1].comment }</span>
            </div>
        )}
      </div>
  } else distribComments = <h3>You have no comments on this question</h3>

  return(
    <div className="dashboard_stats_answer_card_container">
       <div className="dashboard_stats_answer_card_header">
        <h5>{ answer.question }</h5>
          <button
            className="dashboard_stats_answer_card_button"
            onClick={ onClickFunctions }
          >
            View Question
          </button>
      </div>
       <div className="dashboard_stats_answer_card_sub_container">
        <div className="dashboard_stats_answer_card_left_container">
          <div className="dashboard_stats_answer_card_left_sub_container">
            { resultGlyph }
            <div className="dashboard_stats_answer_card_vote_container">
              { vote }
            </div>
          </div>
        </div>
        <div className="dashboard_stats_answer_card_right_container">
          <div className="dashboard_stats_answer_card_rank_rating_container">
            <div className="dashboard_stats_answer_card_rank_sub_container">
              <h4>Rank</h4>
              <span>{ props.answer.performance.rank }</span>
            </div>
            <div className="dashboard_stats_answer_card_rating_sub_container">
              <h4>Rating</h4>
              <span>{ props.answer.performance.rating }</span>
            </div>
          </div>
          <div className="dashboard_stats_answer_card_time_container">
            <h4>Your Time</h4>
            <span>{ props.answer.time } seconds</span>
          </div>
          <div className="dashboard_stats_answer_card_result_container">
            <div className="dashboard_stats_answer_card_result_user_answer_container">
              <h4>Your Answer</h4>
              <span>{ props.answer.answer }</span>
            </div>
            <div className="dashboard_stats_answer_card_result_correct_answer_container">
              <h4>Correct Answer</h4>
              <span>{ props.answer.correct_answer }</span>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard_stats_answer_card_comment_container">
        { distribComments }
      </div>
    </div>
  )
}

export default DashboardStatsAnswerCard