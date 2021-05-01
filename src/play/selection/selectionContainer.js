import React from 'react'
// import { useEffect }  from 'react'
// import useOnMount from '../../utility/hooks/useOnMount'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setGameMode, setGameQset } from '../../store/actions/actionIndex'
import { routes } from '../../utility/paths'

import gameModes from '../../datasets/gameModes'
import difficulties from '../../datasets/difficulties'
import categories from '../../datasets/categories'

import makeSelectionButtons from '../playFunctions/makeSelectionButtons'
import makeDifficultyButtons from '../playFunctions/makeDifficultyButtons'
import makeCategoryButtons from '../playFunctions/makeCategoryButtons'

import PlayHeaderCentered from '../playComponents/playHeaderCentered/playHeaderCentered'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './selectionContainer.css'

const SelectionContainer = (props) => {

  const location = useLocation()

  // useEffect(() => {
  //   // console.log(location.pathname)
  //   // if(!!localStorage.gameMode && )
  // }, [location])

  // useOnMount(function() {

  //   // console.log(localStorage.gameMode, props.play.gameMode)


  //   return function cleanup(){}
  // }, [])

  const onClickGameModeFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    localStorage.gameMode = buttonParams.gameMode
    props.onSetGameMode(buttonParams.gameMode)
    props.history.push( buttonParams.route )
  }

  const onClickQsetFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.onSetGameQset(buttonParams.qSet)
    props.history.push( buttonParams.route )
  }

  let selectionButtons = makeSelectionButtons(gameModes, routes, onClickGameModeFunction)
  let difficultyButtons = makeDifficultyButtons(difficulties, routes, onClickQsetFunction)
  let categoryButtons = makeCategoryButtons(categories, routes, onClickQsetFunction)

  let headerText
  let buttonGroup

  if(location.pathname === routes.play) {
    if(props.play.gameMode) props.reSelectGameMode()

    document.title = "SmartApp™ | Play | Select"
    headerText = 'Game Mode'
    buttonGroup = selectionButtons
  }

  if(location.pathname === routes.by_diff_select) {
    if(!props.play.gameMode) {
      props.setGameMode('by_diff')
      props.setGameState('select')
    }
    if(props.play.gameState !== 'select')  props.setGameState('select')
    if(props.play.status !== 'setGameModeSuccess') props.updateGameStatus('setGameModeSuccess', false)

    if(props.play.question) props.resetQuestion()
    if(props.play.gameQset) props.resetGameQset()

    document.title = "SmartApp™ | Play | Difficulty | Select"
    headerText = 'Difficulty'
    buttonGroup = difficultyButtons
  }

  if(location.pathname === routes.by_cat_select) {
    if(!props.play.gameMode) {
      props.setGameMode('by_cat')
      props.setGameState('select')
    }

    if(props.play.gameState !== 'select')  props.setGameState('select')
    if(props.play.status !== 'setGameModeSuccess') props.updateGameStatus('setGameModeSuccess', false)

    if(props.play.question) props.resetQuestion()
    if(props.play.gameQset) props.resetGameQset()

    document.title = "SmartApp™ | Play | Category | Select"
    headerText = 'Category'
    buttonGroup = categoryButtons
  }

  return(
    <>
      { !props.modal.loading &&
        <div className='selection_wrapper'>
          <PlayHeaderCentered header_text={ `Select A ${headerText}` } />
          <DefaultButtonsContainer
            buttons={ buttonGroup }
            buttonClass={ 'game_modes_button' }
            buttonContainerClass={ 'game_modes_button_container' }
            containerClass={ 'game_modes_buttons_container' }
            enableButton={ true }
            tooltipClass={ 'game_modes_button_tooltip' }
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
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameQset: (set) => dispatch(setGameQset(set))
  }
}

export default connect(store, dispatch)(SelectionContainer)