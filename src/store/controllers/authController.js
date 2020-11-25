import React from 'react'
import { connect } from 'react-redux'
import {
  authUpdateLoadingStatus,
  authUpdateStatus,
  authStart,
  authUser,
  clearAuthCreds,
  clearAuthType,
  clearAuthStatus,
  loading,
  login,
  logout,
  signup,
  deleteProfile,
  getQuestionTotals,
  clearQuestionTotals,
  updateUserLoginTime,
  clearUserInfo,
  clearUserSettings,
  clearUserQuestions,
  deleteUser,
  storeUserInfo,
  storeUserQuestions,
  storeAchievements,
  clearAchievements,
  clearUserCache
} from '../actions/actionIndex'
import { routes } from '../../utility/paths'
import getTime from '../../utility/getTime'

class AuthController extends React.Component {

  state = {
    authGoogle: false,
    authUser: false,
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
    if (!localStorage.token) this.clearLocalStorageModule()
    else {
      this.props.onLoadingModal(true)
      this.props.onAuthStart('refresh', { grant_type: "refresh_token", refresh_token: localStorage.refreshToken })
    }
  }

  componentDidUpdate(){
    if(this.props.auth.authType === 'refresh' || this.props.auth.authType === 'logIn' || this.props.auth.authType === 'signUp') this.loginRefreshSignUpGroup()

    if(this.props.auth.authType === 'editProfile') {
      if(this.props.auth.status === 'updateUserSuccess' && !this.state.authSuccess){
        this.setState({ authSuccess: true })
        this.props.onAuthUpdateStatus('authSuccess', true)
      }
      if(this.props.auth.status === 'authSuccess' && this.state.authSuccess) this.authValidModule('editProfile')
    }

    if(this.props.auth.authType === 'logOut') {
      if(this.props.user.info && !this.state.clearUserInfo) this.clearUserInfoModule()
      if(!this.props.user.info && !this.state.clearUserQuestions) this.clearUserQuestionsModule()
      if(!this.props.user.questions && !this.state.clearUserSettings) this.clearUserSettingsModule()
      if(!this.props.user.settings && !this.state.clearQuestionTotals) this.clearQuestionTotalsModule()
      if(!this.props.questions.totals && !this.state.clearAchievements) this.clearAchievementsModule()
      if(!this.props.achievements.all && !this.state.clearAuthCreds) this.clearAuthCredsModule()
      if(!this.props.auth.id && !this.state.clearLocalStorage) this.authFinalizeLogOutModule()
      if(this.props.auth.status === 'authSuccess' && !this.props.modal.logout) this.authRedirectModule('logOut')

    }

    if(this.props.auth.authType === 'deleteProfile') {
      if(this.props.auth.authType && !this.state.authGoogle) this.authGoogleModule()
      if(this.props.auth.status === 'deleteAuthUserSuccess' && !this.state.deleteUser) this.authDeleteUserModule()
      if(this.props.auth.status === 'deleteLocalUserSuccess' && !this.state.clearUserInfo) this.clearUserInfoModule()
      if(!this.props.user.info && !this.state.clearUserQuestions) this.clearUserQuestionsModule()
      if(!this.props.user.questions && !this.state.clearUserSettings) this.clearUserSettingsModule()
      if(!this.props.user.settings && !this.state.clearQuestionTotals) this.clearQuestionTotalsModule()
      if(!this.props.questions.totals && !this.state.clearAchievements) this.clearAchievementsModule()
      if(!this.props.achievements.all && !this.state.clearAuthCreds) this.clearAuthCredsModule()
      if(!this.props.auth.id && !this.state.clearLocalStorage) this.authFinalizeLogOutModule()
      if(this.props.auth.status === 'authSuccess' && !this.props.modal.deleteProfile) this.authRedirectModule('deleteProfile')
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
    // console.log(!!this.props.auth.authType, nextProps.modal.loading, this.props.auth.status, nextProps.auth.status)

    // console.log(
    //   this.props.auth.authType, nextProps.auth.authType, "|",
    //   this.props.auth.status, nextProps.auth.status, "|",
    //   this.props.auth.loading, nextProps.auth.loading, "|",
    //   this.props.modal.logout, nextProps.modal.logout, "|",
    //   this.state.authCleanup, nextState.authCleanup, "|",
    //   this.props.modal.login, nextProps.modal.logout
    // )

    // let render = false

    // if(this.props.auth.status === "authValid" || this.props.auth.status === "clearAuthCreds") {
    //   if(this.props.modal.loading || nextProps.modal.loading ||this.props.auth.loading || nextProps.auth.loading) {
    //     render = true
    //   }
    // }

    // if(this.props.auth.authType === 'refresh') {
    //   render = true
    // }

    // if(nextProps.modal.login) {
    //   render = true
    // }

    // if(nextProps.modal.signup) {
    //   render = true
    // }

    // if(nextProps.modal.logout) {
    //   render = true
    // }

    // if(nextProps.modal.deleteProfile) {
    //   render = true
    // }

    // return render
  //   return true
  // }

  componentWillUnmount(){
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  authFailModule = () => {
    this.props.onAuthUpdateLoadingStatus(false)
    this.props.onClearAuthStatus()
    this.clearLocalStorageModule()
    this.props.onClearAuthType()
  }

  authGoogleModule = () => {
    if(this.props.auth.authType && !this.state.authGoogle) {
      this.props.onAuthUpdateStatus('authGoogle')
      this.setState({ authGoogle: true })
    }
  }

  loginRefreshSignUpGroup = () => {
    if(this.props.auth.status === 'fail') this.authFailModule()
    if(this.props.auth.authType && !this.state.authGoogle) this.authGoogleModule()
    if(this.props.auth.id && !this.state.authUser) this.authUserModule()
    if(this.props.auth.userCache && !this.state.storeUserInfo) this.storeUserInfoModule(this.props.auth.userCache)
    if(this.props.user.info && !this.state.storeUserQuestions) this.storeUserQuestionsModule(this.props.auth.userCache.questions)
    if(this.props.user.questions && !this.state.storeAchievements) this.storeAchievementsModule()
    if(this.props.achievements.all && !this.state.storeQuestionTotals) this.storeQuestionTotalsModule()
    if(this.props.questions.totals && !this.state.authSuccess) this.authSuccessModule()
    if(this.props.auth.status === 'authSuccess' && !this.state.authCleanup) this.authCleanupModule()
    if(this.props.auth.status === 'authCleanup' && !this.state.authValid) this.authValidModule()
  }

  authUserModule = () => {
    this.props.onAuthUpdateStatus('authUser')
    this.setState({ authUser: true })
    this.props.onAuthUser()
  }

  storeUserInfoModule = (userCache) => {
    this.props.onAuthUpdateStatus('storeUserInfo')
    this.setState({ storeUserInfo: true })
    this.props.onStoreUserInfo(userCache.info, userCache.experience, userCache.achievements, userCache.settings)
  }

  storeUserQuestionsModule = (questions) => {
    this.props.onAuthUpdateStatus('storeUserQuestions')
    this.setState({ storeUserQuestions: true })
    this.props.onStoreUserQuestions(questions)
  }

  storeAchievementsModule = () => {
    this.props.onAuthUpdateStatus('storeAchievements')
    this.setState({ storeAchievements: true })
    this.props.onStoreAchievements()
  }

  storeQuestionTotalsModule = () => {
    this.props.onAuthUpdateStatus('storeQuestionTotals')
    this.setState({ storeQuestionTotals: true })
    this.props.onGetQuestionTotals()
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
    ) this.props.onUpdateUserLoginTime({ time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
  }

  authValidModule = () => {
    this.props.onAuthUpdateStatus('authValid')
    this.setState({ authValid: true })

    if(
      this.props.auth.authType === 'signUp' ||
      this.props.auth.authType === 'logIn'
    ) this.props.history.push( routes.dashboard )

    if(this.props.auth.authType === 'editProfile') this.props.history.push( routes.dashboard_profile )

    this.authWaitTimeoutQuarterSec = setTimeout(() => {
      if(!!this.props.modal.loading) this.props.onLoadingModal(false)
      if(!!this.props.modal.login) this.props.onLogInModal(false)
      if(!!this.props.modal.signup) this.props.onSignUpModal(false)
      if(!!this.props.modal.deleteProfile) this.props.onDeleteProfileModal(false)

      this.props.onAuthUpdateLoadingStatus(false)
    }, 250)

    localStorage.authValid = true
    this.props.onClearUserCache()
    this.props.onClearAuthType()
    this.clearLocalStateModule()
  }

  authFinalizeLogOutModule = () => {
    this.setState({ clearLocalStorage: true })
    this.props.onAuthUpdateStatus('authSuccess')
    this.clearLocalStorageModule()
    this.authWaitTimeoutQuarterSec = setTimeout(() => {
      if(!!this.props.modal.loading) this.props.onLoadingModal(false)
      if(!!this.props.modal.logout) this.props.onLogOutModal(false)
      if(!!this.props.modal.deleteProfile) this.props.onDeleteProfileModal(false)
    }, 250)
  }

  authRedirectModule = (authType) => {
    this.props.onRedirect(authType)
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
      authGoogle: false,
      authUser: false,
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

  render(){ return <>{ this.props.children }</> }
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    modal: state.modal,
    achievements: state.achievements,
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthUpdateLoadingStatus: (bool) => dispatch(authUpdateLoadingStatus(bool)),
    onAuthUpdateStatus: (status, loading) => dispatch(authUpdateStatus(status, loading)),
    onAuthStart: (authType, obj, props) => dispatch(authStart(authType, obj, props)),
    onAuthUser: (token, refreshToken, id, expires) => dispatch(authUser(token, refreshToken, id, expires)),
    onClearAuthCreds: () => dispatch(clearAuthCreds()),
    onClearAuthType: () => dispatch(clearAuthType()),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onLogInModal: (bool) => dispatch(login(bool)),
    onLogOutModal: (bool) => dispatch(logout(bool)),
    onSignUpModal: (bool) => dispatch(signup(bool)),
    onDeleteProfileModal: (bool) => dispatch(deleteProfile(bool)),
    onGetQuestionTotals: (props) => dispatch(getQuestionTotals(props)),
    onClearQuestionTotals: () => dispatch(clearQuestionTotals()),
    onUpdateUserLoginTime: (time) => dispatch(updateUserLoginTime(time)),
    onClearUserInfo: () => dispatch(clearUserInfo()),
    onClearUserSettings: () => dispatch(clearUserSettings()),
    onClearUserQuestions: () => dispatch(clearUserQuestions()),
    onDeleteUser: (id) => dispatch(deleteUser(id)),
    onStoreUserInfo: (info, experience, achievements, settings) => dispatch(storeUserInfo(info, experience, achievements, settings)),
    onStoreUserQuestions: (questions) => dispatch(storeUserQuestions(questions)),
    onStoreAchievements: () => dispatch(storeAchievements()),
    onClearAchievements: () => dispatch(clearAchievements()),
    onClearUserCache: () => dispatch(clearUserCache())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthController)