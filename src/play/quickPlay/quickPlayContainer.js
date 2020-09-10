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
        this.props.history.push( routes[this.props.play.gameMode] + '/select' )
        this.props.onSetGameState('selection')
      }
    }

    if(this.props.play.gameState === 'mount' && this.props.play.question){
      this.props.history.push( routes[this.props.play.gameMode] + '/question' )
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
      this.props.history.push( routes[this.props.play.gameMode] + '/results' )
      this.props.onSetGameState('results')
    }

  }

  render(){
    return(
      <>
        {
          (() => {
            switch(this.props.play.gameState) {
              case 'selection': return <Route exact path={ routes[this.props.play.gameMode] + '/select' }>
                                         <SelectionContainer history={ this.props.history } />
                                       </Route>;
              case 'question': return <Route exact path={ routes[this.props.play.gameMode] + '/question' }>
                                        <QuestionContainer history={ this.props.history } />
                                      </Route>;
              case 'results': return <Route exact path={ routes[this.props.play.gameMode] + '/results' }>
                                       <ResultsContainer history={ this.props.history } />
                                     </Route>;
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