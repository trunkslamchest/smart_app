import React from 'react'

// import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../actions/actionIndex'

import AuthController from './authController'

class StoreController extends React.Component {

  state = {

  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  componentWillUnmount(){
    this.props.showModal(false)
  }

  render(){
    return(
      <AuthController history={ this.props.history }>
        { this.props.children }
      </AuthController>
    )
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    modal: state.modal,
    logIn: state.logIn,
    play: state.play,
    questions: state.questions,
    signUp: state.signUp,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // AUTH
    onAuthStart: () => dispatch(actions.authStart()),
    onAuthSuccess: (token, refreshToken, id, expires) => dispatch(actions.authSuccess(token, refreshToken, id, expires)),
    onAuthFail: (error) => dispatch(actions.authFail(error)),
    onAuthLogIn: (email, password, props) => dispatch(actions.authLogIn(email, password, props)),
    onAuthLogOut: (props) => dispatch(actions.authLogOut(props)),
    // onclearAuthInfo: () => dispatch(actions.clearAuthInfo()),
    onAuthRefresh: (obj) => dispatch(actions.authRefresh(obj)),
    onAuthUser: (token, refreshToken, id, expires) => dispatch(actions.authUser(token, refreshToken, id, expires)),
    onAuthDelete: (props) => dispatch(actions.authDelete(props)),
    onAuthTimeout: (time) => dispatch(actions.authTimeout(time)),
    onAuthCert: (bool) => dispatch(actions.authCert(bool)),
    onAuthValid: (bool) => dispatch(actions.authValid(bool)),
    onAuthClearState: () => dispatch(actions.authClearState()),
    // MODAL
    onLogInModal: (bool) => dispatch(actions.login(bool)),
    onLogOutModal: (bool) => dispatch(actions.logout(bool)),
    onSignUpModal: (bool) => dispatch(actions.signup(bool)),
    onDeleteProfileModal: (bool) => dispatch(actions.deleteProfile(bool)),
    onShowModal: (bool) => dispatch(actions.showModal(bool)),
    // PLAY
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetGameQset: (set) => dispatch(actions.setGameQset(set)),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj)),
    // QUESTIONS
    onStoreQuestionTotals: (totals) => dispatch(actions.storeQuestionTotals(totals)),
    onGetQuestionTotals: (props) => dispatch(actions.getQuestionTotals(props)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
    // USER
    onStoreUserInfo: (info) => dispatch(actions.storeUserInfo(info)),
    onUpdateUserInfo: (obj, props) => dispatch(actions.updateUserInfo(obj, props)),
    onClearUserInfo: () => dispatch(actions.clearUserInfo()),
    onStoreUserQuestions: (questions) => dispatch(actions.storeUserQuestions(questions)),
    onUpdateUserQuestions: () => dispatch(actions.updateUserInfo()),
    onClearUserQuestions: () => dispatch(actions.clearUserQuestions()),
    onUpdateUserQuestionIdsFromPlayController: (ids) => dispatch(actions.updateUserQuestionIdsFromPlayController(ids)),
    // onDeleteUser: (obj, props) => dispatch(actions.deleteUser(obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreController)