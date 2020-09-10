import React from 'react'

import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import SelectionContainer from '../displaySelection/SelectionContainer'
import QuestionContainer from '../displayQuestion/QuestionContainer'
import ResultsContainer from '../displayResults/resultsContainer'

import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

class QuickPlayContainer extends React.Component {

  componentDidMount(){
    this.props.onSetGameState('init')
    if(localStorage.gameMode) this.props.onSetGameMode(localStorage.gameMode)
  }

  componentDidUpdate(){
    if(this.props.play.gameState === 'init'){

      if (this.props.play.gameMode === 'quick_play') {
        let questionObj = { prop: 'testProp' }
        this.props.onGetQuickQuestion(questionObj)
        this.props.onSetGameState('mount')
      }

      if (this.props.play.gameMode === 'by_diff' || this.props.play.gameMode === 'by_cat') {
        let questionObj = { diff: this.props.play.gameDiff, prop: 'testProp' }
        this.props.history.push( routes[this.props.play.gameMode] + '/select' )
        this.props.onSetGameState('selection')
        // this.props.onGetDifficultyQuestion(questionObj)
      }

      // if (this.props.play.gameMode === 'by_cat') {
      //   let questionObj = { cat: this.props.play.gameCat, prop: 'testProp' }
      //   this.props.history.push( routes[this.props.play.gameMode] + '/select' )
      //   this.props.onSetGameState('selection')
      //   // this.props.onGetCategoryQuestion(questionObj)
      // }
    }

    if(this.props.play.gameState === 'mount' && this.props.play.question){

      if(this.props.play.gameMode === 'quick_play') {
        this.props.history.push( routes[this.props.play.gameMode] + '/question' )
        this.props.onSetGameState('question')
      }

      // if(this.props.play.gameMode === 'by_diff' || this.props.play.gameMode === 'by_cat') {
      // }

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
      this.props.history.push( routes[this.props.play.gameMode] + '/results' )
      this.props.onSetGameState('results')
    }

  }

  render(){

    let selectionRoute =
      <Route exact path={ routes[this.props.play.gameMode] + '/select' }>
        <SelectionContainer history={ this.props.history } />
      </Route>

    let questionRoute =
      <Route exact path={ routes[this.props.play.gameMode] + '/question' }>
        <QuestionContainer history={ this.props.history } />
      </Route>

    let resultsRoute =
      <Route exact path={ routes[this.props.play.gameMode] + '/results' }>
        <ResultsContainer history={ this.props.history } />
      </Route>

    return(
      <>
        {
          (() => {
            switch(this.props.play.gameState) {
              case 'selection': return selectionRoute;
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
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetGameDiff: (diff) => dispatch(actions.setGameDiff(diff)),
    onResetGameDiff: (diff) => dispatch(actions.resetGameDiff(diff)),
    onSetGameCat: (diff) => dispatch(actions.setGameCat(diff)),
    onResetGameCat: (cat) => dispatch(actions.resetGameCat(cat)),
    onSetGameQset: (set) => dispatch(actions.setGameQset(set)),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
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

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayContainer)