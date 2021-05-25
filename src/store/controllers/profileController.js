import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useOnMount from '../../utility/hooks/useOnMount'
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

const ProfileController = (props) => {

  const history = useHistory()

  const [userName, setUserName] = useState('')
  const [displayProfile, setDisplayProfile] = useState(false)

  const {
    achievements,
    questionTotals,
    profileData,
    profileStatus,
    smartCache,
    onClearSmartCache,
    onClearUserProfile,
    onGetSmarts,
    onLoadingModal,
    onSetLoadingModalType,
    onStoreAchievements,
    onStoreQuestionTotals,
    onStoreUserProfile,
    onUpdateUserProfileLoadingStatus,
    onUpdateUserProfileStatus
  } = props

  const initProfileModule = useCallback(() => {
    onLoadingModal(true)
    onSetLoadingModalType('userProfile', 'userProfile')
    onUpdateUserProfileLoadingStatus(true)
    onUpdateUserProfileStatus('initUserProfile')
  }, [
    onLoadingModal,
    onSetLoadingModalType,
    onUpdateUserProfileLoadingStatus,
    onUpdateUserProfileStatus
  ])

  const getSmartsModule = useCallback(() => {
    onUpdateUserProfileStatus('getSmarts')
    onGetSmarts(userName)
  }, [
    onGetSmarts,
    onUpdateUserProfileStatus,
    userName
  ])

  const storeUserProfileModule = useCallback((userData) => {
    onUpdateUserProfileStatus('storeUserData')
    onStoreUserProfile(userData)
  }, [
    onUpdateUserProfileStatus,
    onStoreUserProfile
  ])

  const storeQuestionTotalsModule = useCallback((questionTotals) => {
    onUpdateUserProfileStatus('storeQuestionTotals')
    onStoreQuestionTotals(questionTotals)
  }, [
    onStoreQuestionTotals,
    onUpdateUserProfileStatus
  ])

  const storeAchievementsModule = useCallback((achievements) => {
    onUpdateUserProfileStatus('storeAchievements')
    onStoreAchievements(achievements)
  }, [
    onStoreAchievements,
    onUpdateUserProfileStatus
  ])

  const displayProfileModule = useCallback(() => {
    onUpdateUserProfileStatus('displayProfile')
    setDisplayProfile(true)
    onUpdateUserProfileLoadingStatus(false)
    onLoadingModal(false)
    onClearSmartCache()
  }, [
    onUpdateUserProfileStatus,
    onUpdateUserProfileLoadingStatus,
    onLoadingModal,
    onClearSmartCache
  ])

  useOnMount(() => {
    let parseLocation = history.location.pathname.split("/")
    let userName = parseLocation[parseLocation.length - 1]
    document.title = `SmartApp™ | ${ userName }'s Profile`
    setUserName(userName)
    if(!profileStatus && !profileData) initProfileModule()
    return () => reset()
  }, [
    history,
    profileData,
    profileStatus
  ])

  const reset = () => {
    onUpdateUserProfileStatus(null)
    onClearUserProfile()
    setUserName('')
    setDisplayProfile(false)
  }

  useEffect(() => {
    if(profileStatus === 'initUserProfile' && !profileData) getSmartsModule()
    if(smartCache && profileStatus === 'getSmarts' && !profileData) storeUserProfileModule(smartCache.user)
    if(smartCache && profileStatus === 'storeUserData' && !questionTotals) storeQuestionTotalsModule(smartCache.questionTotals)
    if(smartCache && profileStatus === 'storeQuestionTotals' && questionTotals && !achievements) storeAchievementsModule(smartCache.achievements)
    if(smartCache && profileData && questionTotals && achievements && !displayProfile) displayProfileModule()
  }, [
    achievements,
    displayProfile,
    profileStatus,
    profileData,
    questionTotals,
    smartCache,
    displayProfileModule,
    getSmartsModule,
    storeAchievementsModule,
    storeQuestionTotalsModule,
    storeUserProfileModule
  ])

  return(
    <>
      {
        props.profileStatus === 'displayProfile' &&
        !props.loadingModal &&
        <UserProfileContainer userData={ props.profileData } />
      }
    </>
  )
}

const store = (store) => {
  return {
    achievements: store.achievements.all,
    smartCache: store.auth.smartCache,
    loadingModal: store.modal.loading,
    questionTotals: store.questions.totals,
    profileData: store.profile.userData,
    profileStatus: store.profile.status
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

export default connect(store, dispatch)(ProfileController)