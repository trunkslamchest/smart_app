import React from 'react'
import { useEffect, useRef, useState } from 'react'
import useOnMount from '../../utility/hooks/useOnMount'
import { connect } from 'react-redux'
import { loading, setAnswer } from '../../store/actions/actionIndex'
import { routes } from '../../utility/paths'

import QuestionCard from './questionCard/questionCard'

import './questionContainer.css'

const QuestionContainer = (props) => {

  const [time, setTime] = useState((10.00).toFixed(2))
  const [timerState, setTimerState] = useState(false)
  const [enableQuestion, setEnableQuestion] = useState(false)
  const [headerState, setHeaderState] = useState(false)
  const [questionState, setQuestionState] = useState(false)
  const [choicesState, setChoicesState] = useState(false)

  const { play, history, onSetAnswer } = props

  const gameTimerRef = useRef(null)
  const startTimerRef = useRef(null)
  const headerTimerRef = useRef(null)
  const questionTimerRef = useRef(null)
  const choicesTimerRef = useRef(null)
  const enableQuestionTimerRef = useRef(null)
  const outtaTimeTimerRef = useRef(null)
  const timerIntervalRef = useRef(null)

  useOnMount(() => {
    if(!play.gameMode || play.answer) history.push( routes.play )

    if((play.status === 'setGameModeSuccess') && play.gameMode !== 'quick_play') history.push( routes[play.gameMode] + '/select' )
    if(play.gameState === 'completed') {
      if(play.gameMode === 'quick_play') history.push( routes.play + '/completed' )
      else history.push( routes[play.gameMode] + '/completed' )
    }

    if(play.gameMode === 'quick_play') document.title = 'SmartApp™ | Play | Quick Play | Question'
    if(play.gameMode === 'by_diff') document.title = 'SmartApp™ | Play | Difficulty | Question'
    if(play.gameMode === 'by_cat') document.title = 'SmartApp™ | Play | Category | Question'

    gameTimerRef.current = setTimeout(() => { setTimerState(true) }, 100)
    headerTimerRef.current = setTimeout(() => { setHeaderState(true) }, 2000)
    questionTimerRef.current = setTimeout(() => { setQuestionState(true) }, 3000)
    choicesTimerRef.current = setTimeout(() => { setChoicesState(true) }, 4000)
    enableQuestionTimerRef.current = setTimeout(() => { setEnableQuestion(true) }, 5000)
    startTimerRef.current = setTimeout(() => { timerIntervalRef.current = setInterval(() => { setTime(time => (time - 0.01).toFixed(2)) }, 10) }, 5000)

    return function cleanup(){
      clearTimers()
      clearTimeout(outtaTimeTimerRef.current)
    }
  }, [play, history, routes])

  useEffect(() => {
    if (time <= 0) {
      setTime((0.00).toFixed(2))
      clearTimers()
      outtaTimeTimerRef.current = setTimeout(() => { onSetAnswer({ choice: 'outta_time', time: parseFloat((10.00).toFixed(2)) }) }, 500)
    }
  }, [time, onSetAnswer])

  const onClickFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    setEnableQuestion(false)
    setTimerState(false)
    props.onLoadingModal(true)
    props.onSetAnswer({ choice: buttonParams.choice, time: parseFloat((10 - time).toFixed(2)) })
  }

  const clearTimers = () => {
    clearTimeout(gameTimerRef.current)
    clearTimeout(headerTimerRef.current)
    clearTimeout(questionTimerRef.current)
    clearTimeout(choicesTimerRef.current)
    clearTimeout(enableQuestionTimerRef.current)
    clearTimeout(startTimerRef.current)
    clearInterval(timerIntervalRef.current)
  }

  return(
    <>
      { timerState && props.play.question &&
        <div className='question_wrapper'>
          <QuestionCard
            time={ time }
            enableQuestion={ enableQuestion }
            onClickFunction={ onClickFunction }
            showTimer={ timerState }
            showHeader={ headerState }
            showQuestion={ questionState }
            showChoices={ choicesState }
          />
        </div>
      }
    </>
  )
}

const store = (store) => {
  return {
    modal: store.modal,
    play: store.play
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetAnswer: (obj) => dispatch(setAnswer(obj)),
  }
}

export default connect(store, dispatch)(QuestionContainer)