import React from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import {
  help,
  logout,
  setHelpHeader,
  setHelpSections,
  resetGameMode,
  resetGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment
} from '../../../store/actions/actionIndex'
import { routes } from '../../../utility/paths'

import makeHomeHelpSections from '../../homeFunctions/makeHomeHelpSections'
import makeHomeLoggedInButtons from '../../homeFunctions/makeHomeLoggedInButtons'

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeLoggedInSections.css'
import './homeLoggedInSectionsResponse.css'

const HomeLoggedInSections = (props) => {

  let history = useHistory()

  const onHelp = () => {
    props.onSetHelpHeader('Getting Started')
    props.onSetHelpSections(makeHomeHelpSections)
    props.onHelpModal(true)
  }

  const onLogOut = (event) => {
    event.persist()
    props.onLogoutModal(true)
  }

  const onPushLink = (event) => {
    if(!!props.playStatus) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  const onClearGame = () => {
    if(!!props.playGameMode) props.onResetGameMode()
    if(!!props.playState) props.onResetGameState()
    if(!!props.playQset) props.onResetGameQset()
    if(!!props.playQuestion) props.onResetQuestion()
    if(!!props.playAnswer) props.onResetAnswer()
    if(!!props.playResults) props.onResetResults()
    if(!!props.playVote) props.onResetVote()
    if(!!props.playComment) props.onResetComment()
  }

  let homeButtons = makeHomeLoggedInButtons(onPushLink, onHelp, onLogOut, routes, props.userName)

  let homeButtonSections = homeButtons.map((button, index) => {
    return(
      <React.Fragment key={ index }>
        <div className='home_button_section_container' >
          <div className='home_button_section_left_container'>
            <DefaultButtonsContainer
              buttons={ [ button ] }
              buttonClass={ 'home_logged_in_button' }
              buttonContainerClass={ 'home_logged_in_button_container' }
              containerClass={ 'home_logged_in_buttons_container' }
              enableButton={ true }
            />
          </div>
          <div className='home_button_section_right_container'>
            <p>{ button.desc }</p>
          </div>
        </div>
        { index < homeButtons.length - 1 && <div className='divider_small'></div> }
      </React.Fragment>
    )
  })

  return(
    <div className='home_logged_in_button_sections_container'>
      { homeButtonSections }
    </div>
  )
}

const store = (store) => {
  return {
    playStatus: store.play.status,
    playGameMode: store.play.gameMode,
    playState: store.play.gameState,
    playQset: store.play.gameQset,
    playQuestion: store.play.question,
    playAnswer: store.play.answer,
    playResults: store.play.results,
    playVote: store.play.voted,
    playComment: store.play.commented,
    userName: store.user.info ? store.user.info.user_name : null

  }
}

const dispatch = (dispatch) => {
  return {
    onLogoutModal: (bool) => dispatch(logout(bool)),
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections)),
    onResetGameMode: () => dispatch(resetGameMode()),
    onResetGameState: () => dispatch(resetGameState()),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj))
  }
}

export default connect(store, dispatch)(HomeLoggedInSections)