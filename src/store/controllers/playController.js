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

  componentDidMount(){
    if(this.props.auth.status === 'authValid') this.initGameModule()
  }

  componentDidUpdate(){
    if(this.props.auth.status === 'authValid') {
      this.initGameModule()

      if(this.props.play.gameState === 'init') this.setGameModeModule()

      if(this.props.play.gameState === 'selection' && this.props.play.gameQset) this.setGameQsetModule()

      if(this.props.play.gameState === 'mount' && this.props.play.question) this.setGameQuestionModule()

      if(this.props.play.gameState === 'question' && this.props.play.question.completed) this.setGameCompletedModule()

      if(this.props.play.gameState === 'question' && this.props.play.answer) this.setAnsweredModule()

      if(this.props.play.gameState === 'answered' && !this.props.play.results) this.getResultsModule()

      if(this.props.play.gameState === 'answered' && this.props.play.status === 'updateQuestionSuccess' && this.props.play.results) this.updateQuestionTotalsModule()

      if(this.props.play.gameState === 'answered' && this.props.play.status === 'updateQuestionTotalsSuccess' && this.props.play.question.answers) this.updateUserQuestionsModule()

      if(this.props.play.gameState === 'answered' && this.props.play.status === 'updateUserQuestionsSuccess') this.setResultsModule()

      if(this.props.play.gameState === 'results' && this.props.play.status === 'setAllResultsSuccess') this.displayResultsModule()

      if(this.props.play.gameState === 'results' && this.props.play.voteStatus === 'initVote' && !this.props.play.question.votes.vote) this.updateUserVotesModule()

      if(this.props.play.gameState === 'results' && this.props.play.voteStatus === 'voteSuccess' && this.props.play.question.votes.vote) this.props.onUpdateVoteStatus('displayVotes', false)

      if(this.props.play.gameState === 'results' && this.props.play.commentStatus === 'initComment' && this.props.play.comment) this.updateUserCommentsModule()

      if(this.props.play.gameState === 'results' && this.props.play.commentStatus === 'commentSuccess' && this.props.user.questions.comments[this.props.play.comment.cid]) this.props.onUpdateCommentStatus('displayComments', false)
    }
  }

  componentWillUnmount(){
    if(this.props.play.status) this.props.onUpdateGameStatus(null, false)
    if(this.props.play.gameMode) this.props.onResetGameMode()
    if(this.props.play.gameState)  this.props.onResetGameState()
    if(this.props.play.gameQset) this.props.onResetGameQset()
    if(this.props.play.question) this.props.onResetQuestion()
    if(this.props.play.answer) this.props.onResetAnswer()
    if(this.props.play.results) this.props.onResetResults()
    if(this.props.play.voteStatus) this.props.onResetVote()
    if(this.props.play.commentStatus) this.props.onResetComment()
  }

  initGameModule = () => {
    if(!this.props.play.gameState) {
      this.props.onUpdateGameStatus('initGame', true)
      this.props.onSetGameState('init')
      if(localStorage.gameMode) this.props.onSetGameMode(localStorage.gameMode)
    }
  }

  setGameModeModule = () => {
    if (this.props.play.gameMode === 'quick_play') {
      let questionObj = { answeredIds: [] }
      if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
      this.props.onGetQuickQuestion(questionObj)
      this.props.onSetGameState('mount')
    }
    if (this.props.play.gameMode === 'by_diff' || this.props.play.gameMode === 'by_cat') {
      this.props.history.push( routes[this.props.play.gameMode] + '/select' )
      this.props.onSetGameState('selection')
    }
  }

  setGameQsetModule = () => {
    let questionObj = { answeredIds: [], qSet: this.props.play.gameQset }
    if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
    if(this.props.play.gameMode === 'by_diff') this.props.onGetDiffQuestion(questionObj)
    if(this.props.play.gameMode === 'by_cat') this.props.onGetCatQuestion(questionObj)
    this.props.onSetGameState('mount')
  }

  setGameQuestionModule = () => {
    if(this.props.play.question.completed) this.setGameCompletedModule()
    else {
      this.props.history.push( routes[this.props.play.gameMode] + '/question' )
      this.props.onUpdateGameStatus('displayQuestion', false)
      this.props.onSetGameState('question')
    }
  }

  setGameCompletedModule = () => {
    this.props.history.push( routes[this.props.play.gameMode] + '/completed' )
    this.props.onUpdateGameStatus('displayCompleted', false)
    this.props.onSetGameState('completed')
  }

  setAnsweredModule = () => {
    this.props.onUpdateGameStatus('answered', true)
    this.props.onSetGameState('answered')
  }

  getResultsModule = () => {
    this.props.onGetResults({
      uid: localStorage.id,
      qid: this.props.play.question.id,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      answer: this.props.play.answer.choice,
      time: this.props.play.answer.time
    })
  }

  updateQuestionTotalsModule = () => {
    this.props.onUpdateQuestionTotalsFromPlayController({
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      result: this.props.play.results.result
    })
    this.props.onUpdateGameStatus('updateQuestionTotalsSuccess', true)
  }

  updateUserQuestionsModule = () => {
    this.props.onUpdateUserQuestionIdsFromPlayController(this.props.play.question.id)
    this.props.onUpdateUserQuestionTotalsFromPlayController({
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      answer: this.props.play.answer,
      result: this.props.play.results.result
    }, this.props.questions.totals)
    this.props.onUpdateUserQuestionsFromPlayController({
      qid: this.props.play.question.id,
      question: this.props.play.question.question,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      answer: this.props.play.answer,
      results: this.props.play.results
    })
    this.props.onUpdateGameStatus('updateUserQuestionsSuccess', true)
  }

  setResultsModule = () => {
    this.props.onSetGameState('results')
    this.props.onUpdateGameStatus('setAllResultsSuccess', true)
  }

  displayResultsModule = () => {
    this.props.onUpdateGameStatus('displayResults', false)
    this.props.history.push( routes[this.props.play.gameMode] + '/results' )
  }

  updateUserVotesModule = () => {
    this.props.onUpdateVoteStatus('sentVote', true)
    this.props.onUpdateUserVotesFromPlayController(this.props.play.question.id, {
      answer: this.props.play.answer.choice,
      correct_answer: this.props.play.results.correct_answer,
      question: this.props.play.question.question,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      result: this.props.play.results.result,
      vote: this.props.play.question.votes.vote
    })
  }

  updateUserCommentsModule = () => {
    this.props.onUpdateCommentStatus('sentComment', true)
    this.props.onUpdateUserCommentsFromPlayController(this.props.play.comment.cid, {
      answer: this.props.play.answer.choice,
      category: this.props.play.question.category,
      comment: this.props.play.comment.comment,
      correct_answer: this.props.play.results.correct_answer,
      question: this.props.play.question.question,
      difficulty: this.props.play.question.difficulty,
      result: this.props.play.results.result
    })
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
    onUpdateGameStatus: (status, loading) => dispatch(actions.updateGameStatus(status, loading)),
    onUpdateVoteStatus: (status, loading) => dispatch(actions.updateVoteStatus(status, loading)),
    onUpdateCommentStatus: (status, loading) => dispatch(actions.updateCommentStatus(status, loading)),
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
    onUpdateQuestion: (obj) => dispatch(actions.updateQuestion(obj)),
    onUpdateQuestionTotalsFromPlayController: (obj) => dispatch(actions.updateQuestionTotalsFromPlayController(obj)),
    onUpdateUserQuestionIdsFromPlayController: (id) => dispatch(actions.updateUserQuestionIdsFromPlayController(id)),
    onUpdateUserQuestionsFromPlayController: (obj) => dispatch(actions.updateUserQuestionsFromPlayController(obj)),
    onUpdateUserQuestionTotalsFromPlayController: (obj) => dispatch(actions.updateUserQuestionTotalsFromPlayController(obj)),
    onUpdateUserVotesFromPlayController: (id, obj) => dispatch(actions.updateUserVotesFromPlayController(id, obj)),
    onUpdateUserCommentsFromPlayController: (id, obj) => dispatch(actions.updateUserCommentsFromPlayController(id, obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayController)