import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import PlayButton from '../../UI/buttons/playButton/playButton'
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

    let completedSeq =
      <>
        <div className='default_header'>
          <h1>{ this.props.play.question.msg1 }</h1>
          <h2>{ this.props.play.question.msg2 }</h2>
        </div>
        <PlayButton
          link={ routes.by_diff }
          buttonName="by_diff"
          classType="play_by_difficulty_button"
          onClick={ this.onClickFunctions }
        >
          Choose a new Difficulty
        </PlayButton>
        <PlayButton
          link={ routes.by_cat }
          buttonName="by_cat"
          classType="play_by_category_button"
          onClick={ this.onClickFunctions }
        >
          Choose a new Category
        </PlayButton>
      </>

    return(
      <>
        { this.state.showWrapper ? completedSeq : <LoadingSpinnerRoller /> }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    play: state.play,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetGameQset: (set) => dispatch(actions.setGameQset(set)),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedContainer)
