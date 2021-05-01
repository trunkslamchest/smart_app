import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import SelectionContainer from '../../play/selection/selectionContainer'
import QuestionContainer from '../../play/question/questionContainer'
import ResultsContainer from '../../play/results/resultsContainer'
import CompletedContainer from '../../play/completed/completedContainer'

// import Wrapper from '../../UI/wrapper/wrapper'
import LoadingModal from '../../UI/loading/loadingModal/loadingModal'

class PlayController extends React.Component {

  componentDidMount(){
    if(this.props.auth.status === 'authValid'&& !this.props.play.gameState) this.initGameModule()
    if(this.props.play.gameMode === 'quick_play' && this.props.play.gameState === 'select') this.mountGameModeModule('setQuickPlay')

  }

  componentDidUpdate(){
    if(this.props.auth.status === 'authValid' && !this.props.auth.loading) {

      if(!this.props.play.gameState) this.initGameModule()
      if(this.props.play.gameState === 'init' && !this.props.play.gameMode) this.selectGameModeModule()
      if(this.props.play.gameState === 'reInit' && !this.props.play.question) this.reInitGameModule()
      if(this.props.play.gameState === 'select' && this.props.play.status === 'selectQset') this.selectQsetModule()
      if(this.props.play.gameMode === 'quick_play' && this.props.play.gameState === 'select') this.mountGameModeModule('setQuickPlay')
      if(this.props.play.gameMode === 'by_diff' && this.props.play.gameQset && this.props.play.gameState === 'select') this.mountGameModeModule('setByDiff')
      if(this.props.play.gameMode === 'by_cat' && this.props.play.gameQset && this.props.play.gameState === 'select') this.mountGameModeModule('setByCat')

      if(this.props.play.gameState === 'mount' && this.props.play.status === 'setQuestionSuccess') this.displayQuestionModule()

      if(this.props.play.gameState === 'question' && this.props.play.answer) this.setAnsweredModule()
      if(this.props.play.gameState === 'answered' && !this.props.play.results) this.getResultsModule()
      if(this.props.play.gameState === 'answered' && this.props.play.status === 'updateQuestionSuccess' && this.props.play.results) this.updateQuestionTotalsModule()
      if(this.props.play.gameState === 'answered' && this.props.play.status === 'updateQuestionTotalsSuccess' && this.props.play.question.answers) this.updateUserQuestionsModule()
      if(this.props.play.gameState === 'answered' && this.props.play.status === 'updateUserQuestionsSuccess') this.setResultsModule()
      if(this.props.play.gameState === 'results' && this.props.play.status === 'setAllResultsSuccess') this.displayResultsModule()
      if(this.props.play.gameState === 'results' && this.props.play.voteStatus === 'initVote' && this.props.play.results.vote) this.updateUserVotesModule()

      if(this.props.play.gameState === 'results'
         && this.props.play.voteStatus === 'voteSuccess'
         && this.props.user.questions.list[this.props.play.question.id].vote)
         this.displayVotesModule()

      if(this.props.play.gameState === 'results' && this.props.play.commentStatus === 'initComment' && this.props.play.results.comment) this.updateUserCommentsModule()

      if(this.props.play.gameState === 'results' &&
         this.props.play.commentStatus === 'commentSuccess' &&
        this.props.user.questions.list[this.props.play.question.id].comments[this.props.play.results.comment.cid])
        this.displayCommentsModule()

    }
  }

  shouldComponentUpdate(nextProps, nextState){

    return true
  }

  componentWillUnmount(){
    localStorage.removeItem('gameMode')
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
    this.props.onLoadingModal(true)
    this.props.onUpdateGameStatus('initGame', true)
    this.props.onSetGameState('init')
  }

  reInitGameModule = () => {
    // console.log(this.props.gameMode)
    console.log(routes[this.props.play.gameMode] + '/question')
    if (this.props.play.gameMode === 'quick_play') {
      this.props.onUpdateGameStatus('setQuickPlay', true)
      let questionObj = { answeredIds: [] }
      if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
      this.props.onGetQuickQuestion(questionObj)
      this.props.onSetGameState('mount')
    } else {
      this.props.onUpdateGameStatus('setQset', true)
      let questionObj = { answeredIds: [], qSet: this.props.play.gameQset }
      if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
      if(this.props.play.gameMode === 'by_diff') this.props.onGetDiffQuestion(questionObj)
      if(this.props.play.gameMode === 'by_cat') this.props.onGetCatQuestion(questionObj)
      this.props.onSetGameState('mount')
    }
    this.props.history.push(routes[this.props.play.gameMode] + '/question')
  }

  selectGameModeModule = () => {
    this.props.onLoadingModal(false)
    this.props.onUpdateGameStatus('selectGameMode', false)
    this.props.onSetGameState('select')
  }

  reSelectGameModeModule = () => {
    this.props.onLoadingModal(false)
    this.props.onUpdateGameStatus('selectGameMode', false)
    this.props.onSetGameState('select')
    this.props.onResetGameMode()
    if(this.props.play.question) this.props.onResetQuestion()
    if(this.props.play.gameQset) this.props.onResetGameQset()
  }

  setGameCompletedModule = () => {
    this.props.onUpdateGameStatus('displayQuestion', false)
    if (this.props.play.gameMode === 'quick_play') {
      this.props.history.push( routes.play + '/completed' )
    
    } else {
      this.props.history.push( routes[this.props.play.gameMode] + '/completed' )

    }
    this.props.onSetGameState('completed')
    this.props.onLoadingModal(false)
  }

  mountGameModeModule = (gameMode) => {
    this.props.onUpdateGameStatus(gameMode, true)
    let questionObj = { answeredIds: [] }
    if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids

    if(this.props.play.gameQset) questionObj.qSet = this.props.play.gameQset

    if(gameMode === 'setQuickPlay') this.props.onGetQuickQuestion(questionObj)
    if(gameMode === 'setByDiff') this.props.onGetDiffQuestion(questionObj)
    if(gameMode === 'setByCat') this.props.onGetCatQuestion(questionObj)
    this.props.onSetGameState('mount')
  }

