import React from 'react'

import { connect } from 'react-redux'

import './authOutDynamicBar.css'

const LoadingAuthOutDynamicBar = (props) => {

  let loadingBarClass = 'loading_bar_0'
  let loadingText = ''

  if(props.auth.status === 'initClearUserInfo'){
    loadingBarClass = 'loading_bar_1'
    loadingText = 'Initializing User Info Dump'
  }

  if(props.auth.status === 'clearUserInfo'){
    loadingBarClass = 'loading_bar_2'
    loadingText = 'Dumping User Info'
  }

  if(props.auth.status === 'clearUserInfoSuccess'){
    loadingBarClass = 'loading_bar_3'
    loadingText = 'User Info Dumped'
  }

  if(props.auth.status === 'initClearUserQuestions'){
    loadingBarClass = 'loading_bar_4'
    loadingText = 'Initializing User Questions Dump'
  }

  if(props.auth.status === 'clearUserQuestions'){
    loadingBarClass = 'loading_bar_5'
    loadingText = 'Dumping User Questions'
  }

  if(props.auth.status === 'clearUserQuestionsSuccess'){
    loadingBarClass = 'loading_bar_6'
    loadingText = 'User Questions Dumped'
  }

  if(props.auth.status === 'initClearQuestionTotals'){
    loadingBarClass = 'loading_bar_7'
    loadingText = 'Initialzing Question Totals Dump'
  }

  if(props.auth.status === 'clearQuestionTotals'){
    loadingBarClass = 'loading_bar_8'
    loadingText = 'Dumping Question Totals'
  }

  if(props.auth.status === 'clearQuestionTotalsSuccess'){
    loadingBarClass = 'loading_bar_9'
    loadingText = 'Question Totals Dumped'
  }

  if(props.auth.status === 'initClearAuthCreds'){
    loadingBarClass = 'loading_bar_10'
    loadingText = 'Initialzing User Credentials Dump'
  }

  if(props.auth.status === 'authFinalizeLogOut'){
    loadingBarClass = 'loading_bar_11'
    loadingText = 'Initialzing Local Storage Dump'
  }

  if(props.auth.status === 'initClearLocalStorage'){
    loadingBarClass = 'loading_bar_12'
    loadingText = 'Local Storage Dumped'
  }

  if(props.auth.status === 'clearLocalStorageSuccess'){
    loadingBarClass = 'loading_bar_13'
    loadingText = 'Finalizing Log Out'
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

export default connect(mapStateToProps)(LoadingAuthOutDynamicBar)