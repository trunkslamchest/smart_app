import React from 'react'
import { connect } from 'react-redux'
import {
  loading,
  getQuestionTotals,
  getUserProfile,
  clearUserProfile,
  updateUserProfileStatus,
  updateUserProfileLoadingStatus,
  storeAchievements
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
    if(this.props.profile.status === 'initUserProfile' && !this.props.profile.userData) this.getProfileModule()
    if((this.props.profile.userData && this.props.profile.status === 'getUserProfile' && !this.props.questions.totals)) this.getQuestionTotalsModule()
    if((this.props.questions.totals && this.props.profile.status === 'getQuestionTotals' && !this.props.achievements.all)) this.getAchievementsModule()
    if(this.props.profile.userData && this.props.questions.totals && this.props.achievements.all && !this.state.displayProfile) this.displayProfileModule()
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false

   if(this.props.modal.loading || this.props.profile.loading ||
      nextProps.modal.loading || nextProps.profile.loading ) {
      // console.log(this.props.modal.loading)

      render = true
    }

    // console.log(
    //   this.props.leaderBoards, nextProps.leaderBoards, "|",
    //   this.props.modal.loading, nextProps.modal.loading
    // )

    return render
    // return true
  }

  componentWillUnmount() {
    this.props.onUpdateUserProfileStatus(null)
    this.props.onClearUserProfile()
    this.setState({ user_name: '' })
  }

  initProfileModule = () => {
    this.props.onLoadingModal(true)
    this.props.switchLoadingModalType('userProfile')
    this.props.switchLoadingModalBarType('userProfile')
    this.props.onUpdateUserProfileLoadingStatus(true)
    this.props.onUpdateUserProfileStatus('initUserProfile')
  }

  getProfileModule = () => {
    this.props.onUpdateUserProfileStatus('getUserProfile')
    this.props.onGetUserProfile(this.state.user_name)
  }

  getQuestionTotalsModule = () => {
    this.props.onUpdateUserProfileStatus('getQuestionTotals')
    this.props.onGetQuestionTotals()
  }

  getAchievementsModule = () => {
    this.props.onUpdateUserProfileStatus('getAchievements')
    this.props.onGetAcheivements()
  }

  displayProfileModule = () => {
    this.props.onUpdateUserProfileStatus('displayProfile')
    this.setState({ displayProfile: true })
    this.props.onUpdateUserProfileLoadingStatus(false)
    this.props.onLoadingModal(false)
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
              history={ this.props.history }
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
    modal: store.modal,
    questions: store.questions,
    profile: store.profile
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onGetQuestionTotals: () => dispatch(getQuestionTotals()),
    onGetAcheivements: () => dispatch(storeAchievements()),
    onGetUserProfile: (user_name) => dispatch(getUserProfile(user_name)),
    onClearUserProfile: () => dispatch(clearUserProfile()),
    onUpdateUserProfileStatus: (status) => dispatch(updateUserProfileStatus(status)),
    onUpdateUserProfileLoadingStatus: (bool) => dispatch(updateUserProfileLoadingStatus(bool))
  }
}

export default connect(store, dispatch)(ProfileController)