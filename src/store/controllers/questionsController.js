import React from 'react'

import { connect } from 'react-redux'
import {
  getStaticQuestion,
  clearStaticQuestion,
  clearQuestionStatus,
  setStaticUserQuestion,
  clearStaticUserQuestion,
  clearStaticQuestionVoteStatus,
  clearStaticUserVote,
  loading,
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
    if(this.props.auth.status === 'authValid' && !this.props.auth.loading && !this.props.questions.status) this.initQuestionModule()

    if(this.props.questions.status === 'initStaticQuestion' && !this.state.initStaticResults) this.getStaticQuestionModule()

    if(this.props.questions.status === 'getStaticQuestion' && !this.state.initStaticUserResults && this.props.user.questions) this.setStaticUserResultsModule()

    if(this.props.questions.status === 'setStaticUserResults' && !this.state.displayStaticResults) this.displayStaticQuestionModule()

    if(this.props.questions.status === 'displayStaticQuestion' && this.props.questions.staticQuestion && this.props.questions.loading) this.cleanupStaticQuestionModule()

    if(this.props.questions.status === 'displayStaticQuestion') {
      if(this.props.questions.voteStatus === 'updateStaticUserVote' && this.props.questions.vote) this.updateStaticUserVoteModule()
      if(this.props.questions.commentStatus === 'updateStaticQuestionComment' && this.props.questions.comment) this.updateStaticUserCommentModule()
      if(this.props.questions.commentStatus === 'editStaticQuestionComment' && this.props.questions.comment) this.props.onUpdateStaticQuestionCommentStatus('commentSuccess')

      if(this.props.questions.voteStatus === 'voteSuccess' && this.props.questions.voteLoading) this.successModule("Vote")
      if(this.props.questions.commentStatus === 'commentSuccess' && this.props.questions.commentLoading) this.successModule("Comment")
    }

  }

  // shouldComponentUpdate(nextProps, nextState){
  //   let render = false

  //   if(this.props.modal.loading || nextProps.modal.loading) {
  //       render = true
  //     }

  //   // console.log(
  //   //   this.props.leaderBoards, nextProps.leaderBoards, "|",
  //   //   this.props.modal.loading, nextProps.modal.loading
  //   // )

  //   return render
  //   // return true
  // }

  componentWillUnmount(){
    this.setState({ displayStaticResults: false, initStaticResults: false, initStaticUserResults: false })
  }

  initQuestionModule = () => {
    this.props.onLoadingModal(true)
    this.props.onUpdateQuestionLoadingStatus(true)
    this.props.switchLoadingModalType('staticQuestion')
    this.props.switchLoadingModalBarType('staticQuestion')
    this.props.onUpdateQuestionStatus('initStaticQuestion')
  }

  getStaticQuestionModule = () => {
    this.props.onUpdateQuestionStatus('getStaticQuestion')
    this.props.onGetStaticQuestion({ qid: this.state.qid, category: this.state.cat, difficulty: this.state.diff })
    this.setState({ initStaticResults: true })
  }

  setStaticUserResultsModule = () => {
    this.props.onUpdateQuestionStatus('setStaticUserResults')
    this.props.onSetStaticUserQuestion(this.props.user.questions.list[this.state.qid])
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
      vid: this.props.questions.vote.vid,
      qid: this.props.questions.staticQuestion.qid,
      difficulty: this.props.questions.staticQuestion.difficulty,
      category: this.props.questions.staticQuestion.category,
      vote: this.props.questions.vote.vote
    })
  }

  updateStaticUserCommentModule = () => {
    this.props.onUpdateUserCommentsFromPlayController({
      type: 'static',
      cid: this.props.questions.comment.cid,
      qid: this.props.questions.staticQuestion.qid,
      category: this.props.questions.staticQuestion.category,
      comment: this.props.questions.comment.comment,
      difficulty: this.props.questions.staticQuestion.difficulty,
      timestamp: this.props.questions.comment.timestamp
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
          this.props.questions.status === 'displayStaticQuestion' &&
          // !this.props.questions.loading &&
          // !this.props.modal.loading &&
            <ResultsContainer
              cat={ this.state.cat }
              diff={ this.state.diff }
              qid={ this.state.qid }
              history={ this.props.history }
              staticResults={ true }
            />
        }
      </>
    )
  }
}

const store = (store) => {
  return {
    modal: store.modal,
    auth: store.auth,
    play: store.play,
    user: store.user,
    questions: store.questions
  }
}

const dispatch = (dispatch) => {
  return {
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

export default connect(store, dispatch)(QuestionsController)