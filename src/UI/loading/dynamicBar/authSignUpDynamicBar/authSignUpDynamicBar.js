import React from 'react'

import { connect } from 'react-redux'

import './authSignUpDynamicBar.css'

const LoadingAuthSignUpDynamicBar = (props) => {

  let loadingBarClass = 'loading_bar_0'
  let loadingText = ''

  if(props.auth.status === 'authUserGoogleStart'){
    loadingBarClass = 'loading_bar_1'
    loadingText = 'Initializing Google Authentication'
  }

  if(props.auth.status === 'authUserGoogle'){
    loadingBarClass = 'loading_bar_2'
    loadingText = 'Awaiting Response from Google'
  }

  if(props.auth.status === 'authUserGoogleSuccess'){
    loadingBarClass = 'loading_bar_3'
    loadingText = 'Google Authentication Success'
  }

  if(props.auth.status === 'createUserLocalSuccess'){
    loadingBarClass = 'loading_bar_4'
    loadingText = 'Generating Local User Record'
  }

  if(props.auth.status === 'authUserLocal'){
    loadingBarClass = 'loading_bar_5'
    loadingText = 'Authenticating with Local Server'
  }

  if(props.auth.status === 'authUserLocalSuccess'){
    loadingBarClass = 'loading_bar_6'
    loadingText = 'Local Authentication Success'
  }

  if(props.auth.status === 'storeUserInfo'){
    loadingBarClass = 'loading_bar_7'
    loadingText = 'Storing User Information in Redux'
  }

  if(props.auth.status === 'storeUserInfoSuccess'){
    loadingBarClass = 'loading_bar_8'
    loadingText = 'User Information Stored in Redux'
  }

  if(props.auth.status === 'storeUserQuestions'){
    loadingBarClass = 'loading_bar_9'
    loadingText = 'Storing User Questions in Redux'
  }

  if(props.auth.status === 'storeUserQuestionsSuccess'){
    loadingBarClass = 'loading_bar_10'
    loadingText = 'User Information Stored in Redux'
  }

  if(props.auth.status === 'getQuestionsLocal'){
    loadingBarClass = 'loading_bar_11'
    loadingText = 'Fetching Local Question Totals'
  }

  if(props.auth.status === 'getQuestionsLocalSuccess'){
    loadingBarClass = 'loading_bar_12'
    loadingText = 'Fetched Local Question Totals'
  }

  if(props.auth.status === 'storeQuestionsLocal'){
    loadingBarClass = 'loading_bar_13'
    loadingText = 'Storing Question Totals in Redux'
  }

  if(props.auth.status === 'storeQuestionsLocalSuccess'){
    loadingBarClass = 'loading_bar_14'
    loadingText = 'Authentication Validated'
  }

  return(
    <div className="dyanmic_bar_container">
      <div className="loading_bar_container">
        <div className={ loadingBarClass }></div>
      </div>
      <div className="loading_text">
        <p>{ loadingText }</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(LoadingAuthSignUpDynamicBar)