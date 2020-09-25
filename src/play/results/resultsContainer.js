import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import validateComment from '../../utility/validation/validateComment'

import ResultsHeader from './resultsHeader/resultsHeader'
import ResultsAnswer from './resultsAnswer/resultsAnswer'
import ResultsDifficulty from './resultsDifficulty/resultsDifficulty'
import ResultsVote from './resultsVote/resultsVote'
import ResultsComment from './resultsComment/resultsComment'
import ResultsNextQuestion from './resultsNextQuestion/resultsNextQuestion'

import Wrapper from '../../UI/wrapper/wrapper'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    comment: '',
    commentForm: { valid: true },
    showHeader: false,
    showCorrectAnswer: false,
    showDifficulty: false,
    showVoteButtons: false,
    showCommentButton: false,
    showCommentForm: false,
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
    this.difficultyTimeout = setTimeout(() => { this.setState({ showDifficulty: true })}, 1250)
    this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 1500)
    this.enableVoteButtonsTimeout = setTimeout(() => { this.setState({ enableVoteButtons: true })}, 1750)
    this.commentButtonTimeout = setTimeout(() => { this.setState({ showCommentButton: true })}, 2000)
    this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 2250)
    this.nextQuestionButtonTimeout = setTimeout(() => { this.setState({ showNextQuestionButton: true })}, 2250)
    this.enableNextQuestionButtonTimeout = setTimeout(() => { this.setState({ enableNextQuestionButton: true })}, 2500)
  }

  componentDidUpdate(){
    if(this.props.play.commentLoading && this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: false })
    if(!this.props.play.commentLoading && !this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: true })
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.correctAnswerTimeout)
    clearTimeout(this.difficultyTimeout)
    clearTimeout(this.voteButtonsTimeout)
    clearTimeout(this.enableVoteButtonsTimeout)
    clearTimeout(this.commentButtonTimeout)
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

  onClickCommentFunctions = () => { this.setState({ showCommentButton: false, showCommentForm: true, enableCommentButton: false }) }

  onChangeComment = (event) => { this.setState({ comment: event.target.value }) }

  onAddComment = (event) => {
    event.persist()
    event.preventDefault()

    let authCheck = validateComment(this.state.comment)
    this.setState({ commentForm: authCheck })

    if (authCheck.valid) {
      this.setState({ enableAddCommentButton: false, showCommentForm: false })
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
        comment: this.state.comment
      })
      this.props.onUpdateCommentStatus('initComment', true)
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
          <ResultsDifficulty
            showDifficulty={ this.state.showDifficulty }
          />
          <ResultsVote
            enableVoteButtons={ this.state.enableVoteButtons }
            showVoteButtons={ this.state.showVoteButtons }
            onClickVoteFunctions={ this.onClickVoteFunctions }
          />
          <ResultsComment
            comment={ this.state.comment }
            commentForm={ this.state.commentForm }
            showCommentButton={ this.state.showCommentButton }
            showCommentForm={ this.state.showCommentForm }
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
    onUpdateGameStatus: (status, loading) => dispatch(actions.updateGameStatus(status, loading)),
    onUpdateVoteStatus: (status, loading) => dispatch(actions.updateVoteStatus(status, loading)),
    onUpdateCommentStatus: (status, loading) => dispatch(actions.updateCommentStatus(status, loading)),
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
    onResetComment: (obj) => dispatch(actions.resetComment(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)