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
  storeAchievements,
  clearAchievements
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
    clearUserInfo: false,
    clearUserQuestions: false,
    clearUserSettings: false,
    clearQuestionTotals: false,
    clearAchievements: false,
    clearAuthCreds: false,
    clearLocalStorage: false,
    logOutSuccess: false,
    deleteUserSuccess: false,
    updateUserSuccess: false,
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

    if(this.props.auth.authType === 'refresh') {

      if(this.props.auth.authType && !this.state.authGoogle) {
        this.setState({ authGoogle: true })
        this.props.onAuthUpdateStatus('authGoogle', true)
      }

      if(this.props.auth.id && !this.state.authUser) {
        this.setState({ authUser: true })
        this.props.onAuthUser()
        this.props.onAuthUpdateStatus('authUser', true)
      }

      if(this.props.user.info && !this.state.storeUserInfo) {
        this.setState({ storeUserInfo: true })
        this.props.onAuthUpdateStatus('storeUserInfo', true)
      }

      if(this.props.user.questions && !this.state.storeUserQuestions) {
        this.setState({ storeUserQuestions: true })
        this.props.onStoreAchievements()
        this.props.onAuthUpdateStatus('storeUserQuestions', true)
      }

      if(this.props.achievements.all && !this.state.storeAchievements) {
        this.setState({ storeAchievements: true })
        this.props.onGetQuestionTotals()
        this.props.onAuthUpdateStatus('storeAchievements', true)
      }

      if(this.props.questions.totals && !this.state.storeQuestionTotals) {
        this.setState({ storeQuestionTotals: true })
        this.props.onAuthUpdateStatus('storeQuestionTotals', true)
      }

      if(this.props.auth.status === 'storeQuestionTotals' && !this.state.authSuccess) {
        this.setState({ authSuccess: true })
        this.props.onAuthUpdateStatus('authSuccess', true)
      }

      if(this.props.auth.status === 'authSuccess' && this.state.authSuccess) {
        this.setState({
          authGoogle: false,
          authUser: false,
          storeUserInfo: false,
          storeUserQuestions: false,
          storeAchievements: false,
          storeQuestionTotals: false,
          authSuccess: false
        })
        this.props.onUpdateUserLoginTime({ time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
        localStorage.authValid = true
        this.props.onClearAuthType()
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.onAuthUpdateStatus('authValid', false)
      }

      if(this.props.auth.status === 'fail') {
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.onClearAuthStatus()
        this.clearLocalStorage()
        this.props.onClearAuthType()
      }
    }

    if(this.props.auth.authType === 'logIn') {
      if(this.props.auth.authType && !this.state.authGoogle) {
        this.setState({ authGoogle: true })
        this.props.onAuthUpdateStatus('authGoogle', true)
      }

      if(this.props.auth.id && !this.state.authUser) {
        this.setState({ authUser: true })
        this.props.onAuthUser()
        this.props.onAuthUpdateStatus('authUser', true)
      }

      if(this.props.user.info && !this.state.storeUserInfo) {
        this.setState({ storeUserInfo: true })
        this.props.onAuthUpdateStatus('storeUserInfo', true)
      }

      if(this.props.user.questions && !this.state.storeUserQuestions) {
        this.setState({ storeUserQuestions: true })
        this.props.onStoreAchievements()
        this.props.onAuthUpdateStatus('storeUserQuestions', true)
      }

      if(this.props.achievements.all && !this.state.storeAchievements) {
        this.setState({ storeAchievements: true })
        this.props.onGetQuestionTotals()
        this.props.onAuthUpdateStatus('storeAchievements', true)
      }

      if(this.props.questions.totals && !this.state.storeQuestionTotals) {
        this.setState({ storeQuestionTotals: true })
        this.props.onAuthUpdateStatus('storeQuestionTotals', true)
      }

      if(this.props.auth.status === 'storeQuestionTotals' && !this.state.authSuccess) {
        this.setState({ authSuccess: true })
        this.props.onAuthUpdateStatus('authSuccess', true)
      }

      if(this.props.auth.status === 'authSuccess' && this.state.authSuccess) {
        this.setState({
          authGoogle: false,
          authUser: false,
          storeUserInfo: false,
          storeUserQuestions: false,
          storeAchievements: false,
          storeQuestionTotals: false,
          authSuccess: false
        })
        this.props.onUpdateUserLoginTime({ time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
        localStorage.authValid = true
        this.props.onClearAuthType()
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.history.push( routes.dashboard )
        this.props.onAuthUpdateStatus('authValid', false)
      }

      if(this.props.auth.status === 'fail') {
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.onClearAuthStatus()
        this.clearLocalStorage()
        this.props.onClearAuthType()
      }
    }

    if(this.props.auth.authType === 'signUp') {
      if(this.props.auth.authType && !this.state.authGoogle) {
        this.setState({ authGoogle: true })
        this.props.onAuthUpdateStatus('authGoogle', true)
      }

      if(this.props.auth.id && !this.state.authUser) {
        this.setState({ authUser: true })
        this.props.onAuthUser()
        this.props.onAuthUpdateStatus('authUser', true)
      }

      if(this.props.user.info && !this.state.storeUserInfo) {
        this.setState({ storeUserInfo: true })
        this.props.onAuthUpdateStatus('storeUserInfo', true)
      }

      if(this.props.user.questions && !this.state.storeUserQuestions) {
        this.setState({ storeUserQuestions: true })
        this.props.onStoreAchievements()
        this.props.onAuthUpdateStatus('storeUserQuestions', true)
      }

      if(this.props.achievements.all && !this.state.storeAchievements) {
        this.setState({ storeAchievements: true })
        this.props.onGetQuestionTotals()
        this.props.onAuthUpdateStatus('storeAchievements', true)
      }

      if(this.props.questions.totals && !this.state.storeQuestionTotals) {
        this.setState({ storeQuestionTotals: true })
        this.props.onAuthUpdateStatus('storeQuestionTotals', true)
      }

      if(this.props.auth.status === 'storeQuestionTotals' && !this.state.authSuccess) {
        this.setState({ authSuccess: true })
        this.props.onAuthUpdateStatus('authSuccess', true)
      }

      if(this.props.auth.status === 'authSuccess' && this.state.authSuccess) {
        this.setState({
          authGoogle: false,
          authUser: false,
          storeUserInfo: false,
          storeUserQuestions: false,
          storeAchievements: false,
          storeQuestionTotals: false,
          authSuccess: false
        })
        this.props.onUpdateUserLoginTime({ time: getTime('now'), day: getTime('day'), month: getTime('month'), year: getTime('year') })
        localStorage.authValid = true
        this.props.onClearAuthType()
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.history.push( routes.dashboard )
        this.props.onAuthUpdateStatus('authValid', false)
      }

      if(this.props.auth.status === 'fail') {
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.onClearAuthStatus()
        this.clearLocalStorage()
        this.props.onClearAuthType()
      }
    }

    if(this.props.auth.authType === 'logOut') {
      if(this.props.user.info && !this.state.clearUserInfo) {
        this.setState({ clearUserInfo: true })
        this.props.onClearUserInfo()
        this.props.onAuthUpdateStatus('clearUserInfo', true)
      }

      if(!this.props.user.info && !this.state.clearUserQuestions) {
        this.setState({ clearUserQuestions: true })
        this.props.onClearUserQuestions()
        this.props.onAuthUpdateStatus('clearUserQuestions', true)
      }

      if(!this.props.user.questions && !this.state.clearUserSettings) {
        this.setState({ clearUserSettings: true })
        this.props.onClearUserSettings()
        this.props.onAuthUpdateStatus('clearUserSettings', true)
      }

      if(!this.props.user.settings && !this.state.clearQuestionTotals) {
        this.setState({ clearQuestionTotals: true })
        this.props.onClearQuestionTotals()
        this.props.onAuthUpdateStatus('clearQuestionTotals', true)
      }

      if(!this.props.questions.totals && !this.state.clearAchievements) {
        this.setState({ clearAchievements: true })
        this.props.onClearAchievements()
        this.props.onAuthUpdateStatus('clearAchievements', true)
      }

      if(!this.props.achievements.all && !this.state.clearAuthCreds) {
        this.setState({ clearAuthCreds: true })
        this.props.onClearAuthCreds()
        this.props.onAuthUpdateStatus('clearAuthCreds', true)
      }

      if(!this.props.auth.id && !this.state.clearLocalStorage) {
        this.setState({ clearLocalStorage: true })
        this.clearLocalStorage()
        this.props.onAuthUpdateStatus('clearLocalStorage', true)
        this.props.onLoadingModal(false)
        this.props.onLogOutModal(false)
        this.props.onClearAuthStatus()
      }

      if(!this.props.auth.id && !this.props.modal.loading && !this.state.logOutSuccess) {
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.history.push( routes.home )
        this.setState({
          clearUserInfo: false,
          clearUserQuestions: false,
          clearUserSettings: false,
          clearQuestionTotals: false,
          clearAchievements: false,
          clearAuthCreds: false,
          clearLocalStorage: false,
          logOutSuccess: true
        })
        this.props.onClearAuthType()
      }
    }

    if(this.props.auth.authType === 'editProfile') {

      if(this.props.auth.status === 'updateUserSuccess' && !this.state.updateUserSuccess){
        this.setState({ updateUserSuccess: true })
        this.props.onAuthUpdateStatus('authSuccess', true)
      }

      if(this.props.auth.status === 'authSuccess' && !this.state.authValid){
        this.setState({ updateUserSuccess: false, authValid: true })
        this.props.onClearAuthType()
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.history.push( routes.dashboard_profile )
        this.props.onAuthUpdateStatus('authValid', false)
      }
    }

    if(this.props.auth.authType === 'deleteProfile') {
      if(this.props.auth.authType && !this.state.authGoogle) {
        this.setState({ authGoogle: true })
        this.props.onAuthUpdateStatus('authGoogle', true)
      }

      if(this.props.auth.status === 'deleteAuthUserSuccess' && !this.state.deleteUser) {
        this.setState({ deleteUser: true })
        this.props.onDeleteUser(this.props.auth.id)
      }

      if(this.props.auth.status === 'deleteLocalUserSuccess' && !this.state.clearUserInfo) {
        this.setState({ clearUserInfo: true })
        this.props.onClearUserInfo()
        this.props.onAuthUpdateStatus('clearUserInfo', true)
      }

      if(!this.props.user.info && !this.state.clearUserQuestions) {
        this.setState({ clearUserQuestions: true })
        this.props.onClearUserQuestions()
        this.props.onAuthUpdateStatus('clearUserQuestions', true)
      }

      if(!this.props.user.questions && !this.state.clearUserSettings) {
        this.setState({ clearUserSettings: true })
        this.props.onClearUserSettings()
        this.props.onAuthUpdateStatus('clearUserSettings', true)
      }

      if(!this.props.user.settings && !this.state.clearQuestionTotals) {
        this.setState({ clearQuestionTotals: true })
        this.props.onClearQuestionTotals()
        this.props.onAuthUpdateStatus('clearQuestionTotals', true)
      }

      if(!this.props.questions.totals && !this.state.clearAchievements) {
        this.setState({ clearAchievements: true })
        this.props.onClearAchievements()
        this.props.onAuthUpdateStatus('clearAchievements', true)
      }

      if(!this.props.achievements.all && !this.state.clearAuthCreds) {
        this.setState({ clearAuthCreds: true })
        this.props.onClearAuthCreds()
        this.props.onAuthUpdateStatus('clearAuthCreds', true)
      }

      if(!this.props.auth.id && !this.state.clearLocalStorage) {
        this.setState({ clearLocalStorage: true })
        this.clearLocalStorage()
        this.props.onAuthUpdateStatus('clearLocalStorage', true)
        this.props.onLoadingModal(false)
        this.props.onDeleteProfileModal(false)
        this.props.onClearAuthStatus()
      }

      if(!this.props.auth.id && !this.props.modal.loading && !this.state.deleteUserSuccess) {
        this.props.onAuthUpdateLoadingStatus(false)
        this.props.history.push( routes.home )
        this.setState({
          clearUserInfo: false,
          clearUserQuestions: false,
          clearUserSettings: false,
          clearQuestionTotals: false,
          clearAchievements: false,
          clearAuthCreds: false,
          clearLocalStorage: false,
          deleteUserSuccess: true
        })
        this.props.onClearAuthType()
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
      // console.log(!!this.props.auth.authType, nextProps.modal.loading, this.props.auth.status, nextProps.auth.status)

      if(
        ((this.props.auth.authType === 'logOut' || this.props.auth.authType === 'deleteProfile')  && (this.props.auth.status !== nextProps.auth.status || !!this.props.auth.authType )) ||
        (this.props.auth.status === nextProps.auth.status || nextProps.auth.status === 'storeQuestionTotals' || nextProps.auth.status === 'authSuccess')
      ) {
        if(!!this.props.auth.authType && nextProps.auth.status === 'authSuccess') {
          // console.log(this.props.auth.authType, this.props.auth.status, nextProps.auth.status)
          this.authWaitTimeoutQuarterSec = setTimeout(() => {
            if(!!this.props.modal.loading) this.props.onLoadingModal(false)
            if(!!this.props.modal.login) this.props.onLogInModal(false)
            if(!!this.props.modal.signup) this.props.onSignUpModal(false)
          }, 250)
        }
        return true
      } else return false
  }

  componentWillUnmount(){
    clearTimeout(this.authWaitTimeoutQuarterSec)
    clearTimeout(this.authWaitTimeoutHalfSec)
    clearTimeout(this.authWaitTimeoutOneSec)
  }

  clearLocalStorage = () => {
    localStorage.clear()
    localStorage.access = 'guest'
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
    onStoreAchievements: () => dispatch(storeAchievements()),
    onClearAchievements: () => dispatch(clearAchievements())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthController)