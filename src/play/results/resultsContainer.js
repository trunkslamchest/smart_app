import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import ResultsHeader from './resultsHeader/resultsHeader'
import ResultsAnswer from './resultsAnswer/resultsAnswer'
import ResultsDifficulty from './resultsDifficulty/resultsDifficulty'
import ResultsVote from './resultsVote/resultsVote'
import ResultsComment from './resultsComment/resultsComment'
import ResultsNextQuestion from './resultsNextQuestion/resultsNextQuestion'

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
    showCommentForm:false,
    showNextQuestionButton: false,
    enableCommentButton: false,
    enableNextQuestionButton: false,
    voted: false,
    commented: false,
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'quick_play') document.title = 'SmartApp™ | Play | Quick Play | Results'
    if(this.props.play.gameMode === 'by_diff') document.title = 'SmartApp™ | Play | Difficulty | Results'
    if(this.props.play.gameMode === 'by_cat') document.title = 'SmartApp™ | Play | Category | Results'

    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 1000)
    this.difficultyTimeout = setTimeout(() => { this.setState({ showDifficulty: true })}, 2000)
    this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 2500)
    this.commentButtonTimeout = setTimeout(() => { this.setState({ showCommentButton: true })}, 3000)
    this.nextQuestionButtonTimeout = setTimeout(() => { this.setState({ showNextQuestionButton: true })}, 3500)
    this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true })}, 3750)
    this.enableNextQuestionButtonTimeout = setTimeout(() => { this.setState({ enableNextQuestionButton: true })}, 4250)
    if(this.props.play.results.result === "Incorrect") this.correctAnswerTimeout = setTimeout(() => { this.setState({ showCorrectAnswer: true })}, 1500)
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.correctAnswerTimeout)
    clearTimeout(this.difficultyTimeout)
    clearTimeout(this.voteButtonsTimeout)
    clearTimeout(this.commentButtonTimeout)
    clearTimeout(this.nextQuestionButtonTimeout)
    clearTimeout(this.enableCommentButtonTimeout)
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
    this.setState({ voted: true, showVoteButtons: false })
  }

  onClickCommentFunctions = () => { this.setState({ showCommentButton: false, showCommentForm: true }) }

  onChangeComment = (event) => { this.setState({ comment: event.target.value }) }

  onAddComment = (event) => {
    event.persist()
    event.preventDefault()
    if (this.state.comment){
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
      this.setState({ showCommentForm: false, commented: true })
    } else alert("Please Enter A Comment")
  }

  render(){

    let results = <LoadingSpinnerRoller />

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
            showVoteButtons={ this.state.showVoteButtons }
            voted={ this.state.voted }
            onClickVoteFunctions={ this.onClickVoteFunctions }
          />
          <ResultsComment
            comment={ this.state.comment }
            commented={ this.state.commented }
            showCommentButton={ this.state.showCommentButton }
            showCommentForm={ this.state.showCommentForm }
            enableCommentButton={ this.state.enableCommentButton }
            onAddComment={ this.onAddComment }
            onChangeComment={ this.onChangeComment }
            onClickCommentFunctions={ this.onClickCommentFunctions }
          />
          <ResultsNextQuestion
            showNextQuestionButton={ this.state.showNextQuestionButton }
            enableNextQuestionButton={ this.state.enableNextQuestionButton }
          />
        </div>
    }

    return(
      <>{ results }</>
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
    onResetComment: (obj) => dispatch(actions.resetComment(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)