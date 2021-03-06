import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../../../utility/paths'

import { voteStarsDashboardRatingIndex } from '../../../../../../assets/vote_stars/voteStarsRatingIndex'
import glyphIndex from '../../../../../../assets/glyphs/glyphIndex'

import makeDashboardViewQuestionButton from '../../../../dashboardFunctions/makeDashboardViewQuestionButton'
import DefaultButtonsContainer from '../../../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './dashboardStatsAnswerCard.css'

const DashboardStatsAnswerCard = (props) => {

  const history = useHistory()

  const componentClasses = {
    cardContainer: 'dashboard_stats_answer_card_container',
    cardSubContainer: 'dashboard_stats_answer_card_sub_container',
    cardHeader: 'dashboard_stats_answer_card_header',
    cardWrapper: 'dashboard_stats_answer_card_bottom_card_wrapper',
    cardWrapperGroupLeft: props.cardNumber < props.answersLimit ? 'dashboard_stats_answer_card_sub_container_group_left' : 'dashboard_stats_answer_card_sub_container_group_left dashboard_stats_answer_card_sub_container_group_left_last',
    cardWrapperGroupRight: props.cardNumber < props.answersLimit ? 'dashboard_stats_answer_card_sub_container_group_right' : 'dashboard_stats_answer_card_sub_container_group_right dashboard_stats_answer_card_sub_container_group_right_last',
    cardWrapperWithBottomLeftBorder: props.cardNumber < props.answersLimit ? 'dashboard_stats_answer_card_bottom_card_wrapper' : 'dashboard_stats_answer_card_bottom_card_wrapper dashboard_stats_answer_card_bottom_card_wrapper_left',
    cardWrapperWithBottomRightBorder: props.cardNumber < props.answersLimit ? 'dashboard_stats_answer_card_bottom_card_wrapper' : 'dashboard_stats_answer_card_bottom_card_wrapper dashboard_stats_answer_card_bottom_card_wrapper_right'
  }

  const [bottomCardLeftClass, setBottomCardLeftClass] = useState(componentClasses.cardWrapper)
  const [bottomCardRightClass, setBottomCardRightClass] = useState(componentClasses.cardWrapperWithBottomLeftBorder)

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  useEffect(() => {
    const checkWidth = window.matchMedia('(max-width: 768px)');

    const switchCardClass = () => {
      if (checkWidth.matches) {
        setBottomCardLeftClass(componentClasses.cardWrapper)
        setBottomCardRightClass(componentClasses.cardWrapperWithBottomLeftBorder)
      } else {
        setBottomCardLeftClass(componentClasses.cardWrapperWithBottomLeftBorder)
        setBottomCardRightClass(componentClasses.cardWrapper)
      }
    };

    switchCardClass()
    checkWidth.addListener(switchCardClass)
    return () => checkWidth.removeListener(switchCardClass)
  // eslint-disable-next-line
  }, [])

  let answer = props.answer
  let userAnswer = props.answer.answer
  let vote
  let voteStars
  // let distribComments
  let resultGlyph

  const correct_glyph = <img alt='Correct' className='result_glyph' src={ glyphIndex.greenCheckMark } title='You answered this question correctly' />
  const incorrect_glyph = <img alt='Incorrect' className='result_glyph' src={ glyphIndex.redX } title='You answered this question incorrectly' />

  const viewQuestionButton = makeDashboardViewQuestionButton(glyphIndex, onPushLink, routes.static_results, props.diff, props.cat, props.qid)

  if(answer.vote) {
    vote = Object.values(answer.vote)[0].vote
    voteStars = voteStarsDashboardRatingIndex[vote]
  }

  if(answer.result === "Correct") resultGlyph = correct_glyph
  if(answer.result === "Incorrect") resultGlyph = incorrect_glyph
  if(answer.result === "Outta Time") resultGlyph = incorrect_glyph
  if(userAnswer === 'outta_time' ) userAnswer = "Outta Time"

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
    <div className={ props.answerCardContainerClass }>
       <div className={ componentClasses.cardHeader }>
        <h5>{ answer.question }</h5>
          <DefaultButtonsContainer
            buttons={ viewQuestionButton }
            containerClass='dashboard_stats_view_question_button_container'
            buttonClass='dashboard_stats_view_question_button'
            enableButton={ true }
            tooltipClass='dashboard_stats_view_question_button_tooltip'
          />
      </div>
      <div className={ props.answerCardSubContainerClass }>
        <div className={ componentClasses.cardWrapperGroupLeft }>
          <div className={ bottomCardLeftClass }>
            { resultGlyph }
          </div>
          <div className={ componentClasses.cardWrapper }>
            { answer.vote &&
              <>
                <h4>Your Vote</h4>
                  <img
                    alt='Your Rating'
                    name={ vote }
                    src={ voteStars }
                    title='Your Rating'
                  />
              </>
            }
          </div>
          <div className={ componentClasses.cardWrapper }>
            <h4>Rank</h4>
            <span>{ props.answer.performance.qPerf.rank }</span>
          </div>
          <div className={ componentClasses.cardWrapper }>
            <h4>Rating</h4>
            <span>{ props.answer.performance.qPerf.rating }</span>
          </div>
        </div>
        <div className={ componentClasses.cardWrapperGroupRight }>
          <div className={ bottomCardRightClass }>
            <h4>Your Time</h4>
            <span>{ (props.answer.time / 1.00).toFixed(2) }<span>s</span></span>
          </div>
          <div className={ componentClasses.cardWrapper }>
            <h4>Your Answer</h4>
            <span>{ userAnswer }</span>
          </div>
          <div className={ componentClasses.cardWrapperWithBottomRightBorder }>
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