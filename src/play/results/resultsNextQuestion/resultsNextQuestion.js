import React from 'react'

import { connect } from 'react-redux'
import {
  loading,
  updateGameStatus,
  setGameState,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment
} from '../../../store/actions/actionIndex'

import NextQuestionButton from './nextQuestionButton/nextQuestionButton'

import './resultsNextQuestion.css'

const resultsNextQuestion = (props) => {

  const onClickNextQuestionFunctions = () => {
    props.onSetGameState('reInit')
    props.onUpdateGameStatus('reInitGame', true)
    props.onLoadingModal(true)
    props.onDisableNextQuestionButton()
    if(props.play.question) props.onResetQuestion()
    if(props.play.answer) props.onResetAnswer()
    if(props.play.results) props.onResetResults()
    if(props.play.voteStatus) props.onResetVote()
    if(props.play.commentStatus) props.onResetComment()
  }

  return(
    <div className={ props.showNextQuestionButton ? "results_next_question_button_container": "blank"}>
      <NextQuestionButton
        keyName="next_question_button"
        class={ props.enableNextQuestionButton ? "results_next_question_button" : "results_next_question_button_disabled" }
        onClick={ props.enableNextQuestionButton ? onClickNextQuestionFunctions : null }
      >
        Next Question
      </NextQuestionButton>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    modal: state.modal,
    play: state.play
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onUpdateGameStatus: (status, loading) => dispatch(updateGameStatus(status, loading)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(resultsNextQuestion)