  displayQuestionModule = () => {
     if(this.props.play.question.completed && this.props.play.gameState === 'mount') 
    {

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
    let Easy = this.props.user.questions.Easy
    let Medium = this.props.user.questions.Medium
    let Hard = this.props.user.questions.Hard

    this.props.onGetResults({
      uid: localStorage.id,
      qid: this.props.play.question.id,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      answer: this.props.play.answer.choice,
      time: this.props.play.answer.time,
      rating: this.props.user.questions.totals.all.rating,
      rank: this.props.user.questions.totals.all.rank,
      experience: this.props.user.experience.total,
      achievements: this.props.user.achievements,
      userQuestions: { Easy, Medium, Hard },
      userTotals: this.props.user.questions.totals
    })
  }

  updateQuestionTotalsModule = () => {
    this.props.onUpdateQuestionTotalsFromPlayController(this.props.play.results.questionTotals)
    this.props.onUpdateGameStatus('updateQuestionTotalsSuccess', true)
  }

  updateUserQuestionsModule = () => {
    this.props.onUpdateUserPerformanceFromPlayController({
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      dRating: this.props.user.questions.totals.difficulty[this.props.play.question.difficulty].rating,
      cRating: this.props.user.questions.totals.category[this.props.play.question.category].rating,
      oPerf: this.props.play.results.performance.oPerf,
      qPerf: this.props.play.results.performance.qPerf
    })

    this.props.onUpdateUserExperienceFromPlayController({
      level: this.props.play.results.experience.level,
      total: this.props.play.results.experience.newTotal
    })

    if(this.props.play.results.achievements.total > 0){
      this.props.onUpdateUserAchievementsFromPlayController(this.props.play.results.achievements)
    }

    this.props.onUpdateUserQuestionIdsFromPlayController(this.props.play.question.id)

    this.props.onUpdateUserQuestionTotalsFromPlayController(this.props.play.results.userTotals)

    this.props.onUpdateUserQuestionsFromPlayController(this.props.play.question.id, {
        answer: this.props.play.answer.choice,
        category: this.props.play.question.category,
        correct_answer: this.props.play.results.correct_answer,
        difficulty: this.props.play.question.difficulty,
        experience: this.props.play.results.experience,
        performance: this.props.play.results.performance.qPerf,
        question: this.props.play.question.question,
        result: this.props.play.results.result,
        time: this.props.play.answer.time
      })

    this.props.onUpdateGameStatus('updateUserQuestionsSuccess', true)
  }

  setResultsModule = () => {
    this.props.onSetGameState('results')
    this.props.onUpdateGameStatus('setAllResultsSuccess', true)
  }

  displayResultsModule = () => {
    this.props.onUpdateGameStatus('displayResults', false)
    this.props.history.push( routes[this.props.play.gameMode] + '/results/stats' )
    this.props.onLoadingModal(false)
  }

  updateUserVotesModule = () => {
    this.props.onUpdateVoteStatus('sentVote', true)
    this.props.onUpdateUserVotesFromPlayController({
      type: 'play',
      vid: this.props.play.results.vote.vid,
      qid: this.props.play.question.id,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      vote: this.props.play.results.vote.vote
    })
  }

  updateUserCommentsModule = () => {
    this.props.onUpdateCommentStatus('sentComment', true)
    this.props.onUpdateUserCommentsFromPlayController({
      type: 'play',
      cid: this.props.play.results.comment.cid,
      qid: this.props.play.question.id,
      category: this.props.play.question.category,
      comment: this.props.play.results.comment.comment,
      difficulty: this.props.play.question.difficulty,
      timestamp: this.props.play.results.comment.timestamp
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

    // console.log(routes[localStorage.gameMode] + '/completed' )
    // console.log(routes[localStorage.gameMode] + '/completed' || routes[this.props.play.gameMode] + '/completed' || routes.play + '/completed')

    let loadingModal,
        completedPath

    if(this.props.play.gameMode === 'quick_play') completedPath = routes.play + '/completed'
    else completedPath = routes[localStorage.gameMode] + '/completed' || routes[this.props.play.gameMode] + '/completed'

    console.log(this.props.play.gameMode, completedPath)

    if(this.props.play.gameState === 'mount' || this.props.play.gameState === 'question') {
      loadingModal = <LoadingModal show={ this.props.modal.loading } modalType={ 'play' } barType={ 'loadQuestion' } history={ this.props.history } />
    }

    if(this.props.play.gameState === 'answered' || this.props.play.gameState === 'results') {
      loadingModal = <LoadingModal show={ this.props.modal.loading } modalType={ 'play' } barType={ 'loadResults' } history={ this.props.history } />
    }

    let routeBoard =
      <Switch>
        <Route exact path={ completedPath }>
          <CompletedContainer history={ this.props.history } />
        </Route>
        <Route path={ routes[localStorage.gameMode] + '/results' || routes[this.props.play.gameMode] + '/results' }>
          <ResultsContainer staticResults={ false } history={ this.props.history } />
        </Route>
        {/* <Route exact path={ routes[this.props.play.gameMode] + '/question' }> */}
        <Route exact path={ routes[localStorage.gameMode] + '/question' || routes[this.props.play.gameMode] + '/question' }>
          <QuestionContainer history={ this.props.history } />
        </Route>
        <Route path={ routes.play || routes[this.props.play.gameMode] + '/select' }>
          <SelectionContainer
            setGameMode={ this.props.onSetGameMode }
            setGameState={ this.props.onSetGameState }
            resetGameQset={ this.props.onResetGameQset }
            updateGameStatus={ this.props.onUpdateGameStatus }
            resetQuestion={ this.props.onResetQuestion }
            reSelectGameMode={ this.reSelectGameModeModule }
            onLoadingModal={ this.props.onLoadingModal }
            history={ this.props.history }
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
    modal: store.modal,
    auth: store.auth,
    play: store.play,
    user: store.user,
    questions: store.questions
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(actions.loading(bool)),
    onUpdateGameStatus: (status, loading) => dispatch(actions.updateGameStatus(status, loading)),
    onUpdateVoteStatus: (status, loading) => dispatch(actions.updateVoteStatus(status, loading)),
    onUpdateCommentStatus: (status, loading) => dispatch(actions.updateCommentStatus(status, loading)),
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onResetVote: () => dispatch(actions.resetVote()),
    onResetComment: () => dispatch(actions.resetComment()),
    onUpdateUserPerformanceFromPlayController: (obj) => dispatch(actions.updateUserPerformanceFromPlayController(obj)),
    onUpdateUserExperienceFromPlayController: (obj) => dispatch(actions.updateUserExperienceFromPlayController(obj)),
    onUpdateUserAchievementsFromPlayController: (obj) => dispatch(actions.updateUserAchievementsFromPlayController(obj)),
    onUpdateQuestionTotalsFromPlayController: (obj) => dispatch(actions.updateQuestionTotalsFromPlayController(obj)),
    onUpdateUserQuestionIdsFromPlayController: (id) => dispatch(actions.updateUserQuestionIdsFromPlayController(id)),
    onUpdateUserQuestionsFromPlayController: (id, obj) => dispatch(actions.updateUserQuestionsFromPlayController(id, obj)),
    onUpdateUserQuestionTotalsFromPlayController: (obj) => dispatch(actions.updateUserQuestionTotalsFromPlayController(obj)),
    onUpdateUserVotesFromPlayController: (id, obj) => dispatch(actions.updateUserVotesFromPlayController(id, obj)),
    onUpdateUserCommentsFromPlayController: (id, obj) => dispatch(actions.updateUserCommentsFromPlayController(id, obj)),
    onUpdateStaticQuestionVoteStatus: (status) => dispatch(actions.updateStaticQuestionVoteStatus(status))
  }
}

export default connect(store, dispatch)(PlayController)