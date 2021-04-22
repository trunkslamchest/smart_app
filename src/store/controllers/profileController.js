import React from 'react'
import { connect } from 'react-redux'
import {
  loading,
  getQuestionTotals,
  getUserProfile,
  clearUserProfile,
  updateUserProfileStatus,
  updateUserProfileLoadingStatus
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
    if(typeof this.props.profile.userData !== 'string') {
      if((this.props.profile.userData && this.props.profile.status === 'getUserProfile') && (this.props.profile.userData.settings.privacy.profile.showStats && !this.props.questions.totals)) this.getQuestionTotalsModule()
      if(this.props.profile.userData && this.props.profile.userData.settings.privacy.profile.showStats && this.props.profile.userData.questions && this.props.questions.totals && !this.state.displayProfile) this.displayProfileModule()
      if(this.props.profile.userData && !this.props.profile.userData.settings.privacy.profile.showStats && !this.state.displayProfile) this.displayProfileModule()
    } else {
      this.displayProfileModule()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    let render = false

   if(this.props.modal.loading || nextProps.modal.loading) {
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

const mapStateToProps = (state) => {
  return {
    achievements: state.achievements,
    modal: state.modal,
    questions: state.questions,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onGetQuestionTotals: () => dispatch(getQuestionTotals()),
    onGetUserProfile: (user_name) => dispatch(getUserProfile(user_name)),
    onClearUserProfile: () => dispatch(clearUserProfile()),
    onUpdateUserProfileStatus: (status) => dispatch(updateUserProfileStatus(status)),
    onUpdateUserProfileLoadingStatus: (bool) => dispatch(updateUserProfileLoadingStatus(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileController)