import React from 'react'

import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import QuestionContainer from '../displayQuestion/QuestionContainer'
import ResultsContainer from '../displayResults/resultsContainer'

import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

class QuickPlayContainer extends React.Component {

  componentDidMount(){
    this.props.onSetGameMode('quickPlay')
  }

  componentDidUpdate(){
    if(this.props.play.gameState === 'init'){
      let questionObj = { prop: 'testProp' }
      this.props.onGetQuickQuestion(questionObj)
      this.props.onSetGameState('mount')
    }
    if(this.props.play.gameState === 'mount' && this.props.play.question){
      this.props.history.push( routes.quick_play + '/question' )
      this.props.onSetGameState('question')
    }
    if(this.props.play.gameState === 'answered'){
      this.props.onGetResults({
        uid: localStorage.id,
        qid: this.props.play.question.id,
        difficulty: this.props.play.question.difficulty,
        category: this.props.play.question.category,
        answer: this.props.play.answer.choice,
        time: this.props.play.answer.time
      })
    }
    if(this.props.play.gameState === 'answered' && this.props.play.question.votes){
      this.props.history.push( routes.quick_play + '/results' )
      this.props.onSetGameState('results')
    }
  }

  render(){

    let questionRoute =
      <Route exact path={ routes.quick_play + '/question' }>
        <QuestionContainer history={ this.props.history } />
      </Route>

    let resultsRoute =
      <Route exact path={ routes.quick_play + '/results' }>
        <ResultsContainer history={ this.props.history } />
      </Route>

    return(
      <>
        {
          (() => {
            switch(this.props.play.gameState) {
              case 'question': return questionRoute;
              case 'results': return resultsRoute;
              default: return <LoadingSpinnerRoller />;
            }
          })()
        }
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
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayContainer)