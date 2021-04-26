import React from 'react'
import { Route } from 'react-router-dom'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import SelectionContainer from '../../play/selection/selectionContainer'
import QuestionContainer from '../../play/question/questionContainer'
import ResultsContainer from '../../play/results/resultsContainer'
import CompletedContainer from '../../play/completed/completedContainer'

import Wrapper from '../../UI/wrapper/wrapper'
import LoadingModal from '../../UI/loading/loadingModal/loadingModal'

class PlayController extends React.Component {

  componentDidMount(){
    if(this.props.auth.status === 'authValid') this.initGameModule()
  }

  componentDidUpdate(){
    if(this.props.auth.status === 'authValid' && !this.props.auth.loading) {
      if(!this.props.play.gameState) this.initGameModule()
      if(this.props.play.gameState === 'reInit' && !this.props.play.question) this.reInitGameModule()
      if(this.props.play.gameState === 'init' && !this.props.play.gameMode) this.selectGameModeModule()
      if(this.props.play.gameState === 'select' && this.props.play.status === 'setGameModeSuccess') this.mountGameModeModule()
      if(this.props.play.gameState === 'select' && this.props.play.status === 'selectQset') this.selectQsetModule()
      if(this.props.play.gameState === 'select' && this.props.play.gameQset) this.setQsetModule()
      if(this.props.play.gameState === 'mount' && this.props.play.question) this.setGameQuestionModule()
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
         && this.props.user.questions[this.props.play.question.difficulty].categories[this.props.play.question.category][this.props.play.question.id].vote)
         this.displayVotesModule()

      if(this.props.play.gameState === 'results' && this.props.play.commentStatus === 'initComment' && this.props.play.results.comment) this.updateUserCommentsModule()

      if(this.props.play.gameState === 'results' &&
         this.props.play.commentStatus === 'commentSuccess' &&
         this.props.user.questions[this.props.play.question.difficulty].categories[this.props.play.question.category][this.props.play.question.id].comments[this.props.play.results.comment.cid])
        this.displayCommentsModule()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false

    // console.log(nextProps)

   if(this.props.modal.loading || nextProps.modal.loading || this.props.auth.status === 'authValid') {
      render = true
    }

    return render
    // return true
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
  }

  selectGameModeModule = () => {
    if(localStorage.gameMode) {
      this.props.onSetGameMode(localStorage.gameMode)
      this.props.onUpdateGameStatus('setGameModeSuccess', true)
      this.props.onSetGameState('select')
    } else {
      this.props.onLoadingModal(false)
      this.props.onUpdateGameStatus('selectGameMode', false)
      this.props.onSetGameState('select')
    }
  }

  mountGameModeModule = () => {
    if (this.props.play.gameMode === 'quick_play') {
      this.props.onUpdateGameStatus('setQuickPlay', true)
      let questionObj = { answeredIds: [] }
      if(this.props.user.questions.ids) questionObj['answeredIds'] = this.props.user.questions.ids
      this.props.onGetQuickQuestion(questionObj)
      this.props.onSetGameState('mount')
    } else {
      this.props.onLoadingModal(false)
      this.props.onUpdateGameStatus('selectQset', false)
    }
  }

  selectQsetModule = () => {
    this.props.history.push( routes[this.props.play.gameMode] + '/select' )
  }

  setQsetModule = () => {
    this.props.onLoadingModal(true)
    this.props.onUpdateGameStatus('setQset', true)
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
      this.props.onSetGameState('question')
    }
  }

  displayQuestionModule = () => {
    this.props.onUpdateGameStatus('displayQuestion', false)
    this.props.onLoadingModal(false)
  }

  setGameCompletedModule = () => {
    this.props.onUpdateGameStatus('displayQuestion', false)
    this.props.history.push( routes[this.props.play.gameMode] + '/completed' )
    this.props.onSetGameState('completed')
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
    // this.props.onUpdateQuestionTotalsFromPlayController({
    //   difficulty: this.props.play.question.difficulty,
    //   category: this.props.play.question.category,
    //   time: this.props.play.answer.time,
    //   avg_time: this.props.play.results.avg_time,
    //   result: this.props.play.results.result
    // })
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
      results: this.props.play.results,
      experience: this.props.play.results.experience,
      achievements: this.props.play.results.achievements
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

    let loadingModal,
        selectRoute =
          <Route exact path={ routes.play }>
            <SelectionContainer history={ this.props.history } />
          </Route>

    if(this.props.play.gameState === 'mount' || this.props.play.gameState === 'question') {
      loadingModal = <LoadingModal show={ this.props.modal.loading } modalType={ 'play' } barType={ 'loadQuestion' } history={ this.props.history } />
    }

    if(this.props.play.gameState === 'answered' || this.props.play.gameState === 'results') {
      loadingModal = <LoadingModal show={ this.props.modal.loading } modalType={ 'play' } barType={ 'loadResults' } history={ this.props.history } />
    }

    if(this.props.play.gameState === 'select' && this.props.play.status === 'selectQset'){
      selectRoute =
        <Route exact path={ routes[this.props.play.gameMode] + '/select' }>
          <SelectionContainer history={ this.props.history } />
        </Route>
    }

    return(
      <>
        { loadingModal }
        {
          (() => {
            switch(this.props.play.gameState) {
              case 'select': return selectRoute;
              case 'question': return <Route exact path={ routes[this.props.play.gameMode] + '/question' }>
                                        <QuestionContainer history={ this.props.history } />
                                      </Route>;
              case 'results': return <Route path={ routes[this.props.play.gameMode] + '/results' }>
                                       <ResultsContainer staticResults={ false } history={ this.props.history } />
                                     </Route>;
              case 'completed': return <Route exact path={ routes[this.props.play.gameMode] + '/completed' }>
                                        <CompletedContainer history={ this.props.history } />
                                      </Route>;
              default: return <Wrapper />;
            }
          })()
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth,
    play: state.play,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
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
    onUpdateUserQuestionsFromPlayController: (obj) => dispatch(actions.updateUserQuestionsFromPlayController(obj)),
    onUpdateUserQuestionTotalsFromPlayController: (obj) => dispatch(actions.updateUserQuestionTotalsFromPlayController(obj)),
    onUpdateUserVotesFromPlayController: (id, obj) => dispatch(actions.updateUserVotesFromPlayController(id, obj)),
    onUpdateUserCommentsFromPlayController: (id, obj) => dispatch(actions.updateUserCommentsFromPlayController(id, obj)),
    onUpdateStaticQuestionVoteStatus: (status) => dispatch(actions.updateStaticQuestionVoteStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayController)