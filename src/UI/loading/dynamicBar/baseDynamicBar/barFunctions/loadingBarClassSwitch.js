export var loadingBarClassSwitch = function(barType, status) {
  let barClass = ''

  if(barType === 'authLogIn'){
    if(status === 'authUserGoogleStart') barClass = 'loading_bar_1'
    if(status === 'authUserGoogle') barClass = 'loading_bar_2'
    if(status === 'authUserGoogleSuccess') barClass = 'loading_bar_3'
    if(status === 'authUserLocal') barClass = 'loading_bar_4'
    if(status === 'authUserLocalSuccess') barClass = 'loading_bar_5'
    if(status === 'storeUserInfo') barClass = 'loading_bar_6'
    if(status === 'storeUserInfoSuccess') barClass = 'loading_bar_7'
    if(status === 'storeUserQuestions') barClass = 'loading_bar_8'
    if(status === 'storeUserQuestionsSuccess') barClass = 'loading_bar_9'
    if(status === 'getQuestionsLocal') barClass = 'loading_bar_10'
    if(status === 'getQuestionsLocalSuccess') barClass = 'loading_bar_11'
    if(status === 'storeQuestionsLocal') barClass = 'loading_bar_12'
    if(status === 'storeQuestionsLocalSuccess') barClass = 'loading_bar_13'
    if(status === 'clearAuthTypeSuccess') barClass = 'loading_bar_final'
  }

  if(barType === 'authSignUp'){
    if(status === 'authUserGoogleStart') barClass = 'loading_bar_1'
    if(status === 'authUserGoogle') barClass = 'loading_bar_2'
    if(status === 'authUserGoogleSuccess') barClass = 'loading_bar_3'
    if(status === 'createUserLocalSuccess') barClass = 'loading_bar_4'
    if(status === 'authUserLocal') barClass = 'loading_bar_5'
    if(status === 'authUserLocalSuccess') barClass = 'loading_bar_6'
    if(status === 'storeUserInfo') barClass = 'loading_bar_7'
    if(status === 'storeUserInfoSuccess') barClass = 'loading_bar_8'
    if(status === 'storeUserQuestions') barClass = 'loading_bar_9'
    if(status === 'storeUserQuestionsSuccess') barClass = 'loading_bar_10'
    if(status === 'getQuestionsLocal') barClass = 'loading_bar_11'
    if(status === 'getQuestionsLocalSuccess') barClass = 'loading_bar_12'
    if(status === 'storeQuestionsLocal') barClass = 'loading_bar_13'
    if(status === 'storeQuestionsLocalSuccess') barClass = 'loading_bar_14'
    if(status === 'clearAuthTypeSuccess') barClass = 'loading_bar_final'
  }

  if(barType === 'authRefresh'){
    if(status === 'authUserGoogleStart') barClass = 'loading_bar_1'
    if(status === 'authUserGoogle') barClass = 'loading_bar_2'
    if(status === 'authUserGoogleSuccess') barClass = 'loading_bar_3'
    if(status === 'authUserLocal') barClass = 'loading_bar_4'
    if(status === 'authUserLocalSuccess') barClass = 'loading_bar_5'
    if(status === 'storeUserInfo') barClass = 'loading_bar_6'
    if(status === 'storeUserInfoSuccess') barClass = 'loading_bar_7'
    if(status === 'storeUserQuestions') barClass = 'loading_bar_8'
    if(status === 'storeUserQuestionsSuccess') barClass = 'loading_bar_9'
    if(status === 'getQuestionsLocal') barClass = 'loading_bar_10'
    if(status === 'getQuestionsLocalSuccess') barClass = 'loading_bar_11'
    if(status === 'storeQuestionsLocal') barClass = 'loading_bar_12'
    if(status === 'storeQuestionsLocalSuccess') barClass = 'loading_bar_13'
    if(status === 'clearAuthTypeSuccess') barClass = 'loading_bar_final'
  }

  if(barType === 'authLogOut'){
    if(status === 'initUserLogOut') barClass = 'loading_bar_1'
    if(status === 'initClearUserInfo') barClass = 'loading_bar_2'
    if(status === 'clearUserInfo') barClass = 'loading_bar_3'
    if(status === 'clearUserInfoSuccess') barClass = 'loading_bar_4'
    if(status === 'initClearUserQuestions') barClass = 'loading_bar_5'
    if(status === 'clearUserQuestions') barClass = 'loading_bar_6'
    if(status === 'clearUserQuestionsSuccess') barClass = 'loading_bar_7'
    if(status === 'initClearQuestionTotals') barClass = 'loading_bar_8'
    if(status === 'clearQuestionTotals') barClass = 'loading_bar_9'
    if(status === 'clearQuestionTotalsSuccess') barClass = 'loading_bar_10'
    if(status === 'initClearAuthCreds') barClass = 'loading_bar_11'
    if(status === 'authFinalizeLogOut') barClass = 'loading_bar_12'
    if(status === 'initClearLocalStorage') barClass = 'loading_bar_13'
    if(status === 'clearLocalStorageSuccess') barClass = 'loading_bar_final'
  }

  if(barType === 'authDeleteUser'){
    if(status === 'authUserGoogleSuccess') barClass = 'loading_bar_1'
    if(status === 'initDeleteAuthUser') barClass = 'loading_bar_2'
    if(status === 'deleteAuthUserSuccess') barClass = 'loading_bar_3'
    if(status === 'initLocalDeleteUser') barClass = 'loading_bar_4'
    if(status === 'deleteLocalUserSuccess') barClass = 'loading_bar_5'
    if(status === 'clearUserInfo') barClass = 'loading_bar_6'
    if(status === 'clearUserInfoSuccess') barClass = 'loading_bar_7'
    if(status === 'initClearUserQuestions') barClass = 'loading_bar_8'
    if(status === 'clearUserQuestions') barClass = 'loading_bar_9'
    if(status === 'clearUserQuestionsSuccess') barClass = 'loading_bar_10'
    if(status === 'initClearQuestionTotals') barClass = 'loading_bar_11'
    if(status === 'clearQuestionTotals') barClass = 'loading_bar_12'
    if(status === 'clearQuestionTotalsSuccess') barClass = 'loading_bar_13'
    if(status === 'initClearAuthCreds') barClass = 'loading_bar_14'
    if(status === 'authFinalizeDeleteUser') barClass = 'loading_bar_15'
    if(status === 'initClearLocalStorage') barClass = 'loading_bar_16'
    if(status === 'clearLocalStorageSuccess') barClass = 'loading_bar_final'
  }

  return barClass
}

  // if(props.auth.status === 'clearLocalStorageSuccess'){
  //   loadingBarClass = 'loading_bar_17'
  //   loadingText = 'Account Deletion Finalized'
  // }