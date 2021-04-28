import React from 'react'
import { routes } from '../../../../../../utility/paths'

import { voteStarsDashboardRatingIndex } from '../../../../../../assets/vote_stars/voteStarsRatingIndex'
import glyphIndex from '../../../../../../assets/glyphs/glyphIndex'

import DefaultButtonsContainer from '../../../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './dashboardStatsAnswerCard.css'

const DashboardStatsAnswerCard = (props) => {

  const onClickFunction = () => { props.history.push(routes.static_results + '/' + props.diff + '/' + props.cat + '/' + props.qid + '/stats') }

  let answer = props.answer,
      vote,
      voteStars,
      // distribComments,
      resultGlyph

  const correct_glyph = <img alt='Correct' className='result_glyph' src={ glyphIndex.greenCheckMark } title={ 'You answered this question correctly' } />
  const incorrect_glyph = <img alt='Incorrect' className='result_glyph' src={ glyphIndex.redX } title={ 'You answered this question incorrectly' } />

  const viewQuestionButtons = [
    {
      id: 'dashboard_stats_view_question_button',
      name: 'dashboardStatsViewQuestionButton',
      onClickFunction: onClickFunction,
      // params: JSON.stringify({ gameMode: gameMode.val }),
      type: 'button',
      text: 'View Question',
      // tooltipText: [ 'View Results for this question' ]
    }
  ]

  if(answer.vote) {
    vote = Object.values(answer.vote)[0].vote
    voteStars = voteStarsDashboardRatingIndex[vote]
  }

  if(answer.result === "Correct") resultGlyph = correct_glyph
  if(answer.result === "Incorrect") resultGlyph = incorrect_glyph
  if(answer.result === "Outta Time") resultGlyph = incorrect_glyph

  // if(answer.comments){
  //   let comments = Object.entries(answer.comments)
  //   distribComments =
  //     <div className="dashboard_stats_answer_card_comment_sub_container">
  //       <div className="dashboard_stats_answer_card_comment_header">
  //         <h4>Your Comments</h4>
  //       </div>
  //       { comments.map(comment =>
  //           <div
  //             className="dashboard_stats_answer_card_comment_card"
  //             key={ comments.indexOf(comment) }
  //           >
  //             <h5>{ comment[1].timestamp }</h5>
  //             <span>{ comment[1].comment }</span>
  //           </div>
  //       )}
  //     </div>
  // } else {
  //   distribComments =
  //     <div className="dashboard_stats_answer_card_no_comment_header">
  //       <h4>You have not commented on this question</h4>
  //     </div>
  // }

  // console.log(props)

  return(
    <div className="dashboard_stats_answer_card_container">
       <div className="dashboard_stats_answer_card_header">
        <h5>{ answer.question }</h5>
          <DefaultButtonsContainer
            buttons={ viewQuestionButtons }
            containerClass={ 'dashboard_stats_view_question_button_container' }
            buttonClass={ 'dashboard_stats_view_question_button' }
            // buttonClass={ 'default_button_alt' }
            enableButton={ true }
            // tooltipClass={ 'dashboard_stats_view_question_button_tooltip' }
          />
      </div>
      {/* <div className='divider_medium' /> */}
       <div className="dashboard_stats_answer_card_sub_container">
        <div className="dashboard_stats_answer_card_left_container">
          <div className="dashboard_stats_answer_card_left_sub_container">
            { resultGlyph }

          </div>
        </div>
        <div className="dashboard_stats_answer_card_right_container">
          <div className="dashboard_stats_answer_card_right_sub_container">
            { answer.vote &&
              <div className="dashboard_stats_answer_card_right_sub_wrapper">
                <h4>Your Vote</h4>
                  <img
                    alt={ 'Your Rating' }
                    name={ vote }
                    src={ voteStars }
                    title={ 'Your Rating' }
                  />
              </div>
            }
          </div>
          <div className="dashboard_stats_answer_card_right_sub_container">
            <div className="dashboard_stats_answer_card_right_sub_wrapper">
              <h4>Rank</h4>
              <span>{ props.answer.performance.rank }</span>
            </div>
          </div>
          <div className="dashboard_stats_answer_card_right_sub_container">
            <div className="dashboard_stats_answer_card_right_sub_wrapper">
              <h4>Rating</h4>
              <span>{ props.answer.performance.rating }</span>
            </div>
          </div>
          <div className="dashboard_stats_answer_card_right_sub_container">
            <div className="dashboard_stats_answer_card_right_sub_wrapper">
              <h4>Your Time</h4>
              <span>{ props.answer.time } seconds</span>
            </div>
          </div>
          <div className="dashboard_stats_answer_card_right_sub_container">
            <div className="dashboard_stats_answer_card_right_sub_wrapper">
              <h4>Your Answer</h4>
              <span>{ props.answer.answer }</span>
            </div>
          </div>
          <div className="dashboard_stats_answer_card_right_sub_container">
            <div className="dashboard_stats_answer_card_right_sub_wrapper">
              <h4>Correct Answer</h4>
              <span>{ props.answer.correct_answer }</span>
            </div>
          </div>
        </div>
        </div>
      {/* <div className="dashboard_stats_answer_card_comment_container">
        { distribComments }
      </div> */}
    </div>
  )
}

export default DashboardStatsAnswerCard