import React from 'react'

import { connect } from 'react-redux'

import './QuestionDisplay.css'

class QuestionDisplay extends React.Component{

  state = {
    time: (10.00).toFixed(2),
    stopTime: false,
    setTime: false,
    showTimer: false,
    startTimer: false,
    enableQuestion: false,
    showHeader: false,
    showQuestion: false,
    showChoices: false
  }

  componentDidMount(){
    this.timerTimeout = setTimeout(() => { this.setState({ showTimer: true })}, 100)
    this.startTimer = setTimeout(() => { this.timerInterval = setInterval(this.timerFunctions, 10)}, 5000)
    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 2000)
    this.questionTimeout = setTimeout(() => { this.setState({ showQuestion: true })}, 3000)
    this.choicesTimeout = setTimeout(() => { this.setState({ showChoices: true })}, 4000)
    this.enableQuestionTimeout = setTimeout(() => { this.setState({ enableQuestion: true })}, 5000)
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.questionTimeout)
    clearTimeout(this.choicesTimeout)
    clearTimeout(this.timerTimeout)
    clearInterval(this.startTimer)
  }

  stopTime = (time) => {
    this.setState({
      time: time,
      stopTime: true
    })
  }

  setTime = (time) => { this.setState({ time: time }) }

  timerFunctions = () => {
    if (this.state.stopTime){
      this.setState({
        time: this.state.time
      }, this.setTime(this.state.time))
      clearInterval(this.timerInterval)
    }

    if (this.state.time <= 0) {
      this.setState({
        time: (0).toFixed(2)
      }, clearInterval(this.timerInterval))
    } else {
      this.setState({
        time: (this.state.time - 0.01).toFixed(2),
      })
    }
  }

  render(){

    const blank = <></>

    const time = this.state.time
    const category = this.props.play.question.category
    const question = this.props.play.question.question
    const choices = this.props.play.question.choices.map(choice => {
        let i = this.props.play.question.choices.indexOf(choice)
        return <button
          key={`answer_button_${i}`}
          value={ i }
          className={this.state.enableQuestion ? "question_card_choices_button" : "question_card_choices_button_disabled" }
          name="answer_button"
          // onClick={ this.state.enableQuestion ? this.onClickFunctions : this.onClickBlankFunctions }
        >
          { choice }
        </button>
    })

    return(
      <>
      <div className="question_card">
        <div className={ this.state.showTimer ? "question_card_timer" : "blank" } >
          <h2>Time Left</h2>
          <h1>{ this.state.showTimer ? time : blank }</h1>
          <div className={ this.state.showHeader ? "question_card_header" : "blank" }>
            In { this.state.showHeader ? category : blank }...
          </div>
          <div className={ this.state.showQuestion ? "question_card_text" : "blank" }>
            { this.state.showQuestion ? question : blank }
          </div>
          <div className={ this.state.showChoices ? "question_card_choices" : "blank" }>
            { this.state.showChoices ?
              <>
                <div className='div1'>
                  { choices[0] }
                  { choices[1] }
                </div>
                <div className='div2'>
                  { choices[2] }
                  { choices[3] }
                </div>
              </>
            :
              blank
            }
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps)(QuestionDisplay)