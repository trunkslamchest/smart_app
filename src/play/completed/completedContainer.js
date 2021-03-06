import React from 'react'
import { useHistory } from 'react-router-dom'
import { useState, useRef } from 'react'
import useOnMount from '../../utility/hooks/useOnMount'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import {
  setGameMode,
  setGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults
} from '../../store/actions/actionIndex'

import makeCompletedButtons from '../playFunctions/makeCompletedButtons'

import PlayHeaderCentered from '../playComponents/playHeaderCentered/playHeaderCentered'
import PlaySubHeaderCentered from '../playComponents/playSubHeaderCentered/playSubHeaderCentered'

import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

import './completedContainer.css'

const CompletedContainer = (props) => {

  const history = useHistory()

  const [wrapperState, setWrapperState] = useState(false)

  const { playGameMode } = props

  const wrapperTimerRef = useRef(null);

  useOnMount(() => {
    wrapperTimerRef.current = setTimeout(() => { setWrapperState(true) }, 250);
    if(!playGameMode) history.push( routes.play )
    return function cleanup() { if(wrapperTimerRef.current) clearTimeout(wrapperTimerRef.current); }
  }, [playGameMode, history])

  const onClickFunctions = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    let gameMode = buttonParams.mode
    localStorage.gameMode = gameMode
    props.onSetGameMode(gameMode)
    props.onSetGameState('select')
    props.onResetGameQset()
    props.onResetQuestion()
    props.onResetAnswer()
    props.onResetResults()
    history.push(buttonParams.route)
  }

  let compeletedWrapper = <LoadingSpinnerRoller />

  const completedButtons = makeCompletedButtons(onClickFunctions, routes)

  if(wrapperState) {
    compeletedWrapper =
    <div className='completed_wrapper'>
      <PlayHeaderCentered header_text={ props.playQuestionMsg1 } />
      <PlaySubHeaderCentered header_text={ props.playQuestionMsg2 } />
      <DefaultButtonsContainer
        buttons={ completedButtons }
        buttonContainerClass={ 'completed_button_container' }
        containerClass={ 'completed_buttons_container' }
        enableButton={ true }
      />
    </div>
  }

  return compeletedWrapper
}

const store = (store) => {
  return {
    play: store.play,
    playGameMode: store.play.gameMode,
    playQuestionMsg1: store.play.question.msg1,
    playQuestionMsg2: store.play.question.msg2
  }
}

const dispatch = (dispatch) => {
  return {
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
  }
}

export default connect(store, dispatch)(CompletedContainer)
