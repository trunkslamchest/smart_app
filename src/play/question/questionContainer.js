import React from 'react'
import { connect } from 'react-redux'
import { loading, setAnswer } from '../../store/actions/actionIndex'

import QuestionCard from './questionCard/questionCard'

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

  onClickFunction = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    clearInterval(this.timerInterval)
    this.props.onLoadingModal(true)
    this.setState({ enableQuestion: false })
    this.props.onSetAnswer({ choice: buttonParams.choice, time: parseFloat((10 - this.state.time).toFixed(2)) })
  }


  render(){
    return(
      <>
        { this.state.showTimer &&
          <div className='question_wrapper'>
            <QuestionCard
              time={ this.state.time }
              enableQuestion={ this.state.enableQuestion }
              onClickFunction={ this.onClickFunction }
              showTimer={ this.state.showTimer }
              showHeader={ this.state.showHeader }
              showQuestion={ this.state.showQuestion }
              showChoices={ this.state.showChoices }
            />
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    play: state.play
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetAnswer: (obj) => dispatch(setAnswer(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer)