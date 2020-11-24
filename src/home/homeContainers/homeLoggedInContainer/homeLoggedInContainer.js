import React from 'react'
import { connect } from 'react-redux'
import {
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

import makeHomeLoggedInButtons from '../../homeFunctions/makeHomeLoggedInButtons'

import HomeLogoContainer from '../homeLogoContainer/homeLogoContainer'
import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './homeLoggedInContainer.css'

const HomeLoggedInContainer = (props) => {

  const onStartGame = () => {
    if(props.play.gameMode) props.onResetGameMode()
    if(props.play.gameState) props.onResetGameState()
    if(props.play.gameQset) props.onResetGameQset()
    if(props.play.question) props.onResetQuestion()
    if(props.play.answer) props.onResetAnswer()
    if(props.play.results) props.onResetResults()
    if(props.play.voted) props.onResetVote()
    if(props.play.commented) props.onResetComment()
    props.history.push(routes.play)
  }

  let homeButtons = makeHomeLoggedInButtons(onStartGame)


  return(
    <div className='home_logged_in_wrapper'>
      <div className='home_logged_in_top_container'>

        <HomeLogoContainer />
        <div className='home_logged_in_top_right_container'>

        <DefaultButtonsContainer
          buttons={ homeButtons }
          buttonClass={ 'home_start_button' }
          containerClass={ 'home_buttons_container' }
          enableButton={ true }
          // tooltipClass={  }
        />
      </div>
    </div>
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
    onResetComment: (obj) => dispatch(resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedInContainer)