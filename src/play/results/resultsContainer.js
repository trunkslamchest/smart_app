import React from 'react'
import { useHistory } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import useOnMount from '../../utility/hooks/useOnMount'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import {
  clearStaticQuestion,
  clearQuestionStatus,
  clearStaticUserQuestion,
  clearStaticQuestionVoteStatus,
  clearStaticUserVote,
  loading,
  updateGameStatus,
  setGameState,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment,
  help,
  setHelpHeader,
  setHelpSections
} from '../../store/actions/actionIndex'

import makeResultsNavBarButtons from './resultsFunctions/makeResultsNavBarButtons'
import makeResultsHelpSections from './resultsFunctions/makeResultsHelpSections'

import ResultsStatsContainer from './resultsStats/resultsStatsContainer'
import ResultsDiscussContainer from './resultsDiscuss/resultsDiscussContainer'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import resultsNavBarIconIndex from '../../assets/nav_bar_icons/resultsNavBarIconIndex'

import './resultsContainer.css'
import './resultsResponse.css'

const ResultsContainer = (props) => {

  const history = useHistory()

  const {
    staticResults,
    playGameMode,
    playQuestion,
    onClearStaticQuestion,
    onClearStaticUserQuestion,
    onClearQuestionStatus,
    onClearStaticQuestionVoteStatus,
    onClearStaticUserVote
  } = props

  useOnMount(() => {
    requestAnimationFrame(() => { requestAnimationFrame(() => { document.body.scrollTo({ behavior: "smooth", top: 0 }) }) })
    if(!staticResults)  document.title = `SmartApp™ | Play | ${ playGameMode } | Results`
    if(!playQuestion && !staticResults) history.push( routes.play )

    return function cleanup(){
      onClearStaticQuestion()
      onClearStaticUserQuestion()
      onClearQuestionStatus()
      onClearStaticQuestionVoteStatus()
      onClearStaticUserVote()
    }
  }, [
      staticResults,
      playGameMode,
      playQuestion,
      history,
      routes,
      onClearStaticQuestion,
      onClearStaticUserQuestion,
      onClearQuestionStatus,
      onClearStaticQuestionVoteStatus,
      onClearStaticUserVote
    ]
  )

  const onClickNextQuestionFunction = () => {
    props.onSetGameState('reInit')
    props.onUpdateGameStatus('reInitGame', true)
    props.onLoadingModal(true)
    if(props.playQuestion) props.onResetQuestion()
    if(props.playAnswer) props.onResetAnswer()
    if(props.playResults) props.onResetResults()
    if(props.playVoteStatus) props.onResetVote()
    if(props.playCommentStatus) props.onResetComment()
  }

  const onHelp = () => {
    props.onSetHelpHeader('SmartApp™ Results')
    props.onSetHelpSections(makeResultsHelpSections)
    props.onHelpModal(true)
  }

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  let routeBoard
  let statsRoute = routes[playGameMode] + '/results/stats'
  let discussRoute = routes[playGameMode] + '/results/discuss'

  if(staticResults){
    const baseStaticRoute = routes.static_results + '/' + props.diff + '/' + props.cat + '/' + props.qid
    statsRoute = baseStaticRoute + '/stats'
    discussRoute = baseStaticRoute + '/discuss'
    routeBoard =
      <Switch>
        <Route exact path={ statsRoute }>
          <ResultsStatsContainer
            staticResults={ staticResults }
            userAnswered={ props.userAnswered }
          />
        </Route>
        <Route exact path={ discussRoute }>
          <ResultsDiscussContainer
            cat={ props.cat }
            diff={ props.diff }
            qid={ props.qid }
            staticResults={ staticResults }
            userAnswered={ props.userAnswered }
          />
        </Route>
      </Switch>
  } else {
    routeBoard =
      <Switch>
        <Route exact path={ statsRoute }>
          <ResultsStatsContainer
            onClickNextQuestionFunction={ onClickNextQuestionFunction }
            staticResults={ staticResults }
            userAnswered={ props.userAnswered }
          />
        </Route>
        <Route exact path={ discussRoute }>
          <ResultsDiscussContainer
            staticResults={ staticResults }
            userAnswered={ props.userAnswered }
          />
        </Route>
      </Switch>
  }

  return(
    <>
      <DefaultButtonsContainer
        buttons={ makeResultsNavBarButtons(resultsNavBarIconIndex, onHelp, onPushLink, { stats: statsRoute, discuss: discussRoute }) }
        buttonClass={ 'nav_bar_button' }
        buttonContainerClass={ 'nav_bar_button_container' }
        buttonRow={ true }
        containerClass={ 'nav_bar_container' }
        enableButton={ true }
        tooltipClass={ 'nav_bar_tooltip' }
      />
      <div className='results_wrapper'>
        { routeBoard }
      </div>
    </>
  )
}

const store = (store) => {
  return {
    playGameMode: store.play.gameMode,
    playQuestion: store.play.question,
    playAnswer: store.play.answer,
    playResults: store.play.results,
    playVoteStatus: store.play.voteStatus,
    playCommentStatus: store.play.commentStatus,
    userAnswered: store.play.question ? store.user.questions.ids.includes(store.play.question.id) : store.questions.staticQuestion ? store.user.questions.ids.includes(store.questions.staticQuestion.qid) : 'pending'
  }
}

const dispatch = (dispatch) => {
  return {
    onClearStaticUserQuestion: () => dispatch(clearStaticUserQuestion()),
    onClearStaticQuestion: () => dispatch(clearStaticQuestion()),
    onClearQuestionStatus: () => dispatch(clearQuestionStatus()),
    onClearStaticQuestionVoteStatus: () => dispatch(clearStaticQuestionVoteStatus()),
    onClearStaticUserVote: () => dispatch(clearStaticUserVote()),
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onUpdateGameStatus: (status, loading) => dispatch(updateGameStatus(status, loading)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj)),
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(store, dispatch)(React.memo(ResultsContainer))