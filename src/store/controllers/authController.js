import React from 'react'
import { withRouter } from 'react-router-dom'
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
          if(this.props.modalLoading) this.props.onLoadingModal(false)
          this.clearLocalStorageModule()
          return "temp error 0293"
        }
      })
    }
  }

  componentDidUpdate(){

    if(this.props.authStatus === 'fail' && this.props.authLoading)
    this.authFailModule()

    if(this.props.authType === 'signUp' || this.props.authType === 'logIn' ||this.props.authType === 'refresh')
    this.authSignUpLogInRefreshGroup()

    if(this.props.authType === 'logOut' || this.props.authType === 'deleteProfile')
    this.authLogOutDeleteGroup(this.props.authType)

    if(this.props.authType === 'editProfileModal') {
      if(this.props.authStatus === 'reAuthWithCredsSuccess' && this.props.authUserCache.info.email && !this.state.authEditUser) this.authEditUserModule()
      if((this.props.authStatus === 'updateAuthDisplayNameSuccess' && this.props.authUserCache.old_user_name && !this.props.authUserCache.old_email) && !this.state.updateUser) this.updateUserModule()
      if((this.props.authStatus === 'updateAuthEmailSuccess' && this.props.authUserCache.old_email && !this.props.authUserCache.old_user_name) && !this.state.updateUser) this.updateUserModule()
      if((this.props.authStatus === 'updateAuthDisplayNameSuccess' && this.props.authStatus2 === 'updateAuthEmailSuccess') && !this.state.updateUser) this.updateUserModule()
      if(this.props.authStatus === 'updateUserSuccess' && !this.state.updateUserSuccess) this.authSuccessModule()
      if(this.props.authStatus === 'authSuccess' && this.state.authSuccess) this.authValidModule()
    }

    if(this.props.authType === 'editProfile') {
      if(this.props.authStatus === 'updateAuthDisplayNameSuccess' && this.props.authUserCache.old_user_name && !this.state.updateUser) this.updateUserModule()
      if(this.props.authStatus === 'skipAuthUpdate' && this.props.authUserCache && !this.state.updateUser) this.updateUserModule()
      if(this.props.authStatus === 'updateUserSuccess' && !this.state.updateUserSuccess) this.authSuccessModule()
      if(this.props.authStatus === 'authSuccess' && this.state.authSuccess) this.authValidModule()
    }
  }

  shouldComponentUpdate(nextProps){
    let render = false
    if(this.props.authLoading || nextProps.authLoading) render = true
    return render
  }

  componentWillUnmount(){
    this.props.onShowModal(false)
  }

  authSignUpLogInRefreshGroup = () => {
    if((this.props.authStatus === 'updateAuthDisplayNameSuccess' ||
        this.props.authStatus === 'authLogInSuccess' ||
        this.props.authStatus === 'authRefreshSuccess')
      && this.props.authId && localStorage.id &&!this.state.authUser) this.getSmartsModule()

    if(this.props.authSmartCache && !this.state.storeUserInfo) this.storeUserInfoModule(this.props.authSmartCache.user)
    if(this.props.authSmartCache && this.props.userInfo && !this.state.storeUserQuestions) this.storeUserQuestionsModule(this.props.authSmartCache.user.questions)
    if(this.props.authSmartCache && this.props.userQuestions && !this.state.storeAchievements) this.storeAchievementsModule(this.props.authSmartCache.achievements)
    if(this.props.authSmartCache && this.props.allAchievements && !this.state.storeQuestionTotals) this.storeQuestionTotalsModule(this.props.authSmartCache.questionTotals)
    if(this.props.userInfo && this.props.questionTotals && this.props.allAchievements && !this.state.authSuccess) this.authSuccessModule()
    if(this.props.authStatus === 'authSuccess' && !this.state.authCleanup) this.authCleanupModule()
    if(this.props.authStatus === 'authCleanup' && !this.state.authValid) this.authValidModule()
  }

  authLogOutDeleteGroup = (authType) => {
    const formatAuthType = 'modal' + authType[0].toUpperCase() + authType.slice(1, authType.length)
    if(authType === 'logOut' && this.props.userInfo && !this.state.clearUserInfo) this.clearUserInfoModule()
    if(this.props.authStatus === 'deleteAuthUserSuccess' && !this.state.deleteUser) this.authDeleteUserModule()
    if(this.props.authStatus === 'deleteLocalUserSuccess' && this.props.userInfo && !this.state.clearUserInfo) this.clearUserInfoModule()
    if(!this.props.userInfo && !this.state.clearUserQuestions) this.clearUserQuestionsModule()
    if(!this.props.userQuestions && !this.state.clearUserSettings) this.clearUserSettingsModule()
    if(!this.props.userSettings && !this.state.clearQuestionTotals) this.clearQuestionTotalsModule()
    if(!this.props.questionTotals && !this.state.clearAchievements) this.clearAchievementsModule()
    if(!this.props.allAchievements && !this.state.clearAuthCreds) this.clearAuthCredsModule()
    if(!this.props.authId && !this.state.clearLocalStorage) this.authFinalizeLogOutModule()
    if(this.props.authStatus === 'authSuccess' && !this.props[formatAuthType]) this.authRedirectModule(authType)

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
    this.props.onAuthEditUser('authEditUser', this.props.authUserCache)
  }

  updateUserModule = () => {
    this.props.onAuthUpdateStatus('updateUser')
    this.setState({ updateUser: true })
    this.props.onUpdateUserInfo('editProfile', this.props.authUserCache)
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
      (this.props.authType === 'signUp' ||
      this.props.authType === 'logIn' ||
      this.props.authType === 'refresh')
    ) this.props.onUpdateUserLoginTime({ uid: this.props.authId, time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
  }

  authValidModule = () => {
    this.props.onAuthUpdateStatus('authValid')
    this.setState({ authValid: true })
    localStorage.authValid = true

    if(this.props.authType === 'editProfile' || this.props.authType === 'editProfileModal') this.props.history.push( routes.dashboard_profile )
    if(!!this.props.modalLoading) this.props.onLoadingModal(false)
    if(!!this.props.modalLogIn) this.props.onLogInModal(false)
    if(!!this.props.modalSignUp) this.props.onSignUpModal(false)
    if(!!this.props.modalDeleteProfile) this.props.onDeleteProfileModal(false)
    if(!!this.props.modalEditProfile) this.props.onEditProfileModal(false)
    this.props.onAuthUpdateLoadingStatus(false)

    if(this.props.authErrors.length) this.props.onClearAuthErrors()
    if(this.props.authStatus2) this.props.onClearAuthStatus2()
    if(this.props.authUserCache) this.props.onClearUserCache()
    if(this.props.authSmartCache) this.props.onClearSmartCache()
    this.authRedirectModule(this.props.authType)
    if(this.props.authType) this.props.onClearAuthType()
  }

  authFinalizeLogOutModule = () => {
    this.setState({ clearLocalStorage: true })
    this.props.onAuthUpdateStatus('authSuccess')
    this.clearLocalStorageModule()
    if(!!this.props.modalLoading) this.props.onLoadingModal(false)
    if(!!this.props.modalLogOut) this.props.onLogOutModal(false)
    if(!!this.props.modalDeleteProfile) this.props.onDeleteProfileModal(false)
  }

  authRedirectModule = (authType) => {
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
    this.props.onDeleteUser(this.props.authId)
  }

  clearLocalStorageModule = () => {
    localStorage.clear()
    localStorage.access = 'guest'
  }

  clearLocalStateModule = () => {
    this.setState({
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
    authErrors: store.auth.errors,
    authId: store.auth.id,
    authLoading: store.auth.loading,
    authSmartCache: store.auth.smartCache,
    authStatus: store.auth.status,
    authStatus2: store.auth.status2,
    authUserCache: store.auth.userCache,
    authType: store.auth.authType,
    modalLoading: store.modal.loading,
    modalLogIn: store.modal.login,
    modalLogOut: store.modal.logout,
    modalSignUp: store.modal.signup,
    modalDeleteProfile: store.modal.deleteProfile,
    modalEditProfile: store.modal.editProfile,
    allAchievements: store.achievements.all,
    questionTotals: store.questions.totals,
    userInfo: store.user.info,
    userQuestions: store.user.questions,
    userSettings: store.user.settings,
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

export default withRouter(connect(store, dispatch)(AuthController))