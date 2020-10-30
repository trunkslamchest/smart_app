import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../actions/actionIndex'

import { routes } from '../../utility/paths'
import getTime from '../../utility/getTime'

class AuthController extends React.Component {

  state = {
    initAuthLocalUser: false,
    initAuthQuestions: false,
    initAuthStart: false,
    initClearAuthCreds: false,
    initClearQuestionTotals: false,
    initClearUserInfo: false,
    initClearUserQuestions: false,
    initUserLogOut: false,
    initAuthDeleteUser: false,
    // authDeleteUser: false,
    initLocalDeleteUser: false,
    authLogInValid: false,
    authLogOutValid: false,
    authDeleteUserValid: false,
    authUserUpdateValid: false,
    authUserInfoLocal: false,
    authAchievements: false,
    authUserQuestionsLocal: false
  }

  componentDidMount(){
    if (!localStorage.token) {
      this.clearLocalStorage()
      this.props.onAuthUpdateStatus(null, false)
    }
    else {
      this.props.onLoadingModal(true)
      this.props.onAuthStart('refresh', { grant_type: "refresh_token", refresh_token: localStorage.refreshToken })
    }
  }

  componentDidUpdate(){

    if(this.props.auth.authType === 'logIn') {
      if(this.props.auth.status === 'authUserGoogleStart' && !this.state.initAuthStart) this.initAuthModule('authUserGoogle')
      if(this.props.auth.status === 'authUserGoogleSuccess' && !this.state.initAuthLocalUser) this.authUserLocalModule('authUserLocal')
      if(this.props.auth.status === 'storeUserInfo' && this.props.user.info && !this.state.authUserInfoLocal) this.authUserInfoLocalModule('storeUserInfoSuccess')
      if(this.props.auth.status === 'storeUserQuestions' && this.props.user.questions && !this.state.authUserQuestionsLocal) this.authUserQuestionsLocalModule('storeUserQuestionsSuccess')
      if(this.props.auth.status === 'storeUserQuestionsSuccess' && this.props.user.info && this.props.user.questions && !this.state.authAchievements) this.authAchievementsModule('getAchievements')
      if(this.props.auth.status === 'storeAchievementsSuccess' && this.props.user.info && this.props.user.questions && this.props.achievements.all && !this.state.initAuthQuestions) this.authQuestionsLocalModule('getQuestionsLocal')
      if(this.props.auth.status === 'storeQuestionsLocal' && this.props.questions.totals) this.props.onAuthUpdateStatus('storeQuestionsLocalSuccess', true)
      if(this.props.auth.status === 'storeQuestionsLocalSuccess' && !this.state.authLogInValid) this.authLogInValidModule('authValid')
    }

    if(this.props.auth.authType === 'signUp') {
      if(this.props.auth.status === 'authUserGoogleStart' && !this.state.initAuthStart) this.initAuthModule('authUserGoogle')
      if(this.props.auth.status === 'createUserLocalSuccess' && !this.state.initAuthLocalUser) this.authUserLocalModule('authUserLocal')
      if(this.props.auth.status === 'storeUserInfo' && this.props.user.info && !this.state.authUserInfoLocal) this.authUserInfoLocalModule('storeUserInfoSuccess')
      if(this.props.auth.status === 'storeUserQuestions' && this.props.user.questions && !this.state.authUserQuestionsLocal) this.authUserQuestionsLocalModule('storeUserQuestionsSuccess')
      if(this.props.auth.status === 'storeUserQuestionsSuccess' && this.props.user.info && this.props.user.questions && !this.state.authAchievements) this.authAchievementsModule('getAchievements')
      if(this.props.auth.status === 'storeAchievementsSuccess' && this.props.user.info && this.props.user.questions && this.props.achievements.all && !this.state.initAuthQuestions) this.authQuestionsLocalModule('getQuestionsLocal')
      if(this.props.auth.status === 'storeQuestionsLocal' && this.props.questions.totals) this.props.onAuthUpdateStatus('storeQuestionsLocalSuccess', true)
      if(this.props.auth.status === 'storeQuestionsLocalSuccess' && !this.state.authLogInValid) this.authLogInValidModule('authValid')
    }

    if(this.props.auth.authType === 'refresh') {
      if(this.props.auth.status === 'authUserGoogleSuccess' && !this.state.initAuthLocalUser) this.authUserLocalModule('authUserLocal')
      if(this.props.auth.status === 'storeUserInfo' && this.props.user.info && !this.state.authUserInfoLocal) this.authUserInfoLocalModule('storeUserInfoSuccess')
      if(this.props.auth.status === 'storeUserQuestions' && this.props.user.questions && !this.state.authUserQuestionsLocal) this.authUserQuestionsLocalModule('storeUserQuestionsSuccess')
      if(this.props.auth.status === 'storeUserQuestionsSuccess' && this.props.user.info && this.props.user.questions && !this.state.authAchievements) this.authAchievementsModule('getAchievements')
      if(this.props.auth.status === 'storeAchievementsSuccess' && this.props.user.info && this.props.user.questions && this.props.achievements.all && !this.state.initAuthQuestions) this.authQuestionsLocalModule('getQuestionsLocal')
      if(this.props.auth.status === 'storeQuestionsLocal' && this.props.questions.totals) this.props.onAuthUpdateStatus('storeQuestionsLocalSuccess', true)
      if(this.props.auth.status === 'storeQuestionsLocalSuccess' && !this.state.authLogInValid) this.authLogInValidModule('authValid')
      if(this.props.auth.status === 'fail') this.refreshFailModule()
    }

    if(this.props.auth.authType === 'logOut') {
      if(this.props.modal.logout) {
        if(this.props.auth.status === 'initUserLogOut' && !this.state.initUserLogOut) this.authInitUserLogOutModule('initClearUserInfo')
        if(this.props.auth.status === 'initClearUserInfo' && !this.state.initClearUserInfo) this.initClearUserInfoModule('clearUserInfo')
        if(this.props.auth.status === 'clearUserInfo' && !this.props.user.info) this.props.onAuthUpdateStatus('clearUserInfoSuccess', true)
        if(this.props.auth.status === 'clearUserInfoSuccess' && !this.state.initClearUserQuestions) this.initClearUserQuestionsModule('initClearUserQuestions')
        if(this.props.auth.status === 'clearUserQuestions' && !this.props.user.questions) this.props.onAuthUpdateStatus('clearUserQuestionsSuccess', true)
        if(this.props.auth.status === 'clearUserQuestionsSuccess' && !this.state.initClearQuestionTotals) this.initClearQuestionTotalsModule('initClearQuestionTotals')
        if(this.props.auth.status === 'clearQuestionTotals' && !this.props.questions.totals) this.props.onAuthUpdateStatus('clearQuestionTotalsSuccess', true)
        if(this.props.auth.status === 'clearQuestionTotalsSuccess' && !this.state.initClearAuthCreds) this.initClearAuthCredsModule('initClearAuthCreds')
        if(this.props.auth.status === 'clearAuthCredsSuccess' && !this.state.authLogOutValid) this.authFinalizeLogOut('authFinalizeLogOut')
      }
    }

    if(this.props.auth.authType === 'editProfile') {
      if(this.props.modal.loading){
        if(this.props.auth.status === 'updateUserInfoSuccess' && !this.state.authUserUpdateValid) this.authUpdateUserModule('finalizeUpdateUserInfo')
        if(this.props.auth.status === 'finalizeUpdateUserInfo' && this.state.authUserUpdateValid) this.authFinalizeUpdateUserModule('authValid')
      }
    }

    if(this.props.auth.authType === 'deleteProfile') {
      if(this.props.modal.deleteProfile) {
        if(this.props.auth.status === 'authUserGoogleStart' && !this.state.initAuthStart) this.initAuthModule('authUserGoogle')
        if(this.props.auth.status === 'deleteAuthUserSuccess' && !this.state.initLocalDeleteUser) this.initLocalDeleteUserModule('initLocalDeleteUser')
        if(this.props.auth.status === 'deleteLocalUserSuccess' && !this.state.initClearUserInfo) this.initClearUserInfoModule('clearUserInfo')
        if(this.props.auth.status === 'clearUserInfo' && !this.props.user.info) this.props.onAuthUpdateStatus('clearUserInfoSuccess', true)
        if(this.props.auth.status === 'clearUserInfoSuccess' && !this.state.initClearUserQuestions) this.initClearUserQuestionsModule('initClearUserQuestions')
        if(this.props.auth.status === 'clearUserQuestions' && !this.props.user.questions) this.props.onAuthUpdateStatus('clearUserQuestionsSuccess', true)
        if(this.props.auth.status === 'clearUserQuestionsSuccess' && !this.state.initClearQuestionTotals) this.initClearQuestionTotalsModule('initClearQuestionTotals')
        if(this.props.auth.status === 'clearQuestionTotals' && !this.props.questions.totals) this.props.onAuthUpdateStatus('clearQuestionTotalsSuccess', true)
        if(this.props.auth.status === 'clearQuestionTotalsSuccess' && !this.state.initClearAuthCreds) this.initClearAuthCredsModule('initClearAuthCreds')
        if(this.props.auth.status === 'clearAuthCredsSuccess' && !this.state.authDeleteUserValid ) this.authFinalizeDeleteUser('authFinalizeDeleteUser')
      }
    }

    if(this.props.auth.status === 'authValid' && this.state.authLogInValid && this.props.modal.signup) {
      this.setState({ authLogInValid: false })
      this.props.onSignUpModal(false)
      this.props.history.push( routes.dashboard )
    }

    if(this.props.auth.status === 'authValid' && this.state.authLogInValid && this.props.modal.login) {
      this.setState({ authLogInValid: false })
      // this.props.onUpdateUserLoginTime({ time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
      this.props.onLogInModal(false)
      this.props.history.push( routes.dashboard )
    }

    if(this.state.authLogOutValid && this.props.modal.logout) {
      this.setState({ authLogOutValid: false })
      this.props.onLogOutModal(false)
      this.props.history.push( routes.home )
    }

    if(this.state.authDeleteUserValid && this.props.modal.deleteProfile) {
      this.setState({ authDeleteUserValid: false })
      this.props.onDeleteProfileModal(false)
      this.props.history.push( routes.home )
    }

  }

  componentWillUnmount(){
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  initAuthModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ initAuthStart: true })
  }

  refreshFailModule = () => {
    this.clearLocalStorage()
  }

  authUserLocalModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    if(this.props.auth.authType === 'refresh' || this.props.auth.authType === 'logIn') {
      this.props.onUpdateUserLoginTime({ uid: localStorage.id, time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
    }
    this.props.onAuthUser()
    this.setState({ initAuthStart: false, initAuthLocalUser: true })
  }

  authUserInfoLocalModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ authUserInfoLocal: true })
  }

  authUserQuestionsLocalModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ authUserQuestionsLocal: true })
  }

  authAchievementsModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.props.onStoreAchievements()
    this.setState({ initAuthLocalUser: false, authAchievements: true })
  }

  authQuestionsLocalModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.props.onGetQuestionTotals()
    this.setState({ initAuthQuestions: true })
  }

  authLogInValidModule = (status) => {
    this.setState({ authUserInfoLocal: false, authUserQuestionsLocal: false, authAchievements: false, initAuthQuestions: false, authLogInValid: true })
    this.props.onAuthUpdateStatus(status, true)
    this.props.onAuthUpdateLoadingStatus(false)
    this.props.onClearAuthType()
    localStorage.authValid = true
    // this.authWaitTimeoutQuarterSec = setTimeout(() => { this.props.onAuthUpdateLoadingStatus(false) }, 250)
    // this.authWaitTimeoutHalfSec = setTimeout(() => { this.props.onClearAuthType() }, 500)
  }

  authInitUserLogOutModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ initUserLogOut: true })
  }

  initClearUserInfoModule = (status) => {
    this.props.onClearUserInfo()
    this.setState({ initUserLogOut: false, initClearUserInfo: true })
  }

  initClearUserQuestionsModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.props.onClearUserQuestions()
    this.setState({ initClearUserInfo: false, initClearUserQuestions: true })
  }

  initClearQuestionTotalsModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.props.onClearQuestionTotals()
    this.setState({ initClearUserQuestions: false, initClearQuestionTotals: true })
  }

  initClearAuthCredsModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.props.onClearAuthCreds()
    this.setState({ initClearQuestionTotals: false, initClearAuthCreds: true })
  }

  authFinalizeLogOut = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ authLogInValid: false, initClearAuthCreds: false, authLogOutValid: true })
    this.props.onClearAchievements()

    // this.authWaitTimeoutQuarterSec = setTimeout(() => { this.props.onAuthUpdateLoadingStatus(false) }, 250)
    // this.authWaitTimeoutQuarterSec = setTimeout(() => { this.props.onAuthUpdateStatus(null, false) }, 250)

    this.authWaitTimeoutHalfSec = setTimeout(() => { this.props.onClearAuthType() }, 500)
    this.clearLocalStorage()
  }

  authUpdateUserModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ authUserUpdateValid: true })
  }

  authFinalizeUpdateUserModule = (status) => {
    this.setState({ authUserUpdateValid: false })
    this.props.onAuthUpdateStatus(status, true)
    this.authWaitTimeoutQuarterSec = setTimeout(() => { this.props.onAuthUpdateLoadingStatus(false) }, 250)
    this.authWaitTimeoutHalfSec = setTimeout(() => { this.props.onClearAuthType() }, 500)
    this.props.history.push( routes.dashboard_profile )
  }

  initLocalDeleteUserModule = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.props.onDeleteUser(this.props.auth.id)
    this.setState({ initAuthDeleteUser: false, initLocalDeleteUser: true })
  }

  authFinalizeDeleteUser = (status) => {
    this.props.onAuthUpdateStatus(status, true)
    this.setState({ authLogInValid: false, initClearAuthCreds: false, initLocalDeleteUser: false, authDeleteUserValid: true })
    this.props.onClearAchievements()

    // this.authWaitTimeoutQuarterSec = setTimeout(() => { this.props.onAuthUpdateLoadingStatus(false) }, 250)
    // this.authWaitTimeoutQuarterSec = setTimeout(() => { this.props.onAuthUpdateStatus(null, false) }, 250)

    this.authWaitTimeoutHalfSec = setTimeout(() => { this.props.onClearAuthType() }, 500)
    this.clearLocalStorage()
  }

  clearLocalStorage = () => {
    this.props.onAuthUpdateStatus('initClearLocalStorage', true)
    localStorage.clear()
    this.props.onAuthUpdateStatus('clearLocalStorageSuccess', true)
    localStorage.access = 'guest'
    this.props.onAuthUpdateStatus(null, false)
  }

  render(){
    return( <> { this.props.children } </> )
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    modal: state.modal,
    // play: state.play,
    achievements: state.achievements,
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // AUTH
    onAuthUpdateLoadingStatus: (bool) => dispatch(actions.authUpdateLoadingStatus(bool)),
    onAuthUpdateStatus: (status, loading) => dispatch(actions.authUpdateStatus(status, loading)),
    onAuthStart: (authType, obj, props) => dispatch(actions.authStart(authType, obj, props)),
    // onAuthSuccess: (token, refreshToken, id, expires) => dispatch(actions.authSuccess(token, refreshToken, id, expires)),
    // onAuthFail: (error) => dispatch(actions.authFail(error)),
    // onAuthLogIn: (email, password, props) => dispatch(actions.authLogIn(email, password, props)),
    // onAuthLogOut: (props) => dispatch(actions.authLogOut(props)),
    // onAuthRefresh: (obj) => dispatch(actions.authRefresh(obj)),
    onAuthUser: (token, refreshToken, id, expires) => dispatch(actions.authUser(token, refreshToken, id, expires)),
    // onAuthDelete: (obj) => dispatch(actions.authDelete(obj)),
    // onAuthTimeout: (time) => dispatch(actions.authTimeout(time)),
    // onAuthCert: (bool) => dispatch(actions.authCert(bool)),
    // onAuthValid: (bool) => dispatch(actions.authValid(bool)),
    // onAuthClearState: () => dispatch(actions.authClearState()),
    onClearAuthCreds: () => dispatch(actions.clearAuthCreds()),
    onClearAuthType: () => dispatch(actions.clearAuthType()),
    // onClearAuthStatus: () => dispatch(actions.clearAuthStatus()),
    // onSetAuthType: (authType) => dispatch(actions.setAuthType(authType)),
    // MODAL
    onLoadingModal: (bool) => dispatch(actions.loading(bool)),
    onLogInModal: (bool) => dispatch(actions.login(bool)),
    onLogOutModal: (bool) => dispatch(actions.logout(bool)),
    onSignUpModal: (bool) => dispatch(actions.signup(bool)),
    onDeleteProfileModal: (bool) => dispatch(actions.deleteProfile(bool)),
    // onShowModal: (bool) => dispatch(actions.showModal(bool)),
    // QUESTIONS
    // onStoreQuestionTotals: (totals) => dispatch(actions.storeQuestionTotals(totals)),
    onGetQuestionTotals: (props) => dispatch(actions.getQuestionTotals(props)),
    // onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    // onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    // onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
    onClearQuestionTotals: () => dispatch(actions.clearQuestionTotals()),
    // USER
    onUpdateUserLoginTime: (time) => dispatch(actions.updateUserLoginTime(time)),
    // onStoreUserInfo: (info) => dispatch(actions.storeUserInfo(info)),
    // onUpdateUserInfo: (obj, props) => dispatch(actions.updateUserInfo(obj, props)),
    onClearUserInfo: () => dispatch(actions.clearUserInfo()),
    // onStoreUserSettings: (settings) => dispatch(actions.storeUserSettings(settings)),
    // onUpdateUserSettings: (obj) => dispatch(actions.updateUserSettings(obj)),
    onClearUserSettings: () => dispatch(actions.clearUserSettings()),
    // onStoreUserQuestions: (questions) => dispatch(actions.storeUserQuestions(questions)),
    // onUpdateUserQuestions: () => dispatch(actions.updateUserInfo()),
    onClearUserQuestions: () => dispatch(actions.clearUserQuestions()),
    // onUpdateUserQuestionIdsFromPlayController: (ids) => dispatch(actions.updateUserQuestionIdsFromPlayController(ids)),
    onDeleteUser: (id) => dispatch(actions.deleteUser(id)),
    // ACHIEVEMENTS
    onStoreAchievements: () => dispatch(actions.storeAchievements()),
    onClearAchievements: () => dispatch(actions.clearAchievements())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthController)