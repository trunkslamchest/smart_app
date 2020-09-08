import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  render(){

    const blank = <></>

    return(
      <>
        Results Container Test
      </>
    )
  }
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
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetAnswerResults: (obj) => dispatch(actions.getAnswerResults(obj)),
    onSetGameState : (state) => dispatch(actions.setGameState(state)),
    onResetGameState : () => dispatch(actions.resetGameState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)