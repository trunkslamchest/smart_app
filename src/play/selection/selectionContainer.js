import React from 'react'
import { useEffect }  from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { loading, setGameMode, setGameQset } from '../../store/actions/actionIndex'
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
import './selectionResponse.css'

const SelectionContainer = (props) => {

  const history = useHistory()
  const location= useLocation()

  useEffect(() => {
    if(props.authStatus === 'authValid') {
      if(history.location.pathname === routes.play) {
        if(props.playGameMode) props.reSelectGameMode()
      }

      if(history.location.pathname === routes.by_diff_select) {
        if(props.playGameMode !== 'by_diff') props.setGameMode('by_diff')
        if(props.playGameState !== 'select') props.setGameState('select')
        if(props.playGameQset) props.resetGameQset()
        if(props.playQuestion) props.resetQuestion()
      }

      if(history.location.pathname === routes.by_cat_select) {
        if(props.playGameMode !== 'by_cat') props.setGameMode('by_cat')
        if(props.playGameState !== 'select') props.setGameState('select')
        if(props.playGameQset) props.resetGameQset()
        if(props.playQuestion) props.resetQuestion()
      }
    }
  }, [history, props])

  const onClickGameModeFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    localStorage.gameMode = buttonParams.gameMode
    props.onSetGameMode(buttonParams.gameMode)
    history.push( buttonParams.route )
  }

  const onClickQsetFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.onSetGameQset(buttonParams.qSet)
    history.push( buttonParams.route )
  }

  let selectionButtons = makeSelectionButtons(gameModes, routes, onClickGameModeFunction)
  let difficultyButtons = makeDifficultyButtons(difficulties, routes, onClickQsetFunction)
  let categoryButtons = makeCategoryButtons(categories, routes, onClickQsetFunction)

  let headerText
  let buttonGroup

  if(location.pathname === routes.play) {
    document.title = "SmartApp™ | Play | Select"
    headerText = 'Game Mode'
    buttonGroup = selectionButtons
  }

  if(location.pathname === routes.by_diff_select) {
    document.title = "SmartApp™ | Play | Difficulty | Select"
    headerText = 'Difficulty'
    buttonGroup = difficultyButtons
  }

  if(location.pathname === routes.by_cat_select) {
    document.title = "SmartApp™ | Play | Category | Select"
    headerText = 'Category'
    buttonGroup = categoryButtons
  }

  return(
    !props.showModal &&
      <div className='selection_wrapper'>
        <PlayHeaderCentered header_text={ `Select A ${ headerText }` } />
        <DefaultButtonsContainer
          buttons={ buttonGroup }
          buttonClass={ 'game_modes_button' }
          buttonContainerClass={ 'game_modes_button_container' }
          containerClass={ 'game_modes_buttons_container' }
          enableButton={ true }
          tooltipClass={ 'game_modes_button_tooltip' }
        />
      </div>
  )
}

const store = (store) => {
  return {
    authStatus: store.auth.status,
    showModal: store.modal.showModal,
    playGameMode: store.play.gameMode,
    playGameState: store.play.gameState,
    playGameQset: store.play.gameQset,
    playQuestion: store.play.question
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameQset: (set) => dispatch(setGameQset(set))
  }
}

export default connect(store, dispatch)(SelectionContainer)