import React from 'react'
import { routes } from '../../../../../../utility/paths'

import { voteStarsDashboardRatingIndex } from '../../../../../../assets/vote_stars/voteStarsRatingIndex'
import glyphIndex from '../../../../../../assets/glyphs/glyphIndex'

import makeDashboardViewQuestionButton from '../../../../dashboardFunctions/makeDashboardViewQuestionButton'
import DefaultButtonsContainer from '../../../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './dashboardStatsAnswerCard.css'

const DashboardStatsAnswerCard = (props) => {

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  let answer = props.answer,
      vote,
      voteStars,
      // distribComments,
      resultGlyph

  const correct_glyph = <img alt='Correct' className='result_glyph' src={ glyphIndex.greenCheckMark } title={ 'You answered this question correctly' } />
  const incorrect_glyph = <img alt='Incorrect' className='result_glyph' src={ glyphIndex.redX } title={ 'You answered this question incorrectly' } />

  const viewQuestionButton = makeDashboardViewQuestionButton(glyphIndex, onPushLink, routes.static_results, props.diff, props.cat, props.qid)

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

  return(
    <div className="dashboard_stats_answer_card_container">
       <div className="dashboard_stats_answer_card_header">
        <h5>{ answer.question }</h5>
          <DefaultButtonsContainer
            buttons={ viewQuestionButton }
            containerClass={ 'dashboard_stats_view_question_button_container' }
            buttonClass={ 'dashboard_stats_view_question_button' }
            enableButton={ true }
          />
      </div>
      <div className="dashboard_stats_answer_card_sub_container">
        <div className="dashboard_stats_answer_card_sub_container_group">
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            { resultGlyph }
          </div>
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            { answer.vote &&
              <>
                <h4>Your Vote</h4>
                  <img
                    alt={ 'Your Rating' }
                    name={ vote }
                    src={ voteStars }
                    title={ 'Your Rating' }
                  />
              </>
            }
          </div>
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            <h4>Rank</h4>
            <span>{ props.answer.performance.rank }</span>
          </div>
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            <h4>Rating</h4>
            <span>{ props.answer.performance.rating }</span>
          </div>
        </div>
        <div className="dashboard_stats_answer_card_sub_container_group">
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            <h4>Your Time</h4>
            <span>{ props.answer.time } seconds</span>
          </div>
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            <h4>Your Answer</h4>
            <span>{ props.answer.answer }</span>
          </div>
          <div className="dashboard_stats_answer_card_bottom_card_wrapper">
            <h4>Correct Answer</h4>
            <span>{ props.answer.correct_answer }</span>
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