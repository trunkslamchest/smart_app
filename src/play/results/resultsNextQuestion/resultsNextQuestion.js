import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import NextQuestionButton from './nextQuestionButton/nextQuestionButton'

import './resultsNextQuestion.css'

const resultsNextQuestion = (props) => {

  const onClickNextQuestionFunctions = () => {
    props.onSetGameState('init')
    props.onUpdateGameStatus('initGame', true)
    props.onLoadingModal(true)
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
    onLoadingModal: (bool) => dispatch(actions.loading(bool)),
    onUpdateGameStatus: (status, loading) => dispatch(actions.updateGameStatus(status, loading)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onResetResults: () => dispatch(actions.resetResults()),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(resultsNextQuestion)