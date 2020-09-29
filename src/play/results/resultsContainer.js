import React from 'react'

import { connect } from 'react-redux'
import {
  setVote,
  setComment,
  updateVoteStatus,
  updateCommentStatus
} from '../../store/actions/actionIndex'

import validateComment from '../../utility/validation/validateComment'
import getTime from '../../utility/getTime'

import ResultsHeader from './resultsHeader/resultsHeader'
import ResultsAnswer from './resultsAnswer/resultsAnswer'
// import ResultsDifficulty from './resultsDifficulty/resultsDifficulty'
import ResultsStats from './resultsStats/resultsStats'
import ResultsVote from './resultsVote/resultsVote'
import ResultsComment from './resultsComment/resultsComment'
import ResultsNextQuestion from './resultsNextQuestion/resultsNextQuestion'

import Wrapper from '../../UI/wrapper/wrapper'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    initResults: false,
    comment: '',
    commentForm: { valid: true },
    showHeader: false,
    showCorrectAnswer: false,
    // showDifficulty: false,
    showStats: false,
    showVoteButtons: false,
    showCommentButton: false,
    showComments: false,
    showNextQuestionButton: false,
    enableVoteButtons: false,
    enableCommentButton: false,
    enableAddCommentButton: true,
    enableNextQuestionButton: false
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'quick_play') document.title = 'SmartApp™ | Play | Quick Play | Results'
    if(this.props.play.gameMode === 'by_diff') document.title = 'SmartApp™ | Play | Difficulty | Results'
    if(this.props.play.gameMode === 'by_cat') document.title = 'SmartApp™ | Play | Category | Results'

    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 100)
    if(this.props.play.results.result === "Incorrect") this.correctAnswerTimeout = setTimeout(() => { this.setState({ showCorrectAnswer: true })}, 1000)
    // this.difficultyTimeout = setTimeout(() => { this.setState({ showDifficulty: true })}, 1250)
    this.statsTimeout = setTimeout(() => { this.setState({ showStats: true })}, 1500)
    this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 1750)
    this.enableVoteButtonsTimeout = setTimeout(() => { this.setState({ enableVoteButtons: true })}, 2000)
    this.nextQuestionButtonTimeout = setTimeout(() => { this.setState({ showNextQuestionButton: true })}, 2250)
    this.enableNextQuestionButtonTimeout = setTimeout(() => { this.setState({ enableNextQuestionButton: true })}, 2500)
    this.commentsTimeout = setTimeout(() => { this.setState({ showComments: true })}, 2500)
    this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 2750)
  }

  componentDidUpdate(){
    if(this.props.play.commentLoading && this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: false })
    if(!this.props.play.commentLoading && !this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: true })
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.correctAnswerTimeout)
    // clearTimeout(this.difficultyTimeout)
    clearTimeout(this.statsTimeout)
    clearTimeout(this.voteButtonsTimeout)
    clearTimeout(this.enableVoteButtonsTimeout)
    clearTimeout(this.commentsTimeout)
    clearTimeout(this.enableCommentButtonTimeout)
    clearTimeout(this.enableAddCommentButtonTimeout)
    clearTimeout(this.nextQuestionButtonTimeout)
    clearTimeout(this.enableNextQuestionTimeout)
  }

  onClickVoteFunctions = (event) => {
    event.persist()
    this.props.onSetVote({
      uid: localStorage.id,
      qid: this.props.play.question.id,
      question: this.props.play.question.question,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      answer: this.props.play.answer.choice,
      correct_answer: this.props.play.results.correct_answer,
      result: this.props.play.results.result,
      vote: event.target.attributes.vote.value
    })
    this.props.onUpdateVoteStatus('initVote', true)
    this.setState({ showVoteButtons: false, enableVoteButtons: false })
  }

  onClickCommentFunctions = () => { this.setState({ enableCommentButton: false }) }

  onChangeComment = (event) => { this.setState({ comment: event.target.value }) }

  onAddComment = (event) => {
    event.persist()
    event.preventDefault()

    let authCheck = validateComment(this.state.comment)
    this.setState({ commentForm: authCheck })

    if (authCheck.valid) {
      this.setState({ enableAddCommentButton: false })
      this.props.onSetComment({
        uid: localStorage.id,
        qid: this.props.play.question.id,
        user_name: this.props.user.info.user_name,
        question: this.props.play.question.question,
        difficulty: this.props.play.question.difficulty,
        category: this.props.play.question.category,
        answer: this.props.play.answer.choice,
        correct_answer: this.props.play.results.correct_answer,
        result: this.props.play.results.result,
        comment: this.state.comment,
        timestamp: getTime('fullDate')
      })
      this.props.onUpdateCommentStatus('initComment', true)
      this.setState({ comment: '' })
    }
  }

  onDisableNextQuestionButton = () => { this.setState({ enableNextQuestionButton: false }) }

  render(){

    let results = <></>

    if(this.state.showHeader) {
      results =
        <div className="results_container">
          <ResultsHeader
            showHeader={ this.state.showHeader }
          />
          <ResultsAnswer
            showCorrectAnswer={ this.state.showCorrectAnswer }
          />
          {/* <ResultsDifficulty
            showDifficulty={ this.state.showDifficulty }
          /> */}
          <ResultsStats
            showStats={ this.state.showStats }

          />
          <ResultsVote
            enableVoteButtons={ this.state.enableVoteButtons }
            showVoteButtons={ this.state.showVoteButtons }
            onClickVoteFunctions={ this.onClickVoteFunctions }
          />
          <ResultsComment
            comment={ this.state.comment }
            commentForm={ this.state.commentForm }
            showComments={ this.state.showComments }
            enableCommentButton={ this.state.enableCommentButton }
            enableAddCommentButton={ this.state.enableAddCommentButton }
            onAddComment={ this.onAddComment }
            onChangeComment={ this.onChangeComment }
            onClickCommentFunctions={ this.onClickCommentFunctions }
          />
          <ResultsNextQuestion
            showNextQuestionButton={ this.state.showNextQuestionButton }
            enableNextQuestionButton={ this.state.enableNextQuestionButton }
            onDisableNextQuestionButton= { this.onDisableNextQuestionButton }
          />
        </div>
    }

    return(
      <Wrapper>
        { results }
      </Wrapper>
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
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onSetVote: (obj) => dispatch(setVote(obj)),
    onSetComment: (obj) => dispatch(setComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)