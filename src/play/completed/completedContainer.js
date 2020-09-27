import React from 'react'
import { connect } from 'react-redux'
import {
  setGameMode,
  setGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults
} from '../../store/actions/actionIndex'

import CompletedButtonsContainer from './completedButtonsContainer/completedButtonsContainer'
import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

import './completedContainer.css'

class CompletedContainer extends React.Component {

  state = {
    showWrapper: false,
    showHeader: false
  }

  componentDidMount(){
    this.completedTimeout = setTimeout(() => { this.setState({ showWrapper: true })}, 100)
    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 2000)
  }

  componentDidUpdate(){

  }

  componentWillUnmount(){
    clearTimeout(this.completedTimeout)
    clearTimeout(this.headerTimeout)
  }

  onClickFunctions = (event) => {
    let gameMode = event.target.name
    localStorage.gameMode = gameMode
    this.props.onSetGameMode(gameMode)
    this.props.onSetGameState('init')
    this.props.onResetGameQset()
    this.props.onResetQuestion()
    this.props.onResetAnswer()
    this.props.onResetResults()
  }

  render(){

    let compeletedWrapper = <LoadingSpinnerRoller />

    if(this.state.showWrapper) compeletedWrapper = <CompletedButtonsContainer onClickFunctions={ this.onClickFunctions } />

    return(
      <>
        { compeletedWrapper }
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
  }
}

export default connect(null, mapDispatchToProps)(CompletedContainer)
