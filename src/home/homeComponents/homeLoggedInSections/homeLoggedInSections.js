import React from 'react'
import { connect } from 'react-redux'
import {
  help,
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

const HomeLoggedInSections = (props) => {

  const onHelp = () => {
    props.onSetHelpHeader('Getting Started')
    props.onSetHelpSections(makeHomeHelpSections)
    props.onHelpModal(true)
  }

  const onInitGame = (event) => {
    if(!!props.play.status) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    localStorage.gameMode = buttonParams.mode
    props.history.push(buttonParams.route)
  }

  const onPushLink = (event) => {
    if(!!props.play.status) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  const onClearGame = () => {
    if(!!props.play.gameMode) props.onResetGameMode()
    if(!!props.play.gameState) props.onResetGameState()
    if(!!props.play.gameQset) props.onResetGameQset()
    if(!!props.play.question) props.onResetQuestion()
    if(!!props.play.answer) props.onResetAnswer()
    if(!!props.play.results) props.onResetResults()
    if(!!props.play.voted) props.onResetVote()
    if(!!props.play.commented) props.onResetComment()
  }

  let homeButtons = makeHomeLoggedInButtons(onInitGame, onPushLink, onHelp, routes, props.user.info.user_name)

  let homeButtonSections = homeButtons.map((button, index) => {
    return(
      <React.Fragment key={ index }>
        <div className='home_button_section_container' >
          <div className='home_button_section_wrapper'>
            <div className='home_button_section_left_container'>
              <DefaultButtonsContainer
                buttons={ [ button ] }
                buttonClass={ 'home_logged_in_button' }
                containerClass={ 'home_logged_in_buttons_container' }
                enableButton={ true }
              />
            </div>
            <div className='home_button_section_right_container'>
              <p>{ button.desc }</p>
            </div>
          </div>
        </div>
        <div className='divider_small'></div>
      </React.Fragment>
    )
  })

  return(
    <div className='home_logged_in_button_sections_container'>
      { homeButtonSections }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.play,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedInSections)