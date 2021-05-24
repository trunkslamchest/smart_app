import React from 'react'
import { useHistory } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import useOnMount from '../../utility/hooks/useOnMount'
import { connect } from 'react-redux'
import { loading, setAnswer } from '../../store/actions/actionIndex'
import { routes } from '../../utility/paths'

import QuestionCard from './questionCard/questionCard'

import './questionContainer.css'
import './questionResponse.css'

const QuestionContainer = (props) => {

  const history = useHistory()

  const [answerState, setAnswerState] = useState(false)
  const [timerState, setTimerState] = useState(false)
  const [enableQuestion, setEnableQuestion] = useState(false)
  const [headerState, setHeaderState] = useState(false)
  const [questionState, setQuestionState] = useState(false)
  const [choicesState, setChoicesState] = useState(false)

  const { playAnswer, playGameMode, playGameState, playStatus, onSetAnswer, onLoadingModal } = props

  const gameTimerRef = useRef(null)
  const headerTimerRef = useRef(null)
  const questionTimerRef = useRef(null)
  const choicesTimerRef = useRef(null)
  const enableQuestionTimerRef = useRef(null)

  useOnMount(() => {
    if(!playGameMode || playAnswer) history.push( routes.play )

    if((playStatus === 'setGameModeSuccess') && playGameMode !== 'quick_play') history.push( routes[playGameMode] + '/select' )
    if(playGameState === 'completed') {
      if(playGameMode === 'quick_play') history.push( routes.play + '/completed' )
      else history.push( routes[playGameMode] + '/completed' )
    }

    if(playGameMode === 'quick_play') document.title = 'SmartApp™ | Play | Quick Play | Question'
    if(playGameMode === 'by_diff') document.title = 'SmartApp™ | Play | Difficulty | Question'
    if(playGameMode === 'by_cat') document.title = 'SmartApp™ | Play | Category | Question'

    return function cleanup(){
      clearTimers()
      setAnswerState(false)
    }
  }, [playAnswer, playGameMode, playGameState, playStatus, history, routes])

  useEffect(() => {
    if(playStatus === 'displayQuestion' && !answerState) {
      gameTimerRef.current = setTimeout(() => { setTimerState(true) }, 100)
      headerTimerRef.current = setTimeout(() => { setHeaderState(true) }, 2000)
      questionTimerRef.current = setTimeout(() => { setQuestionState(true) }, 3000)
      choicesTimerRef.current = setTimeout(() => { setChoicesState(true) }, 4000)
      enableQuestionTimerRef.current = setTimeout(() => { setEnableQuestion(true) }, 5000)
    }
  }, [playStatus, answerState, onSetAnswer])

  const onClickFunction = useCallback((event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    setEnableQuestion(false)
    setAnswerState(true)
    onLoadingModal(true)
    onSetAnswer({ choice: buttonParams.choice, time: parseFloat((10 - buttonParams.time).toFixed(2)) })
  }, [onLoadingModal, onSetAnswer])

  const clearTimers = () => {
    clearTimeout(gameTimerRef.current)
    clearTimeout(headerTimerRef.current)
    clearTimeout(questionTimerRef.current)
    clearTimeout(choicesTimerRef.current)
    clearTimeout(enableQuestionTimerRef.current)
  }

  return(
    !answerState && props.playQuestion &&
    <div className='question_wrapper'>
      <QuestionCard
        answer={ props.playAnswer }
        enableQuestion={ enableQuestion }
        onClickFunction={ onClickFunction }
        onSetAnswer={ props.onSetAnswer }
        question={ props.playQuestion }
        showTimer={ timerState }
        showHeader={ headerState }
        showQuestion={ questionState }
        showChoices={ choicesState }
      />
    </div>
  )
}

const store = (store) => {
  return {
    play: store.play,
    playAnswer: store.play.answer,
    playGameMode: store.play.gameMode,
    playGameState: store.play.gameState,
    playQuestion: store.play.question,
    playStatus: store.play.status
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetAnswer: (obj) => dispatch(setAnswer(obj)),
  }
}

export default connect(store, dispatch)(React.memo(QuestionContainer))