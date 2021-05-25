import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import {
  loading,
  updateGameStatus,
  updateVoteStatus,
  updateCommentStatus,
  resetGameMode,
  setGameMode,
  setGameState,
  resetGameState,
  resetGameQset,
  getQuickQuestion,
  getDiffQuestion,
  getCatQuestion,
  resetQuestion,
  resetAnswer,
  getResults,
  resetResults,
  resetVote,
  resetComment,
  updateUserPerformanceFromPlayController,
  updateUserExperienceFromPlayController,
  updateUserAchievementsFromPlayController,
  updateQuestionTotalsFromPlayController,
  updateUserQuestionIdsFromPlayController,
  updateUserQuestionsFromPlayController,
  updateUserQuestionTotalsFromPlayController,
  updateUserVotesFromPlayController,
  updateUserCommentsFromPlayController
} from '../actions/actionIndex'

import SelectionContainer from '../../play/selection/selectionContainer'
import QuestionContainer from '../../play/question/questionContainer'
import ResultsContainer from '../../play/results/resultsContainer'
import CompletedContainer from '../../play/completed/completedContainer'

import LoadingModal from '../../UI/loading/loadingModal/loadingModal'

class PlayController extends React.Component {

  componentDidMount(){
    if(this.props.authStatus === 'authValid'&& !this.props.playGameState) this.initGameModule()
    if(this.props.playGameMode === 'quick_play' && this.props.playGameState === 'select') this.mountGameModeModule('setQuickPlay')
  }

  componentDidUpdate(){
    if(this.props.authStatus === 'authValid' && !this.props.authLoading) {
      if(!this.props.playGameState) this.initGameModule()
      if(this.props.playGameState === 'init' && !this.props.playGameMode) this.selectGameModeModule()
      if(this.props.playGameState === 'reInit' && !this.props.playQuestion) this.reInitGameModule()
      if(this.props.playGameState === 'select' && this.props.playStatus === 'selectQset') this.selectQsetModule()
      if(this.props.playGameMode === 'quick_play' && this.props.playGameState === 'select') this.mountGameModeModule('setQuickPlay')
      if(this.props.playGameMode === 'by_diff' && this.props.playQset && this.props.playGameState === 'select') this.mountGameModeModule('setByDiff')
      if(this.props.playGameMode === 'by_cat' && this.props.playQset && this.props.playGameState === 'select') this.mountGameModeModule('setByCat')
      if(this.props.playGameState === 'mount' && this.props.playStatus === 'setQuestionSuccess') this.displayQuestionModule()
      if(this.props.playGameState === 'question' && this.props.playAnswer) this.setAnsweredModule()
      if(this.props.playGameState === 'answered' && !this.props.playResults) this.getResultsModule()
      if(this.props.playGameState === 'answered' && this.props.playStatus === 'updateQuestionSuccess' && this.props.playResults) this.updateQuestionTotalsModule()
      if(this.props.playGameState === 'answered' && this.props.playStatus === 'updateQuestionTotalsSuccess' && this.props.playQuestionAnswer) this.updateUserQuestionsModule()
      if(this.props.playGameState === 'answered' && this.props.playStatus === 'updateUserQuestionsSuccess') this.setResultsModule()
      if(this.props.playGameState === 'results' && this.props.playStatus === 'setAllResultsSuccess') this.displayResultsModule()
      if(this.props.playGameState === 'results' && this.props.voteStatus === 'initVote' && this.props.playResults.vote) this.updateUserVotesModule()

      if(this.props.playGameState === 'results'
         && this.props.voteStatus === 'voteSuccess'
         && this.props.userQuestions.list[this.props.playQuestionId].vote)
         this.displayVotesModule()

      if(this.props.playGameState === 'results' && this.props.commentStatus === 'initComment' && this.props.playResults.comment) this.updateUserCommentsModule()

      if(this.props.playGameState === 'results' &&
         this.props.commentStatus === 'commentSuccess' &&
        this.props.userQuestions.list[this.props.playQuestionId].comments[this.props.playResults.comment.cid])
        this.displayCommentsModule()
    }
  }

  componentWillUnmount(){
    localStorage.removeItem('gameMode')
    if(this.props.playStatus) this.props.onUpdateGameStatus(null, false)
    if(this.props.playGameMode) this.props.onResetGameMode()
    if(this.props.playGameState)  this.props.onResetGameState()
    if(this.props.playQset) this.props.onResetGameQset()
    if(this.props.playQuestionQuestion) this.props.onResetQuestion()
    if(this.props.playAnswer) this.props.onResetAnswer()
    if(this.props.playResults) this.props.onResetResults()
    if(this.props.voteStatus) this.props.onResetVote()
    if(this.props.commentStatus) this.props.onResetComment()
  }

  initGameModule = () => {
    this.props.onLoadingModal(true)
    this.props.onUpdateGameStatus('initGame', true)
    this.props.onSetGameState('init')
  }

  reInitGameModule = () => {
    if (this.props.playGameMode === 'quick_play') {
      this.props.onUpdateGameStatus('setQuickPlay', true)
      let questionObj = { answeredIds: [] }
      if(this.props.userQuestions.ids) questionObj['answeredIds'] = this.props.userQuestions.ids
      this.props.onGetQuickQuestion(questionObj)
      this.props.onSetGameState('mount')
    } else {
      this.props.onUpdateGameStatus('setQset', true)
      let questionObj = { answeredIds: [], qSet: this.props.playQset }
      if(this.props.userQuestions.ids) questionObj['answeredIds'] = this.props.userQuestions.ids
      if(this.props.playGameMode === 'by_diff') this.props.onGetDiffQuestion(questionObj)
      if(this.props.playGameMode === 'by_cat') this.props.onGetCatQuestion(questionObj)
      this.props.onSetGameState('mount')
    }
    this.props.history.push(routes[this.props.playGameMode] + '/question')
  }

  selectGameModeModule = () => {
    this.props.onLoadingModal(false)
    this.props.onUpdateGameStatus('selectGameMode', false)
    this.props.onSetGameState('select')
  }

  reSelectGameModeModule = () => {
    if(this.props.modalLoading) this.props.onLoadingModal(false)
    this.props.onUpdateGameStatus('selectGameMode', false)
    if(!this.props.playGameState) this.props.onSetGameState('select')
    if(this.props.playQuestion) this.props.onResetQuestion()
    if(this.props.playGameMode) this.props.onResetGameMode()
    if(this.props.playQset) this.props.onResetGameQset()
    if(this.props.playAnswer) this.props.onResetAnswer()
    if(this.props.playResults) this.props.onResetResults()
    if(this.props.voteStatus) this.props.onResetVote()
    if(this.props.commentStatus) this.props.onResetComment()
  }

  setGameCompletedModule = () => {
    this.props.onUpdateGameStatus('displayQuestion', false)

    if (this.props.playGameMode === 'quick_play') this.props.history.push( routes.play + '/completed' )
    else this.props.history.push( routes[this.props.playGameMode] + '/completed' )

    this.props.onSetGameState('completed')
    this.props.onLoadingModal(false)
  }

  mountGameModeModule = (gameMode) => {
    this.props.onLoadingModal(true)
    this.props.onUpdateGameStatus(gameMode, true)
    let questionObj = { answeredIds: [] }

    if(this.props.userQuestions.ids) questionObj['answeredIds'] = this.props.userQuestions.ids
    if(this.props.playQset) questionObj.qSet = this.props.playQset

    if(gameMode === 'setQuickPlay') this.props.onGetQuickQuestion(questionObj)
    if(gameMode === 'setByDiff') this.props.onGetDiffQuestion(questionObj)
    if(gameMode === 'setByCat') this.props.onGetCatQuestion(questionObj)

    this.props.onSetGameState('mount')
  }

  displayQuestionModule = () => {
     if(this.props.playQuestionsCompleted && this.props.playGameState === 'mount') {
      this.setGameCompletedModule()
    } else {
      this.props.onUpdateGameStatus('displayQuestion', false)
      this.props.onSetGameState('question')
      this.props.onLoadingModal(false)
    }
  }

  setAnsweredModule = () => {
    this.props.onUpdateGameStatus('answered', true)
    this.props.onSetGameState('answered')
  }

