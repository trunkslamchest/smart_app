import React from 'react'
import { useRef, useState } from 'react'
import useOnMount from '../../../utility/hooks/useOnMount'
import { connect } from 'react-redux'

import {
  setVote,
  updateVoteStatus,
} from '../../../store/actions/actionIndex'

import ResultsHeader from '../resultsHeader/resultsHeader'
import ResultsAnswer from '../resultsAnswer/resultsAnswer'
import ResultsStats from './resultsStats'
import ResultsAchievementsContainer from '../resultsAchievements/resultsAchievementsContainer'

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import makeNextQuestionButton from '../resultsFunctions/makeNextQuestionButton'

import './resultsStatsContainer.css'

const ResultsStatsContainer = (props) => {

  const [headerState, setHeaderState] = useState(false)
  const [correctAnswerState, setCorrectAnswerState] = useState(false)
  const [statsState, setStatsState] = useState(false)
  const [achievementsState, setAchievementsState] = useState(false)
  const [showNextQuestionButton, setShowNextQuestionButton] = useState(false)
  const [enableNextQuestionButton, setEnableNextQuestionButton] = useState(false)

  const headerTimerRef = useRef(null)
  const correctAnswerTimerRef = useRef(null)
  const statsTimerRef = useRef(null)
  const achievementsTimerRef = useRef(null)
  const showNextQuestionButtonRef = useRef(null)
  const enableNextQuestionButtonRef = useRef(null)

  useOnMount(() => {
    const startResultsTimers = () => {
      headerTimerRef.current = setTimeout(() => { setHeaderState(true) }, 100)
      if(props.results && props.result === "Incorrect") correctAnswerTimerRef.current = setTimeout(() => { setCorrectAnswerState(true) }, 1000)
      statsTimerRef.current = setTimeout(() => { setStatsState(true) }, 1250)
      achievementsTimerRef.current = setTimeout(() => { setAchievementsState(true) }, 1500)
      showNextQuestionButtonRef.current = setTimeout(() => { setShowNextQuestionButton(true) }, 2500)
      enableNextQuestionButtonRef.current = setTimeout(() => { setEnableNextQuestionButton(true) }, 2750)
    }

    if(!props.staticResults) {
      startResultsTimers()
    } else {
      setHeaderState(true)
      setCorrectAnswerState(props.results && props.result === "Incorrect")
      setStatsState(true)
      setAchievementsState(true)
    }

    return function cleanup() {
      if(!props.staticResults) {
        clearTimeout(showNextQuestionButtonRef.current)
        clearTimeout(enableNextQuestionButtonRef.current)
        clearTimeout(headerTimerRef.current)
        clearTimeout(correctAnswerTimerRef.current)
        clearTimeout(statsTimerRef.current)
        clearTimeout(achievementsTimerRef.current)
      }
    }
  }, [])

  const onClickNextQuestionFunction = (event) => {
    event.persist()
    setEnableNextQuestionButton(false)
    props.onClickNextQuestionFunction(event)
  }

  let nextQuestionButton = makeNextQuestionButton(enableNextQuestionButton, onClickNextQuestionFunction)

  let resultsBlock = <></>

  if(typeof props.userAnswered === 'boolean' && !props.userAnswered)
    resultsBlock = <h6 className='results_not_answered'>You Have Not Answered This Question</h6>
  else
    resultsBlock =
      <div className="results_stats_container">
        <ResultsHeader
          showHeader={ headerState }
          staticResults={ props.staticResults }
        />
        <ResultsAnswer
          showCorrectAnswer={ correctAnswerState }
          staticResults={ props.staticResults }
        />
        { statsState && ( props.userXP || props.results) &&
          <ResultsStats
            showStats={ statsState }
            staticResults={ props.staticResults }
            staticUserAchievements={ props.staticUserAchievements }
          />
        }
        <ResultsAchievementsContainer
          showAchievements={ achievementsState }
          staticResults={ props.staticResults }
        />
        { showNextQuestionButton &&
          <DefaultButtonsContainer
            buttons={ nextQuestionButton }
            containerClass={ 'next_question_buttons_container' }
            enableButton={ enableNextQuestionButton }
          />
        }
      </div>

  return(
    <>
      { !props.staticResults && props.userXP && resultsBlock }
      { props.staticQuestion && resultsBlock }
    </>
  )
}

const store = (store) => {
  return {
    results: !!store.play.results || !!store.questions.staticUserResults,
    result: store.play.results ? store.play.results.result : store.questions.staticUserResults ? store.questions.staticUserResults.result : null,
    staticQuestion: !!store.questions.staticQuestion,
    staticUserAchievements: store.questions.staticUserResults ? !!store.questions.staticUserResults.achievements : false,
    userXP: store.user.experience
  }
}

const dispatch = (dispatch) => {
  return {
    onSetVote: (obj) => dispatch(setVote(obj)),
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading))
  }
}

export default connect(store, dispatch)(React.memo(ResultsStatsContainer))