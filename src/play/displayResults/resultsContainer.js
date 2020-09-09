import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import DisplayComments from './displayComments'

import up_vote from '../../assets/up_vote1.png'
import no_vote from '../../assets/no_vote1.png'
import down_vote from '../../assets/down_vote1.png'

import LoadingSpinnerRoller from '../../UI/loading/spinner/roller'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    comment: '',
    showHeader: false,
    showCorrectAnswer: false,
    showDifficulty: false,
    showVoteButtons: false,
    showCommentButton: false,
    showCommentText:false,
    showAllComments:false,
    showAnsweredButton: false,
    enableCommentButton: false,
    enableAnsweredButton: false,
    voted: false
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

  calcVotes = () => {
    if (this.props.play.question.votes.total === 0) return {
      good: '0%',
      neutral: '0%',
      bad: '0%',
    }
    else return {
      good: `${((this.props.play.question.votes.good / this.props.play.question.votes.total) * 100).toFixed(2)}%`,
      neutral: `${((this.props.play.question.votes.neutral / this.props.play.question.votes.total) * 100).toFixed(2)}%`,
      bad: `${((this.props.play.question.votes.bad / this.props.play.question.votes.total) * 100).toFixed(2)}%`,
    }
  }

  onClickVoteFunctions = (event) => {
    event.persist()

    let voteObj = {
      uid: localStorage.id,
      qid: this.props.play.question.id,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      vote: event.target.attributes.vote.value
    }

    this.props.onSetVote(voteObj)
    this.setState({
      voted: true,
      showVoteButtons: false
    })
  }

  onClickCommentFunctions = () => {
    this.setState({
      showCommentButton: false,
      showCommentText: true,
    })
  }

  onChangeComment = (event) => {
    this.setState({ comment: event.target.value })
  }

  addComment = (event) => {
    event.persist()
    event.preventDefault()

    if (this.state.comment){
      var commentObj = {
        uid: localStorage.id,
        user_name: this.props.user.info.user_name,
        qid: this.props.play.question.id,
        difficulty: this.props.play.question.difficulty,
        category: this.props.play.question.category,
        comment: this.state.comment
      }
      this.props.onSetComment(commentObj)
      this.setState({
        showCommentText: false,
        showAllComments: true,
      })
    } else {
      alert("Please Enter A Comment")
    }
  }

  onClickNextQuestionFunctions = () => {
    this.props.onSetGameState('init')
    this.props.onResetAnswer()
    this.props.onResetResults()
  }


  render(){

    const blank = <></>
    let allComments = <></>

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

    const correct_answer = this.state.showCorrectAnswer ? correct_answer_text : blank
    const answer = this.props.play.results.result === 'Incorrect' ? correct_answer : blank
    const difficulty = this.state.showDifficulty ? difficulty_text : blank

    const voteHeader = <h3>Rate this question</h3>
    const votePercents = this.calcVotes()
    const voteSubHeader =
      <>
        <h3>Rating</h3>
        <h4>Votes: { this.props.play.question.votes.total }</h4>
      </>

    const vote_for_question_buttons = [
      <button
        className="up_vote_button"
        key={"up_vote_button"}
        name="up_vote_button"
        vote="good"
        onClick={ this.onClickVoteFunctions }
      >
        <img
          alt="up_vote"
          name="up_vote_img"
          src={ up_vote }
          vote="good"
        />
      </button>,
      <button
        className="no_vote_button"
        key={"no_vote_button"}
        name="no_vote_button"
        vote="neutral"
        onClick={ this.onClickVoteFunctions }
      >
        <img
          alt="no_vote"
          name="no_vote_img"
          src={ no_vote }
          vote="neutral"
        />
      </button>,
      <button
        className="down_vote_button"
        key={"down_vote_button"}
        name="down_vote_button"
        vote="bad"

        onClick={ this.onClickVoteFunctions }
      >
        <img
          alt="down_vote"
          name="down_vote_img"
          src={ down_vote }
          vote="bad"
        />
      </button>
    ]

    const comment_button =
      <button
        key={"comment_button"}
        name="comment_button"
        value="comment_button"
        className={ this.state.enableCommentButton ? "question_card_comment_button" : "question_card_comment_button_disabled" }
        onClick={ this.state.enableCommentButton ? this.onClickCommentFunctions : this.onClickBlankFunctions }
      >
        Leave a Comment
      </button>

    const comment_form =
      <form
        name="add_comment_form"
        interaction="submit"
        className="question_card_comment_form"
        onSubmit={ this.addComment }
      >
        <textarea
          rows="5"
          id="add_comment"
          name="comment_text"
          placeholder="Add A Comment..."
          onChange={ this.onChangeComment }
          value={ this.state.comment }
        />
        <div className="comment_button_container">
          <input
            type="submit"
            className="question_card_comment_button"
            value="Add Comment"
          />
        </div>
      </form>

    if(this.props.play.question.comments && this.state.showAllComments){
      allComments = Object.entries(this.props.play.question.comments).map(comment =>
        <DisplayComments
          key={comment[0]}
          comment={comment[1]}
        />
      )
    }

    const nextQuestionButton =
      <button
        key={"next_question_button"}
        name="next_question_button"
        className={ this.state.enableAnsweredButton ? "question_card_next_question_button" : "question_card_next_question_button_disabled" }
        onClick={ this.state.enableAnsweredButton ? this.onClickNextQuestionFunctions : this.onClickBlankFunctions }
      >
        Next Question
      </button>

    const resultsSeq =
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

        <div className={ this.state.showVoteButtons ? "question_card_vote" : "blank" }>
          <div className={ this.state.showVoteButtons ? "question_card_vote_header" : "blank" }>
            { this.state.showVoteButtons ? voteHeader : blank }
          </div>
          <div className={ this.state.showVoteButtons ? "question_card_vote_buttons_container" : "blank" }>
            { this.state.showVoteButtons ? vote_for_question_buttons : blank }
          </div>
        </div>

        <div className={ this.state.voted ? "question_card_voted" : "blank" }>
          <div className={ this.state.voted ? "question_card_voted_header" : "blank" }>
            { this.state.voted ? voteSubHeader : blank }
          </div>

          <div className={ this.state.voted ? "question_card_voted_totals" : "blank" }>
            { this.state.voted ?
              <ul>
                <li><h5>Up Votes</h5> { this.state.voted ? votePercents.good : blank }</li>
                <li><h5>No Votes</h5> { this.state.voted ? votePercents.neutral : blank }</li>
                <li><h5>Down Votes</h5> { this.state.voted ? votePercents.bad : blank }</li>
              </ul>
            :
              blank
            }
          </div>
        </div>

        <div className={ this.state.showCommentButton || this.state.showCommentText || this.state.showAllComments ? "question_card_comment": "blank"}>
          <div className={ this.state.showCommentButton ? "question_card_comment_button_container": "blank"}>
            { this.state.showCommentButton ? comment_button : blank }
          </div>
          <div className={ this.state.showCommentText ? "question_card_comment_text": "blank"}>
            { this.state.showCommentText ? comment_form : blank }
          </div>
          <div className={ this.state.showAllComments ? "question_card_all_comments": "blank"}>
            { this.state.showAllComments ? allComments : blank }
          </div>
        </div>

        <div className={ this.state.showAnsweredButton ? "question_card_next_question_button_container": "blank"}>
          { this.state.showAnsweredButton ? nextQuestionButton : blank }
        </div>

      </div>

    return(
      <>
        { this.state.showHeader ? resultsSeq : <LoadingSpinnerRoller /> }
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
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)