  getResultsModule = () => {
    let Easy = this.props.userQuestions.Easy
    let Medium = this.props.userQuestions.Medium
    let Hard = this.props.userQuestions.Hard

    this.props.onGetResults({
      uid: localStorage.id,
      qid: this.props.playQuestionId,
      difficulty: this.props.playQuestionDifficulty,
      category: this.props.playQuestionCategory,
      answer: this.props.playAnswer.choice,
      time: this.props.playAnswer.time,
      rating: this.props.userQuestions.totals.all.rating,
      rank: this.props.userQuestions.totals.all.rank,
      experience: this.props.userXP.total,
      achievements: this.props.userAchievements,
      userQuestions: { Easy, Medium, Hard },
      userTotals: this.props.userQuestions.totals
    })
  }

  updateQuestionTotalsModule = () => {
    this.props.onUpdateQuestionTotalsFromPlayController(this.props.playResults.questionTotals)
    this.props.onUpdateGameStatus('updateQuestionTotalsSuccess', true)
  }

  updateUserQuestionsModule = () => {
    this.props.onUpdateUserPerformanceFromPlayController({
      difficulty: this.props.playQuestionDifficulty,
      category: this.props.playQuestionCategory,
      dRating: this.props.userQuestions.totals.difficulty[this.props.playQuestionDifficulty].rating,
      cRating: this.props.userQuestions.totals.category[this.props.playQuestionCategory].rating,
      oPerf: this.props.playResults.performance.oPerf,
      qPerf: this.props.playResults.performance.qPerf
    })

    this.props.onUpdateUserExperienceFromPlayController({
      level: this.props.playResults.experience.level,
      total: this.props.playResults.experience.newTotal
    })

    if(this.props.playResults.achievements.total > 0){
      this.props.onUpdateUserAchievementsFromPlayController(this.props.playResults.achievements)
    }

    this.props.onUpdateUserQuestionIdsFromPlayController(this.props.playQuestionId)

    this.props.onUpdateUserQuestionTotalsFromPlayController(this.props.playResults.userTotals)

    this.props.onUpdateUserQuestionsFromPlayController(this.props.playQuestionId, {
        achievements: this.props.playResults.achievements,
        answer: this.props.playAnswer.choice,
        category: this.props.playQuestionCategory,
        correct_answer: this.props.playResults.correct_answer,
        difficulty: this.props.playQuestionDifficulty,
        experience: this.props.playResults.experience,
        performance: this.props.playResults.performance.qPerf,
        question: this.props.playQuestionQuestion,
        result: this.props.playResults.result,
        time: this.props.playAnswer.time
      })

    this.props.onUpdateGameStatus('updateUserQuestionsSuccess', true)
  }

  setResultsModule = () => {
    this.props.onSetGameState('results')
    this.props.onUpdateGameStatus('setAllResultsSuccess', true)
  }

  displayResultsModule = () => {
    this.props.onUpdateGameStatus('displayResults', false)
    this.props.history.push( routes[this.props.playGameMode] + '/results/stats' )
    this.props.onLoadingModal(false)
  }

  updateUserVotesModule = () => {
    this.props.onUpdateVoteStatus('sentVote', true)
    this.props.onUpdateUserVotesFromPlayController({
      type: 'play',
      vid: this.props.playResults.vote.vid,
      qid: this.props.playQuestionId,
      difficulty: this.props.playQuestionDifficulty,
      category: this.props.playQuestionCategory,
      vote: this.props.playResults.vote.vote
    })
  }

  updateUserCommentsModule = () => {
    this.props.onUpdateCommentStatus('sentComment', true)
    this.props.onUpdateUserCommentsFromPlayController({
      type: 'play',
      cid: this.props.playResults.comment.cid,
      qid: this.props.playQuestionId,
      category: this.props.playQuestionCategory,
      comment: this.props.playResults.comment.comment,
      difficulty: this.props.playQuestionDifficulty,
      timestamp: this.props.playResults.comment.timestamp
    })
  }

  displayVotesModule = () => {
    this.props.onUpdateVoteStatus('displayVotes', false)
    this.props.onResetVote()
  }

  displayCommentsModule = () => {
    this.props.onUpdateCommentStatus('displayComments', false)
    this.props.onResetComment()
  }

