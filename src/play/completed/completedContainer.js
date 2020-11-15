import React from 'react'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import {
  setGameMode,
  setGameState,
  resetGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults
} from '../../store/actions/actionIndex'

import ContainerHeaderCentered from '../../UI/components/headers/containerHeaderCentered/containerHeaderCentered'
import ContainerSubHeaderCentered from '../../UI/components/subHeaders/containerSubHeaderCentered/containerSubHeaderCentered'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

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

  componentDidUpdate(){ }

  componentWillUnmount(){
    clearTimeout(this.completedTimeout)
    clearTimeout(this.headerTimeout)
  }

  onClickFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    let gameMode = buttonParams.mode
    localStorage.gameMode = gameMode
    this.props.onSetGameMode(gameMode)
    this.props.onSetGameState('select')
    this.props.onResetGameQset()
    this.props.onResetQuestion()
    this.props.onResetAnswer()
    this.props.onResetResults()
    this.props.history.push(buttonParams.route)
  }

  render(){

    let compeletedWrapper = <LoadingSpinnerRoller />

    const completedButtons = [
      {
        buttonClass: 'completed_button',
        id: 'qp_completed_button',
        name: 'qpCompletedButton',
        onClickFunction: this.onClickFunction,
        params: JSON.stringify({ route: routes.quick_play, mode: 'quick_play' }),
        text: 'Quick Play',
        tooltipText: [ 'Good Job!' ],
        tooltipClass: 'completed_button_tooltip'
      },
      {
        buttonClass: 'completed_button',
        id: 'diff_completed_button',
        name: 'diffCompletedButton',
        onClickFunction: this.onClickFunction,
        params: JSON.stringify({ route: routes.by_diff_select, mode: 'by_diff' }),
        text: 'Choose A New Difficulty',
        tooltipText: [ 'Great Job!' ],
        tooltipClass: 'completed_button_tooltip'
      },
      {
        buttonClass: 'completed_button',
        id: 'cat_completed_button',
        name: 'catCompletedButton',
        onClickFunction: this.onClickFunction,
        params: JSON.stringify({ route: routes.by_cat_select, mode: 'by_cat' }),
        text: 'Choose A New Category',
        tooltipText: [ 'Amazing Job!' ],
        tooltipClass: 'completed_button_tooltip'
      }
    ]

    if(this.state.showWrapper) {
      compeletedWrapper =
      <div className='completed_wrapper'>
        <ContainerHeaderCentered header_text={ this.props.play.question.msg1 } />
        <ContainerSubHeaderCentered header_text={ this.props.play.question.msg2 } />
        <DefaultButtonsContainer
          buttons={ completedButtons }
          containerClass={ 'completed_buttons_container' }
          enableButton={ true }
        />
      </div>
    }

    return(<>{ compeletedWrapper }</>)
  }
}

const mapStateToProps = state => {
  return {
    play: state.play
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetGameState: () => dispatch(resetGameState()),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedContainer)
