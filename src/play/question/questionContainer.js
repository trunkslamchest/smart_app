import React from 'react'
import { useEffect, useRef, useState, useCallback } from 'react'
import useOnMount from '../../utility/hooks/useOnMount'
import { connect } from 'react-redux'
import { loading, setAnswer } from '../../store/actions/actionIndex'
import { routes } from '../../utility/paths'

import QuestionCard from './questionCard/questionCard'

import './questionContainer.css'
import './questionResponse.css'

const QuestionContainer = (props) => {

  const [timerState, setTimerState] = useState(false)
  const [enableQuestion, setEnableQuestion] = useState(false)
  const [headerState, setHeaderState] = useState(false)
  const [questionState, setQuestionState] = useState(false)
  const [choicesState, setChoicesState] = useState(false)

  const { play, history, onSetAnswer, onLoadingModal } = props

  const gameTimerRef = useRef(null)
  const headerTimerRef = useRef(null)
  const questionTimerRef = useRef(null)
  const choicesTimerRef = useRef(null)
  const enableQuestionTimerRef = useRef(null)

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

    return function cleanup(){
      clearTimers()
    }
  }, [play, history, routes])

  useEffect(() => {
    if(play.status === 'displayQuestion' && !timerState) {
      gameTimerRef.current = setTimeout(() => { setTimerState(true) }, 100)
      headerTimerRef.current = setTimeout(() => { setHeaderState(true) }, 2000)
      questionTimerRef.current = setTimeout(() => { setQuestionState(true) }, 3000)
      choicesTimerRef.current = setTimeout(() => { setChoicesState(true) }, 4000)
      enableQuestionTimerRef.current = setTimeout(() => { setEnableQuestion(true) }, 5000)
    }
  }, [play, timerState, onSetAnswer])

  const onClickFunction = useCallback((event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    setEnableQuestion(false)
    setTimerState(false)
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
    timerState && props.play.question &&
    <div className='question_wrapper'>
      <QuestionCard
        answer={ props.play.answer }
        enableQuestion={ enableQuestion }
        onClickFunction={ onClickFunction }
        onSetAnswer={ props.onSetAnswer }
        question={ props.play.question }
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
    play: store.play
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetAnswer: (obj) => dispatch(setAnswer(obj)),
  }
}

export default connect(store, dispatch)(React.memo(QuestionContainer))