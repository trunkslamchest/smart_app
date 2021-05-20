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

  const { staticResults, play, questions } = props

  useOnMount(() => {
    const startResultsTimers = () => {
      headerTimerRef.current = setTimeout(() => { setHeaderState(true) }, 100)
      if(play.results && play.results.result === "Incorrect") correctAnswerTimerRef.current = setTimeout(() => { setCorrectAnswerState(true) }, 1000)
      statsTimerRef.current = setTimeout(() => { setStatsState(true) }, 1250)
      achievementsTimerRef.current = setTimeout(() => { setAchievementsState(true) }, 1500)
      showNextQuestionButtonRef.current = setTimeout(() => { setShowNextQuestionButton(true) }, 2500)
      enableNextQuestionButtonRef.current = setTimeout(() => { setEnableNextQuestionButton(true) }, 2750)
    }

    if(!staticResults) {
      startResultsTimers()
    } else {
      setHeaderState(true)
      setCorrectAnswerState(questions.staticUserResults && questions.staticUserResults.result === "Incorrect")
      setStatsState(true)
      setAchievementsState(true)
    }

    return function cleanup() {
      if(!staticResults) {
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


  const resultsBlock =
    <div className="results_stats_container">
      <ResultsHeader
        staticResults={ props.staticResults }
        showHeader={ headerState }
      />
      <ResultsAnswer
        staticResults={ props.staticResults }
        showCorrectAnswer={ correctAnswerState }
      />
      { statsState && ( props.user || props.questions.staticUserResults) &&
        <ResultsStats
          staticResults={ props.staticResults }
          showStats={ statsState }
        />
      }
      <ResultsAchievementsContainer
        staticResults={ props.staticResults }
        showAchievements={ achievementsState }
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
      { !props.staticResults && props.user.experience && resultsBlock }
      { props.questions.staticQuestion && props.questions.staticUserResults && resultsBlock }
    </>
  )
}

const store = (store) => {
  return {
    play: store.play,
    user: store.user,
    achievements: store.achievements,
    questions: store.questions
  }
}

const dispatch = (dispatch) => {
  return {
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onSetVote: (obj) => dispatch(setVote(obj)),
  }
}

export default connect(store, dispatch)(React.memo(ResultsStatsContainer))