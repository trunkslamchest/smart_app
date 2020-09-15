import React from 'react'

import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import SelectionContainer from '../../play/selection/selectionContainer'
import QuestionContainer from '../../play/question/questionContainer'
import ResultsContainer from '../../play/results/resultsContainer'
import CompletedContainer from '../../play/completed/completedContainer'

import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

class PlayController extends React.Component {

  state = {
    updatedUserQuestions: false
  }

  componentDidMount(){
    if(this.props.auth.valid) {
      if(!this.props.play.gameState) {
        this.props.onSetGameState('init')
        if(localStorage.gameMode) this.props.onSetGameMode(localStorage.gameMode)
      }
    }
  }

  componentDidUpdate(){

    if(this.props.auth.valid) {
      if(!this.props.play.gameState) {
        this.props.onSetGameState('init')
        if(localStorage.gameMode) this.props.onSetGameMode(localStorage.gameMode)
      }

      if(this.props.play.gameState === 'init'){
        if (this.props.play.gameMode === 'quick_play') {
          let questionObj = { answeredIds: [] }
          // if(this.props.user.questions) {
            if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
            this.props.onGetQuickQuestion(questionObj)
            this.props.onSetGameState('mount')
          // }
        }
        if (this.props.play.gameMode === 'by_diff' || this.props.play.gameMode === 'by_cat') {
          this.props.history.push( routes[this.props.play.gameMode] + '/select' )
          this.props.onSetGameState('selection')
        }
      }

      // if(this.props.play.gameState === 'init'){
      //   if (this.props.play.gameMode === 'quick_play') {
      //     let questionObj = { answeredIds: [] }
      //     if(this.props.user.questions) {
      //       if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
      //       this.props.onGetQuickQuestion(questionObj)
      //       this.props.onSetGameState('mount')
      //     }
      //   }
      //   if (this.props.play.gameMode === 'by_diff' || this.props.play.gameMode === 'by_cat') {
      //     this.props.history.push( routes[this.props.play.gameMode] + '/select' )
      //     this.props.onSetGameState('selection')
      //   }
      // }

      if(this.props.play.gameState === 'selection' && this.props.play.gameQset){
        let questionObj = { answeredIds: [], qSet: this.props.play.gameQset }

        // if(this.props.user.questions) {
          if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
          if(this.props.play.gameMode === 'by_diff') this.props.onGetDiffQuestion(questionObj)
          if(this.props.play.gameMode === 'by_cat') this.props.onGetCatQuestion(questionObj)
          this.props.onSetGameState('mount')
        // }
      }

      // if(this.props.play.gameState === 'selection' && this.props.play.gameQset){
      //   let questionObj = { answeredIds: [], qSet: this.props.play.gameQset }

      //   if(this.props.user.questions) {
      //     if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
      //     if(this.props.play.gameMode === 'by_diff') this.props.onGetDiffQuestion(questionObj)
      //     if(this.props.play.gameMode === 'by_cat') this.props.onGetCatQuestion(questionObj)
      //     this.props.onSetGameState('mount')
      //   }
      // }

      if(this.props.play.gameState === 'mount' && this.props.play.question){
        if(!!this.state.updatedUserQuestions) this.setState({ updatedUserQuestions: false })
        if(this.props.play.question.completed){
          this.props.history.push( routes[this.props.play.gameMode] + '/completed' )
          this.props.onSetGameState('completed')
        } else {
          this.props.history.push( routes[this.props.play.gameMode] + '/question' )
          this.props.onSetGameState('question')
        }
      }

      // if(this.props.play.gameState === 'mount' && this.props.play.question){
      //   if(this.props.play.question.completed){
      //     this.props.history.push( routes[this.props.play.gameMode] + '/completed' )
      //     this.props.onSetGameState('completed')
      //   } else {
      //     this.props.history.push( routes[this.props.play.gameMode] + '/question' )
      //     this.props.onSetGameState('question')
      //   }
      // }

      if(this.props.play.gameState === 'question' && this.props.play.question.completed){
        this.props.history.push( routes[this.props.play.gameMode] + '/completed' )
        this.props.onSetGameState('completed')
      }

      // if(this.props.play.gameState === 'question' && this.props.play.question.completed){
      //   this.props.history.push( routes[this.props.play.gameMode] + '/completed' )
      //   this.props.onSetGameState('completed')
      // }

      if(this.props.play.gameState === 'question' && this.props.play.answer){
        this.props.onSetGameState('answered')
      }

      if(this.props.play.gameState === 'answered' && !this.props.play.results){
        this.props.onGetResults({
          uid: localStorage.id,
          qid: this.props.play.question.id,
          difficulty: this.props.play.question.difficulty,
          category: this.props.play.question.category,
          answer: this.props.play.answer.choice,
          time: this.props.play.answer.time
        })
      }

      // if(this.props.play.gameState === 'answered' && !this.props.play.results){
      //   this.props.onGetResults({
      //     uid: localStorage.id,
      //     qid: this.props.play.question.id,
      //     difficulty: this.props.play.question.difficulty,
      //     category: this.props.play.question.category,
      //     answer: this.props.play.answer.choice,
      //     time: this.props.play.answer.time
      //   })
      // }

      if(this.props.play.gameState === 'answered' && this.props.play.question.answers){
        this.props.history.push( routes[this.props.play.gameMode] + '/results' )
        this.props.onSetGameState('results')
      }

      if(this.props.play.gameState === 'results' && !this.state.updatedUserQuestions){
        this.props.onUpdateUserQuestionIdsFromPlayController(this.props.play.question.id)
        this.props.onUpdateUserQuestionTotalsFromPlayController({
          difficulty: this.props.play.question.difficulty,
          category: this.props.play.question.category,
          answer: this.props.play.answer,
          result: this.props.play.results.result
        })
        this.props.onUpdateUserQuestionsFromPlayController({
          qid: this.props.play.question.id,
          question: this.props.play.question.question,
          difficulty: this.props.play.question.difficulty,
          category: this.props.play.question.category,
          answer: this.props.play.answer,
          results: this.props.play.results
        })
        this.setState({ updatedUserQuestions: true })
      }

    }

  }

  componentWillUnmount(){
    // localStorage.removeItem('gameMode')
    if(this.props.play.gameMode) this.props.onResetGameMode()
    if(this.props.play.gameState)  this.props.onResetGameState()
    if(this.props.play.gameQset) this.props.onResetGameQset()
    if(this.props.play.question) this.props.onResetQuestion()
    if(this.props.play.answer) this.props.onResetAnswer()
    if(this.props.play.results) this.props.onResetResults()
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
              case 'completed': return <Route exact path={ routes[this.props.play.gameMode] + '/completed' }>
                                        <CompletedContainer history={ this.props.history } />
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
    auth: state.auth,
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
    onResetComment: (obj) => dispatch(actions.resetComment(obj)),
    onUpdateUserQuestionIdsFromPlayController: (id) => dispatch(actions.updateUserQuestionIdsFromPlayController(id)),
    onUpdateUserQuestionsFromPlayController: (obj) => dispatch(actions.updateUserQuestionsFromPlayController(obj)),
    onUpdateUserQuestionTotalsFromPlayController: (obj) => dispatch(actions.updateUserQuestionTotalsFromPlayController(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayController)