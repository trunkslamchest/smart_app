import React from 'react'
import { useRef, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
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
import makeNextQuestionButton from './resultsFunctions/makeNextQuestionButton'

import ResultsStatsContainer from './resultsStats/resultsStatsContainer'
import ResultsDiscussContainer from './resultsDiscuss/resultsDiscussContainer'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import resultsNavBarIconIndex from '../../assets/nav_bar_icons/resultsNavBarIconIndex'

import './resultsContainer.css'
import './resultsResponse.css'

const ResultsContainer = (props) => {

  const history = useHistory()

  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false)
  const [enableNextQuestionButton, setEnableNextQuestionButton] = useState(false)

  const showNextQuestionButtonRef = useRef(null)
  const enableNextQuestionButtonRef = useRef(null)

  const { staticResults, play, onClearStaticQuestion, onClearStaticUserQuestion, onClearQuestionStatus, onClearStaticQuestionVoteStatus, onClearStaticUserVote } = props

  useOnMount(() => {
    const startResultsTimers = () => {
      showNextQuestionButtonRef.current = setTimeout(() => { setShowNextQuestionButton(true) }, 2500)
      enableNextQuestionButtonRef.current = setTimeout(() => { setEnableNextQuestionButton(true) }, 2750)
    }

    if(!staticResults) {
      document.title = `SmartApp™ | Play | ${ play.gameMode } | Results`
      startResultsTimers()
    }

    if(!play.question && !staticResults) history.push( routes.play )

    return function cleanup(){
      clearTimeout(showNextQuestionButtonRef.current)
      clearTimeout(enableNextQuestionButtonRef.current)
      onClearStaticQuestion()
      onClearStaticUserQuestion()
      onClearQuestionStatus()
      onClearStaticQuestionVoteStatus()
      onClearStaticUserVote()
    }
  }, [staticResults, play, history, routes, onClearStaticQuestion, onClearStaticUserQuestion, onClearQuestionStatus, onClearStaticQuestionVoteStatus, onClearStaticUserVote])

  const onDisableNextQuestionButton = () => { setEnableNextQuestionButton(false) }

  const onClickNextQuestionFunction = () => {
    props.onSetGameState('reInit')
    props.onUpdateGameStatus('reInitGame', true)
    props.onLoadingModal(true)
    onDisableNextQuestionButton()
    if(play.question) props.onResetQuestion()
    if(play.answer) props.onResetAnswer()
    if(play.results) props.onResetResults()
    if(play.voteStatus) props.onResetVote()
    if(play.commentStatus) props.onResetComment()
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

  const baseStaticRoute = routes.static_results + '/' + props.diff + '/' + props.cat + '/' + props.qid

  let routeBoard
  let statsRoute = staticResults ? baseStaticRoute + '/stats' : routes[play.gameMode] + '/results/stats'
  let discussRoute = staticResults ? baseStaticRoute + '/discuss' : routes[play.gameMode] + '/results/discuss'
  let navBarButtons = makeResultsNavBarButtons(resultsNavBarIconIndex, onHelp, onPushLink, { stats: statsRoute, discuss: discussRoute })
  let nextQuestionButton = makeNextQuestionButton(enableNextQuestionButton, onClickNextQuestionFunction)

  if(staticResults){
    routeBoard =
      <Switch>
        <Route exact path={ baseStaticRoute + '/stats' }>
          <ResultsStatsContainer staticResults={ staticResults } />
        </Route>
        <Route exact path={ baseStaticRoute + '/discuss' }>
          <ResultsDiscussContainer
            cat={ props.cat }
            diff={ props.diff }
            qid={ props.qid }
            staticResults={ staticResults }
          />
        </Route>
      </Switch>
  } else {
    routeBoard =
      <Switch>
        <Route exact path={ routes[play.gameMode] + '/results/stats' }>
          <ResultsStatsContainer staticResults={ staticResults } />
          { showNextQuestionButton &&
            <DefaultButtonsContainer
              buttons={ nextQuestionButton }
              containerClass={ 'next_question_buttons_container' }
              enableButton={ enableNextQuestionButton }
            />
          }
        </Route>
        <Route exact path={ routes[play.gameMode] + '/results/discuss' }>
          <ResultsDiscussContainer staticResults={ staticResults } />
        </Route>
      </Switch>
  }

  return(
    <>
      <DefaultButtonsContainer
        buttons={ navBarButtons }
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
    play: store.play,
    user: store.user,
    questions: store.questions
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