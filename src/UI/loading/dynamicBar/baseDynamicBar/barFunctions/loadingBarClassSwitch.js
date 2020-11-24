export var loadingBarClassSwitch = function(barType, status) {
  let barClass = ''

  if(barType === 'authLogIn'){
    if(status === 'authGoogle') barClass = 'loading_bar_1'
    if(status === 'authUser') barClass = 'loading_bar_3'
    if(status === 'storeUserInfo') barClass = 'loading_bar_5'
    if(status === 'storeUserQuestions') barClass = 'loading_bar_7'
    if(status === 'storeAchievements') barClass = 'loading_bar_9'
    if(status === 'storeQuestionTotals') barClass = 'loading_bar_11'
    if(status === 'authSuccess') barClass = 'loading_bar_13'
    if(status === 'authValid') barClass = 'loading_bar_final'




    // if(status === 'authUserGoogleStart') barClass = 'loading_bar_1'
    // if(status === 'authUserGoogle') barClass = 'loading_bar_2'
    // if(status === 'authUserGoogleSuccess') barClass = 'loading_bar_3'
    // if(status === 'authUserLocal') barClass = 'loading_bar_4'
    // if(status === 'authUserLocalSuccess') barClass = 'loading_bar_5'
    // if(status === 'storeUserInfo') barClass = 'loading_bar_6'
    // if(status === 'storeUserInfoSuccess') barClass = 'loading_bar_7'
    // if(status === 'storeUserQuestions') barClass = 'loading_bar_8'
    // if(status === 'storeUserQuestionsSuccess') barClass = 'loading_bar_9'
    // if(status === 'getAchievements') barClass = 'loading_bar_10'
    // if(status === 'storeAchievementsSuccess') barClass = 'loading_bar_11'
    // if(status === 'getQuestionsLocal') barClass = 'loading_bar_12'
    // if(status === 'getQuestionsLocalSuccess') barClass = 'loading_bar_13'
    // if(status === 'storeQuestionsLocal') barClass = 'loading_bar_14'
    // if(status === 'storeQuestionsLocalSuccess') barClass = 'loading_bar_15'
    // if(status === 'authValid') barClass = 'loading_bar_final'
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
    if(status === 'getAchievements') barClass = 'loading_bar_11'
    if(status === 'storeAchievementsSuccess') barClass = 'loading_bar_12'
    if(status === 'getQuestionsLocal') barClass = 'loading_bar_13'
    if(status === 'getQuestionsLocalSuccess') barClass = 'loading_bar_14'
    if(status === 'storeQuestionsLocal') barClass = 'loading_bar_15'
    if(status === 'storeQuestionsLocalSuccess') barClass = 'loading_bar_16'
    if(status === 'authValid') barClass = 'loading_bar_final'
  }

  if(barType === 'refresh'){
    if(status === 'authGoogle') barClass = 'loading_bar_1'
    if(status === 'authUser') barClass = 'loading_bar_3'
    if(status === 'storeUserInfo') barClass = 'loading_bar_5'
    if(status === 'storeUserQuestions') barClass = 'loading_bar_7'
    if(status === 'storeAchievements') barClass = 'loading_bar_9'
    if(status === 'storeQuestionTotals') barClass = 'loading_bar_11'
    if(status === 'authSuccess') barClass = 'loading_bar_13'
    if(status === 'authValid') barClass = 'loading_bar_final'

    // if(status === 'authUserGoogleStart') barClass = 'loading_bar_1'
    // if(status === 'authUserGoogle') barClass = 'loading_bar_2'
    // if(status === 'authUserGoogleSuccess') barClass = 'loading_bar_3'
    // if(status === 'authUserLocal') barClass = 'loading_bar_4'
    // if(status === 'authUserLocalSuccess') barClass = 'loading_bar_5'
    // if(status === 'storeUserInfo') barClass = 'loading_bar_6'
    // if(status === 'storeUserInfoSuccess') barClass = 'loading_bar_7'
    // if(status === 'storeUserQuestions') barClass = 'loading_bar_8'
    // if(status === 'storeUserQuestionsSuccess') barClass = 'loading_bar_9'
    // if(status === 'getAchievements') barClass = 'loading_bar_10'
    // if(status === 'storeAchievementsSuccess') barClass = 'loading_bar_11'
    // if(status === 'getQuestionsLocal') barClass = 'loading_bar_12'
    // if(status === 'getQuestionsLocalSuccess') barClass = 'loading_bar_13'
    // if(status === 'storeQuestionsLocal') barClass = 'loading_bar_14'
    // if(status === 'storeQuestionsLocalSuccess') barClass = 'loading_bar_15'
    // if(status === 'authValid') barClass = 'loading_bar_final'
  }

  if(barType === 'editProfile'){
    if(status === 'initUserEdit') barClass = 'loading_bar_1'
    if(status === 'updateUserInfo') barClass = 'loading_bar_4'
    if(status === 'updateUserInfoSuccess') barClass = 'loading_bar_8'
    if(status === 'storeUserInfo') barClass = 'loading_bar_12'
    if(status === 'finalizeUpdateUserInfo') barClass = 'loading_bar_16'
    if(status === 'authValid') barClass = 'loading_bar_final'
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
    if(status === 'clearAuthTypeSuccess') barClass = 'loading_bar_13'
    if(status === 'initClearLocalStorage') barClass = 'loading_bar_14'
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

  if(barType === 'loadQuestion'){
    if(status === 'initGame') barClass = 'loading_bar_5'
    if(status === 'setGameModeSuccess') barClass = 'loading_bar_10'
    if(status === 'setQuickPlay') barClass = 'loading_bar_12'
    if(status === 'setQset') barClass = 'loading_bar_14'
    if(status === 'setQuestionSuccess') barClass = 'loading_bar_16'
    if(status === 'displayQuestion') barClass = 'loading_bar_final'
  }

  if(barType === 'loadResults'){
    if(status === 'setAnswerSuccess') barClass = 'loading_bar_1'
    if(status === 'answered') barClass = 'loading_bar_3'
    if(status === 'setResultsSuccess') barClass = 'loading_bar_6'
    if(status === 'updateQuestionSuccess') barClass = 'loading_bar_9'
    if(status === 'updateQuestionTotalsSuccess') barClass = 'loading_bar_12'
    if(status === 'updateUserQuestionsSuccess') barClass = 'loading_bar_15'
    if(status === 'setAllResultsSuccess') barClass = 'loading_bar_final'
  }

  if(barType === 'questionVote'){
    if(status === 'initVote') barClass = 'loading_bar_5'
    if(status === 'sentVote') barClass = 'loading_bar_10'
    if(status === 'voteSuccess') barClass = 'loading_bar_final'
  }

  if(barType === 'questionComment'){
    if(status === 'initComment') barClass = 'loading_bar_5'
    if(status === 'sentComment') barClass = 'loading_bar_10'
    if(status === 'commentSuccess') barClass = 'loading_bar_final'
  }

  return barClass
}