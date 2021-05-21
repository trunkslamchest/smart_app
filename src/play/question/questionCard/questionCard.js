import React from 'react'
import { useEffect, useRef, useState } from 'react'
import useOnMount from '../../../utility/hooks/useOnMount'

import { connect } from 'react-redux'

import QuestionCardTimer from './questionCardTimer'
import QuestionCardHeader from './questionCardHeader'
import QuestionCardText from './questionCardText'
import QuestionCardChoices from './questionCardChoices'

import './questionCard.css'

const QuestionCard = (props) => {

  const [time, setTime] = useState((10.00).toFixed(2))
  const startTimerRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const outtaTimeTimerRef = useRef(null)

  const { play, onSetAnswer } = props

  useOnMount(() => {
    startTimerRef.current = setTimeout(() => { timerIntervalRef.current = setInterval(() => { setTime(time => (time - 0.01).toFixed(2)) }, 10) }, 5000)

    return function cleanup(){
      clearTimeout(startTimerRef.current)
      clearInterval(timerIntervalRef.current)
      clearTimeout(outtaTimeTimerRef.current)
    }
  }, [time])

  useEffect(() => {
    if (time <= 0 && !play.answer) {
      setTime((0.00).toFixed(2))
      clearTimeout(startTimerRef.current)
      clearInterval(timerIntervalRef.current)
      outtaTimeTimerRef.current = setTimeout(() => { onSetAnswer({ choice: 'outta_time', time: parseFloat((10.00).toFixed(2)) }) }, 500)
    }
  }, [play, time, onSetAnswer])

  return(
    <>
      { props.showTimer &&
        <QuestionCardTimer
            play={ props.answer }
            onSetAnswer={ props.onSetAnswer }
            time={ time }
        />
      }
      { props.showHeader && <QuestionCardHeader category={ props.question.category } /> }
      { props.showQuestion && <QuestionCardText question={ props.question.question } /> }
      { props.showChoices &&
        <QuestionCardChoices
          enableQuestion={ props.enableQuestion }
          choices={ props.question.choices }
          onClickFunction={ props.onClickFunction }
          time={ time }
        />
      }
    </>
  )
}

const store = store => {
  return{
    play: store.play
  }
}

export default connect(store)(QuestionCard)