  render(){

    let loadingModal,
        completedPath

    if(this.props.playGameMode === 'quick_play' || localStorage.gameMode === 'quick_play') completedPath = routes.play + '/completed'
    else completedPath = routes[localStorage.gameMode] + '/completed' || routes[this.props.playGameMode] + '/completed'

    if(this.props.playGameState === 'select' || this.props.playGameState === 'mount' || this.props.playGameState === 'question') {
      loadingModal = <LoadingModal show={ this.props.modalLoading } modalType={ 'play' } barType={ 'loadQuestion' } />
    }

    if(this.props.playGameState === 'answered' || this.props.playGameState === 'results') {
      loadingModal = <LoadingModal show={ this.props.modalLoading } modalType={ 'play' } barType={ 'loadResults' } />
    }

    let routeBoard =
      <Switch>
        <Route exact path={ completedPath }>
          <CompletedContainer />
        </Route>
        <Route path={ routes[localStorage.gameMode] + '/results' || routes[this.props.playGameMode] + '/results' }>
          <ResultsContainer staticResults={ false } />
        </Route>
        <Route exact path={ routes[localStorage.gameMode] + '/question' || routes[this.props.playGameMode] + '/question' }>
          <QuestionContainer />
        </Route>
        <Route path={ routes.play || routes[this.props.playGameMode] + '/select' }>
          <SelectionContainer
            setGameMode={ this.props.onSetGameMode }
            setGameState={ this.props.onSetGameState }
            resetGameQset={ this.props.onResetGameQset }
            updateGameStatus={ this.props.onUpdateGameStatus }
            resetQuestion={ this.props.onResetQuestion }
            reSelectGameMode={ this.reSelectGameModeModule }
            onLoadingModal={ this.props.onLoadingModal }
          />
        </Route>
      </Switch>

    return(
      <>
        { loadingModal }
        { routeBoard }
      </>
    )
  }
}

const store = (store) => {
  return {
    modalLoading: store.modal.loading,
    authStatus: store.auth.status,
    authLoading: store.auth.loading,
    playGameState: store.play.gameState,
    playGameMode: store.play.gameMode,
    playQuestion: !!store.play.question,
    playQuestionId: store.play.question ? store.play.question.id : null,
    playQuestionQuestion: store.play.question ? store.play.question.question : null,
    playQuestionDifficulty: store.play.question ? store.play.question.difficulty : null,
    playQuestionCategory: store.play.question ? store.play.question.category : null,
    playQuestionsCompleted: store.play.question ? store.play.question.completed : null,
    playStatus: store.play.status,
    playQset: store.play.gameQset,
    playAnswer: store.play.answer,
    playResults: store.play.results,
    playQuestionAnswer: store.play.question ? store.play.question.answers : null,
    voteStatus: store.play.voteStatus,
    commentStatus: store.play.commentStatus,
    userQuestions: store.user.questions,
    userXP: store.user.experience,
    userAchievements: store.user.achievements
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onUpdateGameStatus: (status, loading) => dispatch(updateGameStatus(status, loading)),
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onResetGameMode: () => dispatch(resetGameMode()),
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetGameState: () => dispatch(resetGameState()),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(getCatQuestion(obj)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onGetResults: (obj) => dispatch(getResults(obj)),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: () => dispatch(resetVote()),
    onResetComment: () => dispatch(resetComment()),
    onUpdateUserPerformanceFromPlayController: (obj) => dispatch(updateUserPerformanceFromPlayController(obj)),
    onUpdateUserExperienceFromPlayController: (obj) => dispatch(updateUserExperienceFromPlayController(obj)),
    onUpdateUserAchievementsFromPlayController: (obj) => dispatch(updateUserAchievementsFromPlayController(obj)),
    onUpdateQuestionTotalsFromPlayController: (obj) => dispatch(updateQuestionTotalsFromPlayController(obj)),
    onUpdateUserQuestionIdsFromPlayController: (id) => dispatch(updateUserQuestionIdsFromPlayController(id)),
    onUpdateUserQuestionsFromPlayController: (id, obj) => dispatch(updateUserQuestionsFromPlayController(id, obj)),
    onUpdateUserQuestionTotalsFromPlayController: (obj) => dispatch(updateUserQuestionTotalsFromPlayController(obj)),
    onUpdateUserVotesFromPlayController: (id, obj) => dispatch(updateUserVotesFromPlayController(id, obj)),
    onUpdateUserCommentsFromPlayController: (id, obj) => dispatch(updateUserCommentsFromPlayController(id, obj))
  }
}

export default withRouter(connect(store, dispatch)(PlayController))