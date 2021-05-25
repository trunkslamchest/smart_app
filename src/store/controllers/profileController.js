import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  loading,
  setLoadingModalType,
  getSmarts,
  storeUserProfile,
  storeQuestionTotals,
  storeAchievements,
  clearSmartCache,
  clearUserProfile,
  clearQuestionTotals,
  clearAchievements,
  updateUserProfileStatus,
  updateUserProfileLoadingStatus,
} from '../../store/actions/actionIndex'

import UserProfileContainer from '../../user/profile/userProfileContainer'

class ProfileController extends React.Component {

  state = {
    user_name: '',
    displayProfile: false
  }

  componentDidMount() {
    let parseLocation = this.props.history.location.pathname.split("/")
    let user_name = parseLocation[parseLocation.length - 1]
    document.title = `SmartApp™ | ${ user_name }'s Profile`
    this.setState({ user_name: user_name })
    if(!this.props.profileStatus && !this.props.profileData) this.initProfileModule()
  }

  componentDidUpdate() {
    if(this.props.profileStatus === 'initUserProfile' && !this.props.profileData) this.getSmartsModule()
    if(this.props.smartCache && this.props.profileStatus === 'getSmarts' && !this.props.profileData) this.storeUserProfileModule(this.props.smartCache.user)
    if(this.props.smartCache && this.props.profileStatus === 'storeUserData' && !this.props.questionTotals) this.storeQuestionTotalsModule(this.props.smartCache.questionTotals)
    if(this.props.smartCache && this.props.profileStatus === 'storeQuestionTotals' && this.props.questionTotals && !this.props.achievements) this.storeAchievementsModule(this.props.smartCache.achievements)
    if(this.props.smartCache && this.props.profileData && this.props.questionTotals && this.props.achievements && !this.state.displayProfile) this.displayProfileModule()
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false
    if(this.props.loadingModal || this.props.profileLoading ||
      nextProps.loadingModal || nextProps.profileLoading ) {
      render = true
    }
    return render
  }

  componentWillUnmount() {
    this.props.onUpdateUserProfileStatus(null)
    this.props.onClearUserProfile()
    this.setState({ user_name: '', displayProfile: false })
  }

  initProfileModule = () => {
    this.props.onLoadingModal(true)
    this.props.onSetLoadingModalType('userProfile', 'userProfile')
    this.props.onUpdateUserProfileLoadingStatus(true)
    this.props.onUpdateUserProfileStatus('initUserProfile')
  }

  getSmartsModule = () => {
    this.props.onUpdateUserProfileStatus('getSmarts')
    this.props.onGetSmarts(this.state.user_name)
  }

  storeUserProfileModule = (userData) => {
    this.props.onUpdateUserProfileStatus('storeUserData')
    this.props.onStoreUserProfile(userData)
  }

  storeQuestionTotalsModule = (questionTotals) => {
    this.props.onUpdateUserProfileStatus('storeQuestionTotals')
    this.props.onStoreQuestionTotals(questionTotals)
  }

  storeAchievementsModule = (achievements) => {
    this.props.onUpdateUserProfileStatus('storeAchievements')
    this.props.onStoreAchievements(achievements)
  }

  displayProfileModule = () => {
    this.props.onUpdateUserProfileStatus('displayProfile')
    this.setState({ displayProfile: true })
    this.props.onUpdateUserProfileLoadingStatus(false)
    this.props.onLoadingModal(false)
    this.props.onClearSmartCache()
  }

  render(){


    return(
      <>
        {
          this.props.profileStatus === 'displayProfile' &&
          !this.props.profileLoading &&
          !this.props.loadingModal &&
          <UserProfileContainer userData={ this.props.profileData } />
        }
      </>
    )
  }

}

const store = (store) => {
  return {
    achievements: store.achievements.all,
    smartCache: store.auth.smartCache,
    loadingModal: store.modal.loading,
    questionTotals: store.questions.totals,
    profileData: store.profile.userData,
    profileStatus: store.profile.status,
    profileLoading: store.profile.loading
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onSetLoadingModalType: (modalType, barType) => dispatch(setLoadingModalType(modalType, barType)),
    onGetSmarts: (user_name) => dispatch(getSmarts(user_name)),
    onStoreUserProfile: (userData) => dispatch(storeUserProfile(userData)),
    onStoreQuestionTotals: (totals) => dispatch(storeQuestionTotals(totals)),
    onStoreAchievements: (achievements) => dispatch(storeAchievements(achievements)),
    onClearSmartCache: () => dispatch(clearSmartCache()),
    onClearUserProfile: () => dispatch(clearUserProfile()),
    onClearQuestionTotals: () => dispatch(clearQuestionTotals()),
    onClearAchievements: () => dispatch(clearAchievements()),
    onUpdateUserProfileStatus: (status) => dispatch(updateUserProfileStatus(status)),
    onUpdateUserProfileLoadingStatus: (bool) => dispatch(updateUserProfileLoadingStatus(bool))
  }
}

export default withRouter(connect(store, dispatch)(ProfileController))