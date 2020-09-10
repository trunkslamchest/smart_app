import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import './selectionButton.css'

const SelectionButton = (props) => {

  const onClickFunctions = () => {
    props.onSetGameQset(props.val)
  }

  return(
    <button
      key={ props.key }
      value={ props.val }
      className="selection_button"
      name={`${props.val}_button`}
      onClick={ onClickFunctions }
    >
      { props.val }
    </button>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.play,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetGameDiff: (diff) => dispatch(actions.setGameDiff(diff)),
    onResetGameDiff: (diff) => dispatch(actions.resetGameDiff(diff)),
    onSetGameCat: (diff) => dispatch(actions.setGameCat(diff)),
    onResetGameCat: (cat) => dispatch(actions.resetGameCat(cat)),
    onSetGameQset: (set) => dispatch(actions.setGameQset(set)),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectionButton)