import React from 'react'
import { connect } from 'react-redux'
import {
  getSmarts,
  clearSmartCache,
  authUpdateLoadingStatus,
  authUpdateStatus,
  authStart,
  authUser,
  authEditUser,
  clearAuthCreds,
  clearAuthType,
  clearAuthStatus,
  clearAuthStatus2,
  clearAuthErrors,
  loading,
  login,
  logout,
  signup,
  showModal,
  deleteProfile,
  editProfile,
  clearQuestionTotals,
  updateUserLoginTime,
  clearUserInfo,
  clearUserSettings,
  clearUserQuestions,
  deleteUser,
  updateUserInfo,
  storeUserInfo,
  storeUserQuestions,
  storeAchievements,
  storeQuestionTotals,
  clearAchievements,
  clearUserCache
} from '../actions/actionIndex'

import { routes } from '../../utility/paths'
import getTime from '../../utility/getTime'

import init from '../../firebase/init'
init.auth().useEmulator("http://localhost:8004")

class AuthController extends React.Component {

  state = {
    error: {},
    authUser: false,
    authEditUser: false,
    updateUser: false,
    deleteUser: false,
    storeUserInfo: false,
    storeUserQuestions: false,
    storeAchievements: false,
    storeQuestionTotals: false,
    authSuccess: false,
    authValid: false,
    authCleanup: false,
    clearUserInfo: false,
    clearUserQuestions: false,
    clearUserSettings: false,
    clearQuestionTotals: false,
    clearAchievements: false,
    clearAuthCreds: false,
    clearLocalStorage: false
  }

  componentDidMount(){
    if(!!localStorage.id) {
      this.props.onLoadingModal(true)
      init.auth().onAuthStateChanged((obj) => {
        if (obj && !!localStorage.id) {
          this.props.onAuthStart('refresh', {
            displayName: obj.displayName,
            id: obj.uid,
            email: obj.email,
            refresh: obj.refreshToken,
            token: obj.za,
            creationTime: obj.metadata.creationTime,
            lastSignInTime: obj.metadata.lastSignInTime,
            expires: "360000"
          })
        } else {
          if(this.props.modal.loading) this.props.onLoadingModal(false)
          this.clearLocalStorageModule()
          return "temp error 0293"
        }
      })
    }
  }

  componentDidUpdate(){

    if(this.props.auth.status === 'fail' && this.props.auth.loading)
    this.authFailModule()

    if(this.props.auth.authType === 'signUp' || this.props.auth.authType === 'logIn' ||this.props.auth.authType === 'refresh')
    this.authSignUpLogInRefreshGroup()

    if(this.props.auth.authType === 'logOut' || this.props.auth.authType === 'deleteProfile')
    this.authLogOutDeleteGroup(this.props.auth.authType)

    if(this.props.auth.authType === 'editProfileModal') {
      if(this.props.auth.status === 'reAuthWithCredsSuccess' && this.props.auth.userCache.info.email && !this.state.authEditUser) this.authEditUserModule()
      if((this.props.auth.status === 'updateAuthDisplayNameSuccess' && this.props.auth.userCache.old_user_name && !this.props.auth.userCache.old_email) && !this.state.updateUser) this.updateUserModule()
      if((this.props.auth.status === 'updateAuthEmailSuccess' && this.props.auth.userCache.old_email && !this.props.auth.userCache.old_user_name) && !this.state.updateUser) this.updateUserModule()
      if((this.props.auth.status === 'updateAuthDisplayNameSuccess' && this.props.auth.status2 === 'updateAuthEmailSuccess') && !this.state.updateUser) this.updateUserModule()
      if(this.props.auth.status === 'updateUserSuccess' && !this.state.updateUserSuccess) this.authSuccessModule()
      if(this.props.auth.status === 'authSuccess' && this.state.authSuccess) this.authValidModule()
    }

    if(this.props.auth.authType === 'editProfile') {
      if(this.props.auth.status === 'updateAuthDisplayNameSuccess' && this.props.auth.userCache.old_user_name && !this.state.updateUser) this.updateUserModule()
      if(this.props.auth.status === 'skipAuthUpdate' && this.props.auth.userCache && !this.state.updateUser) this.updateUserModule()
      if(this.props.auth.status === 'updateUserSuccess' && !this.state.updateUserSuccess) this.authSuccessModule()
      if(this.props.auth.status === 'authSuccess' && this.state.authSuccess) this.authValidModule()
    }
  }

  shouldComponentUpdate(nextProps){
    let render = false
    if(this.props.auth.loading || nextProps.auth.loading) render = true
    return render
  }

  componentWillUnmount(){
    this.props.onShowModal(false)
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  authSignUpLogInRefreshGroup = () => {
    if((this.props.auth.status === 'updateAuthDisplayNameSuccess' ||
        this.props.auth.status === 'authLogInSuccess' ||
        this.props.auth.status === 'authRefreshSuccess')
      && this.props.auth.id && localStorage.id &&!this.state.authUser) this.getSmartsModule()

    if(this.props.auth.smartCache && !this.state.storeUserInfo) this.storeUserInfoModule(this.props.auth.smartCache.user)
    if(this.props.auth.smartCache && this.props.user.info && !this.state.storeUserQuestions) this.storeUserQuestionsModule(this.props.auth.smartCache.user.questions)
    if(this.props.auth.smartCache && this.props.user.questions && !this.state.storeAchievements) this.storeAchievementsModule(this.props.auth.smartCache.achievements)
    if(this.props.auth.smartCache && this.props.achievements.all && !this.state.storeQuestionTotals) this.storeQuestionTotalsModule(this.props.auth.smartCache.questionTotals)
    if(this.props.user.info && this.props.questions.totals && this.props.achievements.all && !this.state.authSuccess) this.authSuccessModule()
    if(this.props.auth.status === 'authSuccess' && !this.state.authCleanup) this.authCleanupModule()
    if(this.props.auth.status === 'authCleanup' && !this.state.authValid) this.authValidModule()
  }

  authLogOutDeleteGroup = (authType) => {
    if(authType === 'logOut' && this.props.user.info && !this.state.clearUserInfo) this.clearUserInfoModule()
    if(this.props.auth.status === 'deleteAuthUserSuccess' && !this.state.deleteUser) this.authDeleteUserModule()
    if(this.props.auth.status === 'deleteLocalUserSuccess' && this.props.user.info && !this.state.clearUserInfo) this.clearUserInfoModule()

    if(!this.props.user.info && !this.state.clearUserQuestions) this.clearUserQuestionsModule()
    if(!this.props.user.questions && !this.state.clearUserSettings) this.clearUserSettingsModule()
    if(!this.props.user.settings && !this.state.clearQuestionTotals) this.clearQuestionTotalsModule()
    if(!this.props.questions.totals && !this.state.clearAchievements) this.clearAchievementsModule()
    if(!this.props.achievements.all && !this.state.clearAuthCreds) this.clearAuthCredsModule()
    if(!this.props.auth.id && !this.state.clearLocalStorage) this.authFinalizeLogOutModule()
    if(this.props.auth.status === 'authSuccess' && !this.props.modal[`${authType}`]) this.authRedirectModule(authType)
  }

  authFailModule = () => {
    this.props.onAuthUpdateLoadingStatus(false)
    this.clearLocalStorageModule()
  }

  getSmartsModule = () => {
    this.props.onAuthUpdateStatus('getSmarts')
    this.setState({ authUser: true })
    this.props.onGetSmarts()
  }

  authUserModule = () => {
    this.props.onAuthUpdateStatus('authUser')
    this.setState({ authUser: true })
    this.props.onAuthUser()
  }

  authEditUserModule = () => {
    this.props.onAuthUpdateStatus('authEditUser')
    this.setState({ authEditUser: true })
    this.props.onAuthEditUser('authEditUser', this.props.auth.userCache)
  }

  updateUserModule = () => {
    this.props.onAuthUpdateStatus('updateUser')
    this.setState({ updateUser: true })
    this.props.onUpdateUserInfo('editProfile', this.props.auth.userCache)
  }

  storeUserInfoModule = (cache) => {
    this.props.onAuthUpdateStatus('storeUserInfo')
    this.setState({ storeUserInfo: true })
    this.props.onStoreUserInfo(cache.info, cache.experience, cache.achievements, cache.settings)
  }

  storeUserQuestionsModule = (questions) => {
    this.props.onAuthUpdateStatus('storeUserQuestions')
    this.setState({ storeUserQuestions: true })
    this.props.onStoreUserQuestions(questions)
  }

  storeAchievementsModule = (achievements) => {
    this.props.onAuthUpdateStatus('storeAchievements')
    this.setState({ storeAchievements: true })
    this.props.onStoreAchievements(achievements)
  }

  storeQuestionTotalsModule = (totals) => {
    this.props.onAuthUpdateStatus('storeQuestionTotals')
    this.setState({ storeQuestionTotals: true })
    this.props.onStoreQuestionTotals(totals)
  }

  authSuccessModule = () => {
    this.props.onAuthUpdateStatus('authSuccess')
    this.setState({ authSuccess: true })
  }

  authCleanupModule = () => {
    this.props.onAuthUpdateStatus('authCleanup')
    this.setState({ authCleanup: true })

    if(
      this.props.auth.authType === 'signUp' ||
      this.props.auth.authType === 'logIn' ||
      this.props.auth.authType === 'refresh'
    ) this.props.onUpdateUserLoginTime({ uid: this.props.auth.id, time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
  }

  authValidModule = () => {
    this.props.onAuthUpdateStatus('authValid')
    this.setState({ authValid: true })
    localStorage.authValid = true

    if(this.props.auth.authType === 'editProfile' || this.props.auth.authType === 'editProfileModal') this.props.history.push( routes.dashboard_profile )
    if(!!this.props.modal.loading) this.props.onLoadingModal(false)
    if(!!this.props.modal.login) this.props.onLogInModal(false)
    if(!!this.props.modal.signup) this.props.onSignUpModal(false)
    if(!!this.props.modal.deleteProfile) this.props.onDeleteProfileModal(false)
    if(!!this.props.modal.editProfile) this.props.onEditProfileModal(false)
    this.props.onAuthUpdateLoadingStatus(false)

    if(this.props.auth.errors.length) this.props.onClearAuthErrors()
    if(this.props.auth.status2) this.props.onClearAuthStatus2()
    if(this.props.auth.userCache) this.props.onClearUserCache()
    if(this.props.auth.smartCache) this.props.onClearSmartCache()
    this.authRedirectModule(this.props.auth.authType)
    if(this.props.auth.authType) this.props.onClearAuthType()
  }

  authFinalizeLogOutModule = () => {
    this.setState({ clearLocalStorage: true })
    this.props.onAuthUpdateStatus('authSuccess')
    this.clearLocalStorageModule()
    if(!!this.props.modal.loading) this.props.onLoadingModal(false)
    if(!!this.props.modal.logout) this.props.onLogOutModal(false)
    if(!!this.props.modal.deleteProfile) this.props.onDeleteProfileModal(false)
  }

  authRedirectModule = (authType) => {
    // this.props.onRedirect(authType)
    if(authType === 'signUp') {
      this.props.history.push( routes.home )
    }
    if(authType === 'deleteProfile' || authType === 'logOut') {
      this.props.history.push( routes.home )
      this.props.onClearAuthStatus()
      this.props.onClearAuthType()
      this.props.onAuthUpdateLoadingStatus(false)
    }
    this.clearLocalStateModule()
  }

  authDeleteUserModule = () => {
    this.setState({ deleteUser: true })
    this.props.onDeleteUser(this.props.auth.id)
  }

  clearLocalStorageModule = () => {
    localStorage.clear()
    localStorage.access = 'guest'
  }

  clearLocalStateModule = () => {
    this.setState({
      // error: {},
      authUser: false,
      authEditUser: false,
      updateUser: false,
      deleteUser: false,
      storeUserInfo: false,
      storeUserQuestions: false,
      storeAchievements: false,
      storeQuestionTotals: false,
      authSuccess: false,
      authValid: false,
      authCleanup: false,
      clearUserInfo: false,
      clearUserQuestions: false,
      clearUserSettings: false,
      clearQuestionTotals: false,
      clearAchievements: false,
      clearAuthCreds: false,
      clearLocalStorage: false
    })
  }

  clearUserInfoModule = () => {
    this.setState({ clearUserInfo: true })
    this.props.onClearUserInfo()
    this.props.onAuthUpdateStatus('clearUserInfo', true)
  }

  clearUserQuestionsModule = () => {
    this.setState({ clearUserQuestions: true })
    this.props.onClearUserQuestions()
    this.props.onAuthUpdateStatus('clearUserQuestions', true)
  }

  clearUserSettingsModule = () => {
    this.setState({ clearUserSettings: true })
    this.props.onClearUserSettings()
    this.props.onAuthUpdateStatus('clearUserSettings', true)
  }

  clearQuestionTotalsModule = () => {
    this.setState({ clearQuestionTotals: true })
    this.props.onClearQuestionTotals()
    this.props.onAuthUpdateStatus('clearQuestionTotals', true)
  }

  clearAchievementsModule = () => {
    this.setState({ clearAchievements: true })
    this.props.onClearAchievements()
    this.props.onAuthUpdateStatus('clearAchievements', true)
  }

  clearAuthCredsModule = () => {
    this.setState({ clearAuthCreds: true })
    this.props.onClearAuthCreds()
    this.props.onAuthUpdateStatus('clearAuthCreds', true)
  }

  render(){ return <></> }
}

const store = store => {
  return{
    auth: store.auth,
    modal: store.modal,
    achievements: store.achievements,
    questions: store.questions,
    user: store.user
  }
}

const dispatch = dispatch => {
  return {
    onGetSmarts: () => dispatch(getSmarts()),
    onClearSmartCache: () => dispatch(clearSmartCache()),
    onAuthUpdateLoadingStatus: (bool) => dispatch(authUpdateLoadingStatus(bool)),
    onAuthUpdateStatus: (status) => dispatch(authUpdateStatus(status)),
    onAuthStart: (authType, obj, props) => dispatch(authStart(authType, obj, props)),
    onAuthUser: (token, refreshToken, id, expires) => dispatch(authUser(token, refreshToken, id, expires)),
    onAuthEditUser: (authType, obj) => dispatch(authEditUser(authType, obj)),
    onClearAuthCreds: () => dispatch(clearAuthCreds()),
    onClearAuthType: () => dispatch(clearAuthType()),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthStatus2: () => dispatch(clearAuthStatus2()),
    onClearAuthErrors: () => dispatch(clearAuthErrors()),
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onLogInModal: (bool) => dispatch(login(bool)),
    onLogOutModal: (bool) => dispatch(logout(bool)),
    onSignUpModal: (bool) => dispatch(signup(bool)),
    onShowModal: (bool) => dispatch(showModal(bool)),
    onEditProfileModal: (bool) => dispatch(editProfile(bool)),
    onDeleteProfileModal: (bool) => dispatch(deleteProfile(bool)),
    onStoreQuestionTotals: (totals) => dispatch(storeQuestionTotals(totals)),
    onClearQuestionTotals: () => dispatch(clearQuestionTotals()),
    onUpdateUserLoginTime: (time) => dispatch(updateUserLoginTime(time)),
    onClearUserInfo: () => dispatch(clearUserInfo()),
    onClearUserSettings: () => dispatch(clearUserSettings()),
    onClearUserQuestions: () => dispatch(clearUserQuestions()),
    onDeleteUser: (id) => dispatch(deleteUser(id)),
    onUpdateUserInfo: (authType, obj) => dispatch(updateUserInfo(authType, obj)),
    onStoreUserInfo: (info, experience, achievements, settings) => dispatch(storeUserInfo(info, experience, achievements, settings)),
    onStoreUserQuestions: (questions) => dispatch(storeUserQuestions(questions)),
    onStoreAchievements: (achievements) => dispatch(storeAchievements(achievements)),
    onClearAchievements: () => dispatch(clearAchievements()),
    onClearUserCache: () => dispatch(clearUserCache())
  }
}

export default connect(store, dispatch)(AuthController)