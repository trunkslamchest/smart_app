import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import QuestionCard from './questionCard/questionCard'
import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

import './questionContainer.css'

class QuestionContainer extends React.Component{

  state = {
    time: (10.00).toFixed(2),
    showTimer: false,
    startTimer: false,
    enableQuestion: false,
    showHeader: false,
    showQuestion: false,
    showChoices: false
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'quick_play') document.title = 'SmartApp™ | Play | Quick Play | Question'
    if(this.props.play.gameMode === 'by_diff') document.title = 'SmartApp™ | Play | Difficulty | Question'
    if(this.props.play.gameMode === 'by_cat') document.title = 'SmartApp™ | Play | Category | Question'

    this.timerTimeout = setTimeout(() => { this.setState({ showTimer: true })}, 100)
    this.startTimer = setTimeout(() => { this.timerInterval = setInterval(this.timerFunctions, 10)}, 5000)
    this.questionTimeout = setTimeout(() => { this.setState({ showQuestion: true })}, 3000)
    this.choicesTimeout = setTimeout(() => { this.setState({ showChoices: true })}, 4000)
    this.enableQuestionTimeout = setTimeout(() => { this.setState({ enableQuestion: true })}, 5000)
    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 2000)
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.questionTimeout)
    clearTimeout(this.choicesTimeout)
    clearTimeout(this.timerTimeout)
    clearTimeout(this.enableQuestionTimeout)
    clearTimeout(this.outtaTimeTimeout)
    clearTimeout(this.completedTimeout)
    clearInterval(this.timerInterval)
    clearInterval(this.startTimer)
  }

  timerFunctions = () => {
    if (this.state.time <= 0) {
      this.setState({ time: (0.00).toFixed(2)})
      clearInterval(this.timerInterval)
      this.outtaTimeTimeout = setTimeout(() => { this.props.onSetAnswer({ choice: 'outta_time', time: parseFloat((10.00).toFixed(2)) }) }, 500)
    }
    // } else this.setState({ time: (this.state.time - 0.01).toFixed(2) })
  }

  onClickFunctions = (event) => {
    clearInterval(this.timerInterval)
    this.props.onSetAnswer({ choice: this.props.play.question.choices[event.target.value], time: parseFloat((10 - this.state.time).toFixed(2)) })
  }

  render(){

    let questionWrapper = <LoadingSpinnerRoller />

    if(this.state.showTimer){
      questionWrapper = <QuestionCard
        time={ this.state.time }
        enableQuestion={ this.state.enableQuestion }
        onClickFunctions={ this.onClickFunctions }
        showTimer={ this.state.showTimer }
        showHeader={ this.state.showHeader }
        showQuestion={ this.state.showQuestion }
        showChoices={ this.state.showChoices }
      />
    }

    return(
      <>
        { questionWrapper }
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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)