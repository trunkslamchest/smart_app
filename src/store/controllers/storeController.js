import React from 'react'

// import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
// import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/actionIndex'

// import { routes } from '../../utility/paths'

class StoreController extends React.Component {

  state = {
    initAuth: false,
    initAuthRefresh: false,
    initUser: false,
    initQuestions: false,
    certAuth: false
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    if(this.props.auth.success && !this.state.initUser){
      this.props.onAuthUser()
      this.setState({ initUser: true })
    }

    if(this.props.user.info && this.props.user.questions && !this.state.initQuestions){
      this.props.onGetQuestionTotals()
      this.setState({ initQuestions: true })
    }

    if(this.props.questions.totals && !this.state.certAuth){
      this.props.onAuthCert(true)
      this.setState({ certAuth: true })
    }
  }

  componentWillUnmount(){

  }

  render(){ return( <> { this.props.children } </> )}
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
    onAuthLoading: () => dispatch(actions.authLoading()),
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
    // LOGIN
    onlogInUser: (email, password, props) => dispatch(actions.logInUser(email, password, props)),
    // MODAL
    onLoginModal: (bool) => dispatch(actions.login(bool)),
    onLogOutModal: (bool) => dispatch(actions.logout(bool)),
    onSignupModal: (bool) => dispatch(actions.signup(bool)),
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
    onSignUpUser: (signUpObj, props) => dispatch(actions.signUpUser(signUpObj, props)),
    onStoreUserInfo: (info) => dispatch(actions.storeUserInfo(info)),
    onUpdateUserInfo: (obj, props) => dispatch(actions.updateUserInfo(obj, props)),
    onClearUserInfo: () => dispatch(actions.clearUserInfo()),
    onStoreUserQuestions: (questions) => dispatch(actions.storeUserQuestions(questions)),
    onUpdateUserQuestions: () => dispatch(actions.updateUserInfo()),
    onClearUserQuestions: () => dispatch(actions.clearUserQuestions()),
    onUpdateUserQuestionIds: (ids) => dispatch(actions.updateUserQuestionIds(ids)),
    onDeleteUser: (obj, props) => dispatch(actions.deleteUser(obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreController)