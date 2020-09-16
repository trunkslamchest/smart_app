import React from 'react'

// import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
// import * as actionTypes from '../actions/actionTypes'
import * as actions from '../actions/actionIndex'

import { routes } from '../../utility/paths'

class AuthController extends React.Component {

  state = {
    authCert: false,
    authValid: false,
    initAuthQuestions: false,
    initAuthStart: false,
    initAuthUser: false,
    initAuthDelete: false,
    initAuthLogOut: false,
  }

  componentDidMount(){

  }

  componentDidUpdate(){

    if(this.props.auth.start && !this.state.initAuthStart){
      this.setState({
        authCert: false,
        authValid: false,
        initAuthQuestions: false,
        initAuthStart: true,
        initAuthUser: false,
        initAuthDelete: false,
        initAuthLogOut: false,
      })
    }

    if(this.props.auth.success && this.state.initAuthStart && !this.state.authValid){
      if(!this.state.initAuthDelete && this.props.auth.authType === 'deleteProfile') { this.setState({ initAuthDelete: true, initAuthStart: false }) }
      if(!this.state.initAuthUser && this.props.auth.authType !== 'deleteProfile') { this.setState({ initAuthUser: true, initAuthStart: false }) }
    }

    if(this.state.initAuthDelete){
        this.props.onAuthDelete()
        this.setState({ initAuthDelete: false })
    }

    if(this.state.initAuthUser){
        this.props.onAuthUser()
        this.setState({ initAuthUser: false, initAuthQuestions: true })
    }

    if(this.props.user.info && this.props.user.questions && this.state.initAuthQuestions && !this.state.authValid){
      this.props.onGetQuestionTotals()
      this.setState({ initAuthQuestions: false, initAuthUser: false })
    }

    if((this.props.auth.authType !== 'deleteProfile' && this.props.questions.totals) && !this.state.initAuthDelete && !this.state.initAuthQuestions && !this.state.authCert && !this.state.authValid){
      this.props.onAuthCert(true)
      this.setState({ authCert: true })
    }

    if(this.props.auth.cert && !this.state.authValid){
      if(this.props.auth.authType === 'logIn' || this.props.auth.authType === 'signUp') {
        this.props.onAuthClearState()
        this.resetLocalAuthState()
        this.props.onAuthValid(true)
        this.setState({ authValid: true })
        this.props.history.push( routes.dashboard )
      }
      if(this.props.auth.authType === 'refresh'){
        this.props.onAuthClearState()
        this.resetLocalAuthState()
        this.props.onAuthValid(true)
        this.setState({ authValid: true })
      }
    }

    if(this.props.modal.login && this.props.auth.valid) this.props.onLogInModal(false)
    if(this.props.modal.signup && this.props.auth.valid) this.props.onSignUpModal(false)

    if(this.props.auth.authType === 'logOut' && !this.state.initAuthLogOut) { this.setState({ initAuthLogOut: true }) }

    if(this.state.initAuthLogOut) {
      this.props.onAuthLogOut()
      this.resetLocalAuthState()
      if(this.props.modal.deleteProfile) this.props.onDeleteProfileModal(false)
      if(this.props.modal.logout) this.props.onLogOutModal(false)
      this.props.history.push( routes.home )
    }

  }

  componentWillUnmount(){

  }

  resetLocalAuthState = () => {
    this.setState({
      authCert: false,
      authValid: false,
      initAuthQuestions: false,
      initAuthUser: false,
      initAuthStart: false,
      initAuthDelete: false,
      initAuthLogOut: false,
    })
  }

  render(){
    return(
      <>
        { this.props.children }
      </>
    )
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    modal: state.modal,
    play: state.play,
    questions: state.questions,
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
    onAuthDelete: () => dispatch(actions.authDelete()),
    onAuthTimeout: (time) => dispatch(actions.authTimeout(time)),
    onAuthCert: (bool) => dispatch(actions.authCert(bool)),
    onAuthValid: (bool) => dispatch(actions.authValid(bool)),
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
    onUpdateUserQuestionIdsFromPlayController: (ids) => dispatch(actions.updateUserQuestionIdsFromPlayController(ids)),
    onDeleteUser: (obj, props) => dispatch(actions.deleteUser(obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthController)