import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    showHeader: false,
    showCorrectAnswer: false,
    showDifficulty: false,
    showVoteButtons: false,
    showCommentButton: false,
    showCommentText:false,
    showAllComments:false,
    showAnsweredButton: false,
    enableCommentButton: false,
    enableAnsweredButton: false
  }

  componentDidMount(){
    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 1000)
    this.difficultyTimeout = setTimeout(() => { this.setState({ showDifficulty: true })}, 2000)
    this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 2500)
    this.commentButtonTimeout = setTimeout(() => { this.setState({ showCommentButton: true })}, 3000)
    this.answeredButtonsTimeout = setTimeout(() => { this.setState({ showAnsweredButton: true })}, 3500)

    this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 3750)
    this.enableAnsweredButtonTimeout = setTimeout(() => { this.setState({ enableAnsweredButton: true })}, 4250)

    if(this.props.play.results.result === "Incorrect") {
      this.correctAnswerTimeout = setTimeout(() => { this.setState({ showCorrectAnswer: true })}, 1500)
    }
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.correctAnswerTimeout)
    clearTimeout(this.difficultyTimeout)
    clearTimeout(this.voteButtonsTimeout)
    clearTimeout(this.commentButtonTimeout)
    clearTimeout(this.answeredButtonsTimeout)
    clearTimeout(this.enableCommentTimeout)
    clearTimeout(this.enableAnsweredTimeout)
  }

  render(){

    const blank = <></>

    // const answered_header = <h3> { this.state.time === 0 ? this.outtaTime() : this.state.user_result } </h3>
    const header = <h3> { this.props.play.results.result } </h3>

    const correct_answer_text =
      <>
        <h3>The correct answer was</h3>
        <h4>{ this.props.play.results.correct_answer }</h4>
      </>

    const difficulty_text =
      <>
        <h3>Question Difficulty</h3>
        <h4>{ this.props.play.question.difficulty }</h4>
      </>

    const correct_answer = <>{ this.state.showCorrectAnswer ? correct_answer_text : blank }</>

    const answer = <>{ this.props.play.results.result === 'Incorrect' ? correct_answer : blank }</>

    const difficulty = <>{ this.state.showDifficulty ? difficulty_text : blank }</>


    return(
      <div className="question_card">
        <div className={ this.state.showHeader ? "question_card_answer_header" : "blank" }>
          { this.state.showHeader ? header : blank }
        </div>
        <div className={ this.state.showCorrectAnswer ? "question_card_correct_answer" : "blank" }>
          { this.state.showCorrectAnswer ? answer : blank }
        </div>
        <div className={ this.state.showDifficulty ? "question_card_difficulty" : "blank" }>
          { this.state.showDifficulty ? difficulty : blank }
        </div>
      </div>
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
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onSetGameState : (state) => dispatch(actions.setGameState(state)),
    onResetGameState : () => dispatch(actions.resetGameState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)