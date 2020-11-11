import React from 'react'
import { connect } from 'react-redux'
// import { routes } from '../../../utility/paths'
import {
  resetGameMode,
  resetGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment,
  login,
  signup
} from '../../../store/actions/actionIndex'

import HomeButton from '../../homeComponents/homeButton/homeButton'

import './homeButtonsContainer.css'

const HomeButtonsContainer = (props) => {

  // const onClickFunctions = (event) => {
  //   if(props.play.gameMode) props.onResetGameMode()
  //   if(props.play.gameState) props.onResetGameState()
  //   if(props.play.gameQset) props.onResetGameQset()
  //   if(props.play.question) props.onResetQuestion()
  //   if(props.play.answer) props.onResetAnswer()
  //   if(props.play.results) props.onResetResults()
  //   if(props.play.voted) props.onResetVote()
  //   if(props.play.commented) props.onResetComment()
  // }

  const distribButtons = props.buttons.map((button, index) => {
    return(
      <HomeButton
        classType={ button.classType }
        clickFunction={ button.clickFunction }
        id={ button.id }
        key={ index }
        name={ button.name }
        text={ button.text }
        textContainerClass={ button.textContainerClass }
        wrapperClass={ button.wrapperClass }
      />
    )
  })

  return(
    <div className={ props.containerClass }>
      { distribButtons }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.play
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetGameMode: () => dispatch(resetGameMode()),
    onResetGameState: () => dispatch(resetGameState()),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj)),
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeButtonsContainer)