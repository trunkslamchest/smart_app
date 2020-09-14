import React from 'react'

// import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
// import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/actionIndex'

import { routes } from '../../utility/paths'

class StoreController extends React.Component {

  state = {
    authValid: false,
    initAuth: false,
    initUser: false,
    initQuestions: false,
    certAuth: false,
    initAuthLogOut: false,
  }

  componentDidMount(){

  }

  componentDidUpdate(){
    // console.log(this.props.auth.success)
    if(this.props.auth.success && !this.state.initUser && !this.state.authValid){
      this.props.onAuthUser()
      this.setState({ initUser: true })
    }

    if(this.props.user.info && this.props.user.questions && !this.state.initQuestions && !this.state.authValid){
      this.props.onGetQuestionTotals()
      this.setState({ initQuestions: true })
    }

    if(this.props.questions.totals && !this.state.certAuth && !this.state.authValid){
      this.props.onAuthCert(true)
      this.setState({ certAuth: true })
    }


    if(this.props.auth.cert && this.props.auth.authType !== 'refresh' && !this.state.authValid){
      this.props.onAuthClearState()
      this.resetLocalAuthState()
      this.props.onAuthValid(true)
      this.setState({ authValid: true })
      this.props.history.push( routes.dashboard )
    }

    if(this.props.modal.login && this.props.auth.valid) this.props.onLogInModal(false)
    if(this.props.modal.signup && this.props.auth.valid) this.props.onSignUpModal(false)

    if(this.props.auth.cert && this.props.auth.authType === 'refresh' && !this.state.authValid) {
      this.props.onAuthClearState()
      this.props.onAuthValid(true)
      this.setState({ authValid: true })
    }

    if(this.props.auth.authType === 'logOut' && !this.state.initAuthLogOut) {
      this.setState({ initAuthLogOut: true })
    }

    if(this.state.initAuthLogOut) {
      this.props.onAuthLogOut()
      this.resetLocalAuthState()
      this.props.onLogOutModal(false)
      this.props.history.push( routes.home )
    }

  }

  componentWillUnmount(){

  }

  resetLocalAuthState = () => {
    this.setState({
      authValid: false,
      initAuth: false,
      initUser: false,
      initQuestions: false,
      certAuth: false,
      initAuthLogOut: false,
    })
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
    onAuthValid: (bool) => dispatch(actions.authValid(bool)),
    onAuthRedirect: (bool) => dispatch(actions.authRedirect(bool)),
    onAuthClearState: () => dispatch(actions.authClearState()),
    onAuthClearCreds: () => dispatch(actions.authClearCreds()),
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
    onUpdateUserQuestionIds: (ids) => dispatch(actions.updateUserQuestionIds(ids)),
    onDeleteUser: (obj, props) => dispatch(actions.deleteUser(obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreController)