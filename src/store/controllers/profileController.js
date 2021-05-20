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
    if(!this.props.profile.status && !this.props.profile.userData) this.initProfileModule()
  }

  componentDidUpdate() {
    if(this.props.profile.status === 'initUserProfile' && !this.props.profile.userData) this.getSmartsModule()
    if(this.props.auth.smartCache && this.props.profile.status === 'getSmarts' && !this.props.profile.userData) this.storeUserProfileModule(this.props.auth.smartCache.user)
    if(this.props.auth.smartCache && this.props.profile.status === 'storeUserData' && !this.props.questions.totals) this.storeQuestionTotalsModule(this.props.auth.smartCache.questionTotals)
    if(this.props.auth.smartCache && this.props.profile.status === 'storeQuestionTotals' && this.props.questions.totals && !this.props.achievements.all) this.storeAchievementsModule(this.props.auth.smartCache.achievements)
    if(this.props.auth.smartCache && this.props.profile.userData && this.props.questions.totals && this.props.achievements.all && !this.state.displayProfile) this.displayProfileModule()
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false
    if(this.props.modal.loading || this.props.profile.loading ||
        nextProps.modal.loading || nextProps.profile.loading ) {
        render = true
      }
    return render
  }

  componentWillUnmount() {
    this.props.onUpdateUserProfileStatus(null)
    this.props.onClearUserProfile()
    this.props.onClearQuestionTotals()
    this.props.onClearAchievements()
    this.setState({ user_name: '' })
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
          this.props.profile.status === 'displayProfile' &&
          !this.props.profile.loading &&
          !this.props.modal.loading &&
            <UserProfileContainer
              achievements={ this.props.achievements }
              questionTotals={ this.props.questions.totals }
              userData={ this.props.profile.userData }
            />
        }
      </>
    )
  }

}

const store = (store) => {
  return {
    achievements: store.achievements,
    auth: store.auth,
    modal: store.modal,
    questions: store.questions,
    profile: store.profile
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