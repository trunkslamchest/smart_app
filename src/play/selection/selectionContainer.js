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

  const {
    authStatus,
    playGameMode,
    playGameState,
    playGameQset,
    playQuestion,
    reSelectGameMode,
    resetGameQset,
    resetQuestion,
    setGameMode,
    setGameState
  } = props

  useEffect(() => {
    if(authStatus === 'authValid') {
      if(history.location.pathname === routes.play) {
        if(playGameMode) reSelectGameMode()
      }

      if(history.location.pathname === routes.by_cat_select) {
        if(playGameMode !== 'by_cat') setGameMode('by_cat')
        if(playGameState !== 'select') setGameState('select')
        if(playGameQset) resetGameQset()
        if(playQuestion) resetQuestion()
      }

      if(history.location.pathname === routes.by_diff_select) {
        if(playGameMode !== 'by_diff') setGameMode('by_diff')
        if(playGameState !== 'select') setGameState('select')
        if(playGameQset) resetGameQset()
        if(playQuestion) resetQuestion()
      }

    }
  }, [
    authStatus,
    history,
    playGameMode,
    playGameState,
    playGameQset,
    playQuestion,
    reSelectGameMode,
    resetGameQset,
    resetQuestion,
    setGameMode,
    setGameState
  ])

  const onClickFunctions = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    if(!!buttonParams.qSet) props.onSetGameQset(buttonParams.qSet)
    if(!!buttonParams.gameMode) {
      localStorage.gameMode = buttonParams.gameMode
      props.onSetGameMode(buttonParams.gameMode)
    }
    history.push( buttonParams.route )
  }

  let selectionButtons = makeSelectionButtons(gameModes, routes, onClickFunctions)
  let categoryButtons = makeCategoryButtons(categories, routes, onClickFunctions)
  let difficultyButtons = makeDifficultyButtons(difficulties, routes, onClickFunctions)

  let headerText
  let buttonGroup

  if(location.pathname === routes.play) {
    document.title = "SmartApp™ | Play | Select"
    headerText = 'Game Mode'
    buttonGroup = selectionButtons
  }

  if(location.pathname === routes.by_cat_select) {
    document.title = "SmartApp™ | Play | Category | Select"
    headerText = 'Category'
    buttonGroup = categoryButtons
  }

  if(location.pathname === routes.by_diff_select) {
    document.title = "SmartApp™ | Play | Difficulty | Select"
    headerText = 'Difficulty'
    buttonGroup = difficultyButtons
  }

  return(
    !props.modalLoading &&
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
    modalLoading: store.modal.loading && store.modal.showModal,
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