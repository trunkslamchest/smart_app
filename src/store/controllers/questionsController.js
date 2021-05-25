import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  loading,
  setLoadingModalType,
  getStaticQuestion,
  clearStaticQuestion,
  clearQuestionStatus,
  setStaticUserQuestion,
  clearStaticUserQuestion,
  clearStaticQuestionVoteStatus,
  clearStaticUserVote,
  updateQuestionStatus,
  updateQuestionLoadingStatus,
  updateUserVotesFromPlayController,
  updateUserCommentsFromPlayController,
  updateStaticQuestionVoteStatus,
  updateStaticQuestionCommentStatus,
  voteLoading,
  commentLoading,
  clearStaticQuestionCommentStatus,
  clearStaticUserComment
} from '../../store/actions/actionIndex'

import ResultsContainer from '../../play/results/resultsContainer'

class QuestionsController extends React.Component {

  state = {
    cat: null,
    diff: null,
    displayStaticResults: false,
    initStaticResults: false,
    initStaticUserResults: false,
    qid: null
  }

  componentDidMount(){
    let parseLocation = this.props.history.location.pathname.split("/")
    if(parseLocation[parseLocation.length - 1] === 'stats' || parseLocation[parseLocation.length - 1] === 'discuss' ) parseLocation.pop()
    let qid = parseLocation[parseLocation.length - 1],
        cat = parseLocation[parseLocation.length - 2],
        diff = parseLocation[parseLocation.length - 3]
    document.title = `SmartApp™ | Results | ${ qid }`
    this.setState({ cat: cat, diff: diff, qid: qid })
  }

  componentDidUpdate(){
    if(this.props.authStatus === 'authValid' && !this.props.authLoading && !this.props.questionStatus) this.initQuestionModule()
    if(this.props.questionStatus === 'initStaticQuestion' && !this.state.initStaticResults) this.getStaticQuestionModule()
    if(this.props.questionStatus === 'getStaticQuestion' && !this.state.initStaticUserResults && this.props.userQuestions) this.setStaticUserResultsModule()
    if(this.props.questionStatus === 'setStaticUserResults' && !this.state.displayStaticResults) this.displayStaticQuestionModule()
    if(this.props.questionStatus === 'displayStaticQuestion' && this.props.staticQuestion && this.props.questionLoading) this.cleanupStaticQuestionModule()
    if(this.props.questionStatus === 'displayStaticQuestion') {
      if(this.props.voteStatus === 'updateStaticUserVote' && this.props.questionVote) this.updateStaticUserVoteModule()
      if(this.props.commentStatus === 'updateStaticQuestionComment' && this.props.questionComment) this.updateStaticUserCommentModule()
      if(this.props.commentStatus === 'editStaticQuestionComment' && this.props.questionComment) this.props.onUpdateStaticQuestionCommentStatus('commentSuccess')
      if(this.props.voteStatus === 'voteSuccess' && this.props.voteLoading) this.successModule("Vote")
      if(this.props.commentStatus === 'commentSuccess' && this.props.commentLoading) this.successModule("Comment")
    }
  }

  componentWillUnmount(){
    this.setState({ displayStaticResults: false, initStaticResults: false, initStaticUserResults: false })
  }

  initQuestionModule = () => {
    this.props.onLoadingModal(true)
    this.props.onUpdateQuestionLoadingStatus(true)
    this.props.onSetLoadingModalType('staticQuestion', 'staticQuestion')
    this.props.onUpdateQuestionStatus('initStaticQuestion')
  }

  getStaticQuestionModule = () => {
    this.props.onUpdateQuestionStatus('getStaticQuestion')
    this.props.onGetStaticQuestion({ qid: this.state.qid, category: this.state.cat, difficulty: this.state.diff })
    this.setState({ initStaticResults: true })
  }

  setStaticUserResultsModule = () => {
    this.props.onUpdateQuestionStatus('setStaticUserResults')
    this.props.onSetStaticUserQuestion(this.props.userQuestions.list[this.state.qid])
    this.setState({ initStaticUserResults: true })
  }

  displayStaticQuestionModule = () => {
    this.props.onUpdateQuestionStatus('displayStaticQuestion')
    this.setState({ displayStaticResults: true })
  }

  cleanupStaticQuestionModule = () => {
    this.props.onUpdateQuestionLoadingStatus(false)
    this.props.onLoadingModal(false)
    this.setState({ initStaticResults: false, initStaticUserResults: false })
  }

  updateStaticUserVoteModule = () => {
    this.props.onUpdateUserVotesFromPlayController({
      type: 'static',
      vid: this.props.questionVote.vid,
      qid: this.props.staticQuestion.qid,
      difficulty: this.props.staticQuestion.difficulty,
      category: this.props.staticQuestion.category,
      vote: this.props.questionVote.vote
    })
  }

  updateStaticUserCommentModule = () => {
    this.props.onUpdateUserCommentsFromPlayController({
      type: 'static',
      cid: this.props.questionComment.cid,
      qid: this.props.staticQuestion.qid,
      category: this.props.staticQuestion.category,
      comment: this.props.questionComment.comment,
      difficulty: this.props.staticQuestion.difficulty,
      timestamp: this.props.questionComment.timestamp
    })
  }

  successModule = (type) => {
    this.props[`onClearStaticUser${type}`]()
    this.props[`onClearStaticQuestion${type}Status`]()
    this.props[`on${type}Loading`](false)
  }

  render(){
    return(
      <>
        {
          this.props.questionStatus === 'displayStaticQuestion' &&
            <ResultsContainer
              cat={ this.state.cat }
              diff={ this.state.diff }
              qid={ this.state.qid }
              staticResults={ true }
            />
        }
      </>
    )
  }
}

const store = (store) => {
  return {
    authStatus: store.auth.status,
    authLoading: store.auth.loading,
    userQuestions: store.user.questions,
    questionStatus: store.questions.status,
    questionLoading: store.questions.loading,
    staticQuestion: store.questions.staticQuestion,
    questionVote: store.questions.vote,
    questionComment: store.questions.comment,
    voteStatus: store.questions.voteStatus,
    voteLoading: store.questions.voteLoading,
    commentStatus: store.questions.commentStatus,
    commentLoading: store.questions.commentLoading
  }
}

const dispatch = (dispatch) => {
  return {
    onSetLoadingModalType: (modalType, barType) => dispatch(setLoadingModalType(modalType, barType)),
    onGetStaticQuestion: (obj) => dispatch(getStaticQuestion(obj)),
    onSetStaticUserQuestion: (obj) => dispatch(setStaticUserQuestion(obj)),
    onClearStaticUserQuestion: () => dispatch(clearStaticUserQuestion()),
    onClearStaticQuestion: () => dispatch(clearStaticQuestion()),
    onClearQuestionStatus: () => dispatch(clearQuestionStatus()),
    onClearStaticQuestionVoteStatus: () => dispatch(clearStaticQuestionVoteStatus()),
    onClearStaticUserVote: () => dispatch(clearStaticUserVote()),
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onUpdateQuestionStatus: (status) => dispatch(updateQuestionStatus(status)),
    onUpdateQuestionLoadingStatus: (bool) => dispatch(updateQuestionLoadingStatus(bool)),
    onUpdateUserVotesFromPlayController: (obj) => dispatch(updateUserVotesFromPlayController(obj)),
    onUpdateUserCommentsFromPlayController: (obj) => dispatch(updateUserCommentsFromPlayController(obj)),
    onUpdateStaticQuestionVoteStatus: (status) => dispatch(updateStaticQuestionVoteStatus(status)),
    onUpdateStaticQuestionCommentStatus: (status) => dispatch(updateStaticQuestionCommentStatus(status)),
    onVoteLoading: (bool) => dispatch(voteLoading(bool)),
    onCommentLoading: (bool) => dispatch(commentLoading(bool)),
    onClearStaticQuestionCommentStatus: () => dispatch(clearStaticQuestionCommentStatus()),
    onClearStaticUserComment: () => dispatch(clearStaticUserComment())
  }
}

export default withRouter(connect(store, dispatch)(QuestionsController))