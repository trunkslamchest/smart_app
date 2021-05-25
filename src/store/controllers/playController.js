import React from 'react'
import { useCallback, useEffect, useRef } from 'react'
import useOnMount from '../../utility/hooks/useOnMount'
import { useHistory } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths'
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

const PlayController = (props) => {

  const history = useHistory()

  const {
    authLoading,
    authStatus,
    commentStatus,
    onGetCatQuestion,
    onGetDiffQuestion,
    onGetQuickQuestion,
    onGetResults,
    onLoadingModal,
    onResetAnswer,
    onResetComment,
    onResetGameMode,
    onResetGameState,
    onResetGameQset,
    onResetQuestion,
    onResetResults,
    onResetVote,
    onSetGameState,
    onUpdateCommentStatus,
    onUpdateGameStatus,
    onUpdateQuestionTotalsFromPlayController,
    onUpdateUserAchievementsFromPlayController,
    onUpdateUserCommentsFromPlayController,
    onUpdateUserExperienceFromPlayController,
    onUpdateUserQuestionsFromPlayController,
    onUpdateUserPerformanceFromPlayController,
    onUpdateUserQuestionIdsFromPlayController,
    onUpdateUserQuestionTotalsFromPlayController,
    onUpdateUserVotesFromPlayController,
    onUpdateVoteStatus,
    playAnswer,
    playGameMode,
    playGameState,
    playResults,
    playStatus,
    playQset,
    playQuestion,
    playQuestionAnswer,
    playQuestionCategory,
    playQuestionDifficulty,
    playQuestionId,
    playQuestionQuestion,
    playQuestionsCompleted,
    userAchievements,
    userQuestions,
    userXP,
    voteStatus
  } = props

  let propsRef = useRef()

  propsRef.current = {
    playStatus: playStatus,
    playGameMode: playGameMode,
    playGameState: playGameState,
    playQset: playQset,
    playQuestionQuestion: playQuestionQuestion,
    playAnswer: playAnswer,
    playResults: playResults,
    voteStatus: voteStatus,
    commentStatus: commentStatus
  }

  const initGameModule = useCallback(() => {
    onLoadingModal(true)
    onUpdateGameStatus('initGame', true)
    onSetGameState('init')
  }, [
    onLoadingModal,
    onSetGameState,
    onUpdateGameStatus
  ])

  const reInitGameModule = useCallback(() => {
    if (playGameMode === 'quick_play') {
      onUpdateGameStatus('setQuickPlay', true)
      let questionObj = { answeredIds: [] }
      if(userQuestions.ids) questionObj['answeredIds'] = userQuestions.ids
      onGetQuickQuestion(questionObj)
      onSetGameState('mount')
    } else {
      onUpdateGameStatus('setQset', true)
      let questionObj = { answeredIds: [], qSet: playQset }
      if(userQuestions.ids) questionObj['answeredIds'] = userQuestions.ids
      if(playGameMode === 'by_diff') onGetDiffQuestion(questionObj)
      if(playGameMode === 'by_cat') onGetCatQuestion(questionObj)
      onSetGameState('mount')
    }
    history.push(routes[playGameMode] + '/question')
  }, [
    history,
    playGameMode,
    playQset,
    userQuestions,
    onGetCatQuestion,
    onGetDiffQuestion,
    onGetQuickQuestion,
    onSetGameState,
    onUpdateGameStatus
  ])

  const selectGameModeModule = useCallback(() => {
    onLoadingModal(false)
    onUpdateGameStatus('selectGameMode', false)
    onSetGameState('select')
  }, [
    onLoadingModal,
    onSetGameState,
    onUpdateGameStatus
  ])

  const reSelectGameModeModule = () => {
    if(props.modalLoading) props.onLoadingModal(false)
    props.onUpdateGameStatus('selectGameMode', false)
    if(!props.playGameState) props.onSetGameState('select')
    if(props.playQuestion) props.onResetQuestion()
    if(props.playGameMode) props.onResetGameMode()
    if(props.playQset) props.onResetGameQset()
    if(props.playAnswer) props.onResetAnswer()
    if(props.playResults) props.onResetResults()
    if(props.voteStatus) props.onResetVote()
    if(props.commentStatus) props.onResetComment()
  }

  const setGameCompletedModule = useCallback(() => {
    onUpdateGameStatus('displayQuestion', false)

    if (playGameMode === 'quick_play') history.push( routes.play + '/completed' )
    else history.push( routes[playGameMode] + '/completed' )

    onSetGameState('completed')
    onLoadingModal(false)
  }, [
    history,
    playGameMode,
    onLoadingModal,
    onSetGameState,
    onUpdateGameStatus
  ])

  const mountGameModeModule = useCallback((gameMode) => {
    onLoadingModal(true)
    onUpdateGameStatus(gameMode, true)
    let questionObj = { answeredIds: [] }

    if(userQuestions.ids) questionObj['answeredIds'] = userQuestions.ids
    if(playQset) questionObj.qSet = playQset

    if(gameMode === 'setQuickPlay') onGetQuickQuestion(questionObj)
    if(gameMode === 'setByDiff') onGetDiffQuestion(questionObj)
    if(gameMode === 'setByCat') onGetCatQuestion(questionObj)

    onSetGameState('mount')
  }, [
    playQset,
    userQuestions,
    onGetCatQuestion,
    onGetDiffQuestion,
    onGetQuickQuestion,
    onLoadingModal,
    onSetGameState,
    onUpdateGameStatus
  ])

  const displayQuestionModule = useCallback(() => {
     if(playQuestionsCompleted && playGameState === 'mount') {
      setGameCompletedModule()
    } else {
      onUpdateGameStatus('displayQuestion', false)
      onSetGameState('question')
      onLoadingModal(false)
    }
  }, [
    playGameState,
    playQuestionsCompleted,
    onLoadingModal,
    onSetGameState,
    onUpdateGameStatus,
    setGameCompletedModule
  ])

  const setAnsweredModule = useCallback(() => {
    onUpdateGameStatus('answered', true)
    onSetGameState('answered')
  }, [
    onSetGameState,
    onUpdateGameStatus
  ])

  const getResultsModule = useCallback(() => {
    let Easy = userQuestions.Easy
    let Medium = userQuestions.Medium
    let Hard = userQuestions.Hard

    onGetResults({
      uid: localStorage.id,
      qid: playQuestionId,
      difficulty: playQuestionDifficulty,
      category: playQuestionCategory,
      answer: playAnswer.choice,
      time: playAnswer.time,
      rating: userQuestions.totals.all.rating,
      rank: userQuestions.totals.all.rank,
      experience: userXP.total,
      achievements: userAchievements,
      userQuestions: { Easy, Medium, Hard },
      userTotals: userQuestions.totals
    })
  }, [
    playAnswer,
    playQuestionId,
    playQuestionCategory,
    playQuestionDifficulty,
    userAchievements,
    userQuestions,
    userXP,
    onGetResults
  ])

  const updateQuestionTotalsModule = useCallback(() => {
    onUpdateQuestionTotalsFromPlayController(playResults.questionTotals)
    onUpdateGameStatus('updateQuestionTotalsSuccess', true)
  }, [
    playResults,
    onUpdateGameStatus,
    onUpdateQuestionTotalsFromPlayController
  ])

  const updateUserQuestionsModule = useCallback(() => {
    onUpdateUserPerformanceFromPlayController({
      difficulty: playQuestionDifficulty,
      category: playQuestionCategory,
      dRating: userQuestions.totals.difficulty[playQuestionDifficulty].rating,
      cRating: userQuestions.totals.category[playQuestionCategory].rating,
      oPerf: playResults.performance.oPerf,
      qPerf: playResults.performance.qPerf
    })

    onUpdateUserExperienceFromPlayController({
      level: playResults.experience.level,
      total: playResults.experience.newTotal
    })

    if(playResults.achievements.total > 0){
      onUpdateUserAchievementsFromPlayController(playResults.achievements)
    }

    onUpdateUserQuestionIdsFromPlayController(playQuestionId)

    onUpdateUserQuestionTotalsFromPlayController(playResults.userTotals)

    onUpdateUserQuestionsFromPlayController(playQuestionId, {
        achievements: playResults.achievements,
        answer: playAnswer.choice,
        category: playQuestionCategory,
        correct_answer: playResults.correct_answer,
        difficulty: playQuestionDifficulty,
        experience: playResults.experience,
        performance: playResults.performance.qPerf,
        question: playQuestionQuestion,
        result: playResults.result,
        time: playAnswer.time
      })

    onUpdateGameStatus('updateUserQuestionsSuccess', true)
  }, [
    playAnswer,
    playResults,
    playQuestionCategory,
    playQuestionDifficulty,
    playQuestionId,
    playQuestionQuestion,
    userQuestions,
    onUpdateGameStatus,
    onUpdateUserAchievementsFromPlayController,
    onUpdateUserExperienceFromPlayController,
    onUpdateUserPerformanceFromPlayController,
    onUpdateUserQuestionsFromPlayController,
    onUpdateUserQuestionIdsFromPlayController,
    onUpdateUserQuestionTotalsFromPlayController
  ])

  const setResultsModule = useCallback(() => {
    onSetGameState('results')
    onUpdateGameStatus('setAllResultsSuccess', true)
  }, [
    onSetGameState,
    onUpdateGameStatus
  ])

  const displayResultsModule = useCallback(() => {
    onUpdateGameStatus('displayResults', false)
    history.push( routes[playGameMode] + '/results/stats' )
    onLoadingModal(false)
  }, [
    history,
    playGameMode,
    onLoadingModal,
    onUpdateGameStatus
  ])

  const updateUserVotesModule = useCallback(() => {
    onUpdateVoteStatus('sentVote', true)
    onUpdateUserVotesFromPlayController({
      type: 'play',
      vid: playResults.vote.vid,
      qid: playQuestionId,
      difficulty: playQuestionDifficulty,
      category: playQuestionCategory,
      vote: playResults.vote.vote
    })
  }, [
    playQuestionCategory,
    playQuestionDifficulty,
    playQuestionId,
    playResults,
    onUpdateVoteStatus,
    onUpdateUserVotesFromPlayController
  ])

  const updateUserCommentsModule = useCallback(() => {
    onUpdateCommentStatus('sentComment', true)
    onUpdateUserCommentsFromPlayController({
      type: 'play',
      cid: playResults.comment.cid,
      qid: playQuestionId,
      category: playQuestionCategory,
      comment: playResults.comment.comment,
      difficulty: playQuestionDifficulty,
      timestamp: playResults.comment.timestamp
    })
  }, [
    playQuestionId,
    playQuestionCategory,
    playQuestionDifficulty,
    playResults,
    onUpdateCommentStatus,
    onUpdateUserCommentsFromPlayController
  ])

  const displayVotesModule = useCallback(() => {
    onUpdateVoteStatus('displayVotes', false)
    onResetVote()
  }, [
    onUpdateVoteStatus,
    onResetVote
  ])

  const displayCommentsModule = useCallback(() => {
    onUpdateCommentStatus('displayComments', false)
    onResetComment()
  }, [
    onUpdateCommentStatus,
    onResetComment
  ])

  useOnMount(() => {
    if(authStatus === 'authValid'&& !playGameState) initGameModule()
    if(playGameMode === 'quick_play' && playGameState === 'select') mountGameModeModule('setQuickPlay')
    return () => reset()
  }, [
    authStatus,
    playGameMode,
    playGameState
  ])

  const reset = () => {
    localStorage.removeItem('gameMode')
    if(propsRef.current.playStatus) onUpdateGameStatus(null, false)
    if(propsRef.current.playGameMode) onResetGameMode()
    if(propsRef.current.playGameState)  onResetGameState()
    if(propsRef.current.playQset) onResetGameQset()
    if(propsRef.current.playQuestionQuestion) onResetQuestion()
    if(propsRef.current.playAnswer) onResetAnswer()
    if(propsRef.current.playResults) onResetResults()
    if(propsRef.current.voteStatus) onResetVote()
    if(propsRef.current.commentStatus) onResetComment()
  }

  useEffect(() => {
    if(authStatus === 'authValid' && !authLoading) {
      if(!playGameState) initGameModule()
      if(playGameState === 'init' && !playGameMode) selectGameModeModule()
      if(playGameState === 'reInit' && !playQuestion) reInitGameModule()
      // if(playGameState === 'select' && playStatus === 'selectQset') selectQsetModule()
      if(playGameMode === 'quick_play' && playGameState === 'select') mountGameModeModule('setQuickPlay')
      if(playGameMode === 'by_diff' && playQset && playGameState === 'select') mountGameModeModule('setByDiff')
      if(playGameMode === 'by_cat' && playQset && playGameState === 'select') mountGameModeModule('setByCat')
      if(playGameState === 'mount' && playStatus === 'setQuestionSuccess') displayQuestionModule()
      if(playGameState === 'question' && playAnswer) setAnsweredModule()
      if(playGameState === 'answered' && !playResults) getResultsModule()
      if(playGameState === 'answered' && playStatus === 'updateQuestionSuccess' && playResults) updateQuestionTotalsModule()
      if(playGameState === 'answered' && playStatus === 'updateQuestionTotalsSuccess' && playQuestionAnswer) updateUserQuestionsModule()
      if(playGameState === 'answered' && playStatus === 'updateUserQuestionsSuccess') setResultsModule()
      if(playGameState === 'results' && playStatus === 'setAllResultsSuccess') displayResultsModule()
      if(playGameState === 'results' && voteStatus === 'initVote' && playResults.vote) updateUserVotesModule()

      if(playGameState === 'results'
         && voteStatus === 'voteSuccess'
         && userQuestions.list[playQuestionId].vote)
         displayVotesModule()

      if(playGameState === 'results' && commentStatus === 'initComment' && playResults.comment) updateUserCommentsModule()

      if(playGameState === 'results'
        && commentStatus === 'commentSuccess'
        && userQuestions.list[playQuestionId].comments[playResults.comment.cid])
        displayCommentsModule()
    }
  }, [
    authLoading,
    authStatus,
    commentStatus,
    playAnswer,
    playGameState,
    playGameMode,
    playResults,
    playStatus,
    playQset,
    playQuestion,
    playQuestionAnswer,
    playQuestionId,
    userQuestions,
    voteStatus,
    displayCommentsModule,
    displayQuestionModule,
    displayResultsModule,
    displayVotesModule,
    getResultsModule,
    initGameModule,
    mountGameModeModule,
    reInitGameModule,
    selectGameModeModule,
    setAnsweredModule,
    setResultsModule,
    updateQuestionTotalsModule,
    updateUserCommentsModule,
    updateUserQuestionsModule,
    updateUserVotesModule
  ])

  let loadingModal,
      completedPath

  if(props.playGameMode === 'quick_play' || localStorage.gameMode === 'quick_play') completedPath = routes.play + '/completed'
  else completedPath = routes[localStorage.gameMode] + '/completed' || routes[props.playGameMode] + '/completed'

  if(props.playGameState === 'select' || props.playGameState === 'mount' || props.playGameState === 'question') {
    loadingModal = <LoadingModal show={ props.modalLoading } modalType={ 'play' } barType={ 'loadQuestion' } />
  }

  if(props.playGameState === 'answered' || props.playGameState === 'results') {
    loadingModal = <LoadingModal show={ props.modalLoading } modalType={ 'play' } barType={ 'loadResults' } />
  }

  let routeBoard =
    <Switch>
      <Route exact path={ completedPath }>
        <CompletedContainer />
      </Route>
      <Route path={ routes[localStorage.gameMode] + '/results' || routes[props.playGameMode] + '/results' }>
        <ResultsContainer staticResults={ false } />
      </Route>
      <Route exact path={ routes[localStorage.gameMode] + '/question' || routes[props.playGameMode] + '/question' }>
        <QuestionContainer />
      </Route>
      <Route path={ routes.play || routes[props.playGameMode] + '/select' }>
        <SelectionContainer
          setGameMode={ props.onSetGameMode }
          setGameState={ props.onSetGameState }
          resetGameQset={ props.onResetGameQset }
          updateGameStatus={ props.onUpdateGameStatus }
          resetQuestion={ props.onResetQuestion }
          reSelectGameMode={ reSelectGameModeModule }
          onLoadingModal={ props.onLoadingModal }
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

// export default withRouter(connect(store, dispatch)(PlayController))
export default connect(store, dispatch)(PlayController)
