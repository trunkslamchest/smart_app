export var loadingBarTextSwitch = function(barType, status) {
  let barText = ''

  if(barType === 'authLogIn'){
    if(status === 'authUserGoogleStart') barText = 'Initializing Google Authentication'
    if(status === 'authUserGoogle') barText = 'Awaiting Response from Google'
    if(status === 'authUserGoogleSuccess') barText = 'Google Authentication Success'
    if(status === 'authUserLocal') barText = 'Authenticating with Local Server'
    if(status === 'authUserLocalSuccess') barText = 'Local Authentication Success'
    if(status === 'storeUserInfo') barText = 'Saving User Information to Redux'
    if(status === 'storeUserInfoSuccess') barText = 'Redux User Information Updated'
    if(status === 'storeUserQuestions') barText = 'Saving User Questions to Redux'
    if(status === 'storeUserQuestionsSuccess') barText = 'Redux User Questions Updated'
    if(status === 'getQuestionsLocal') barText = 'Fetching Local Question Totals'
    if(status === 'getQuestionsLocalSuccess') barText = 'Fetched Local Question Totals'
    if(status === 'storeQuestionsLocal') barText = 'Saving Question Totals to Redux'
    if(status === 'storeQuestionsLocalSuccess') barText = 'Redux Question Totals Updated'
    if(status === 'authValid') barText = 'Authentication Validated'
  }

  if(barType === 'authSignUp'){
    if(status === 'authUserGoogleStart') barText = 'Initializing Google Authentication'
    if(status === 'authUserGoogle') barText = 'Awaiting Response from Google'
    if(status === 'authUserGoogleSuccess') barText = 'Google Authentication Success'
    if(status === 'createUserLocalSuccess') barText = 'Generating Local User Record'
    if(status === 'authUserLocal') barText = 'Authenticating with Local Server'
    if(status === 'authUserLocalSuccess') barText = 'Local Authentication Success'
    if(status === 'storeUserInfo') barText = 'Saving User Information to Redux'
    if(status === 'storeUserInfoSuccess') barText = 'Redux User Information Updated'
    if(status === 'storeUserQuestions') barText = 'Saving User Questions to Redux'
    if(status === 'storeUserQuestionsSuccess') barText = 'Redux User Questions Updated'
    if(status === 'getQuestionsLocal') barText = 'Fetching Local Question Totals'
    if(status === 'getQuestionsLocalSuccess') barText = 'Fetched Local Question Totals'
    if(status === 'storeQuestionsLocal') barText = 'Saving Question Totals to Redux'
    if(status === 'storeQuestionsLocalSuccess') barText = 'Redux Question Totals Updated'
    if(status === 'authValid') barText = 'Authentication Validated'
  }

  if(barType === 'refresh'){
    if(status === 'authUserGoogleStart') barText = 'Initializing Google Authentication'
    if(status === 'authUserGoogle') barText = 'Awaiting Response from Google'
    if(status === 'authUserGoogleSuccess') barText = 'Google Authentication Success'
    if(status === 'authUserLocal') barText = 'Authenticating with Local Server'
    if(status === 'authUserLocalSuccess') barText = 'Local Authentication Success'
    if(status === 'storeUserInfo') barText = 'Saving User Information to Redux'
    if(status === 'storeUserInfoSuccess') barText = 'Redux User Information Updated'
    if(status === 'storeUserQuestions') barText = 'Saving User Questions to Redux'
    if(status === 'storeUserQuestionsSuccess') barText = 'Redux User Questions Updated'
    if(status === 'getQuestionsLocal') barText = 'Fetching Local Question Totals'
    if(status === 'getQuestionsLocalSuccess') barText = 'Fetched Local Question Totals'
    if(status === 'storeQuestionsLocal') barText = 'Saving Question Totals to Redux'
    if(status === 'storeQuestionsLocalSuccess') barText = 'Redux Question Totals Updated'
    if(status === 'authValid') barText = 'Authentication Validated'
  }

  if(barType === 'editProfile'){
    if(status === 'initUserEdit') barText = 'Initializing User Update'
    if(status === 'updateUserInfo') barText = 'Revising User Info'
    if(status === 'updateUserInfoSuccess') barText = 'User Info Revision Success'
    if(status === 'storeUserInfo') barText = 'Saving User Updates To Redux'
    if(status === 'finalizeUpdateUserInfo') barText = 'Finalizing User Updates'
    if(status === 'authValid') barText = 'User Update Successful'
  }

  if(barType === 'authLogOut'){
    if(status === 'initUserLogOut') barText = 'Initializing User Log Out'
    if(status === 'initClearUserInfo') barText = 'Initializing User Info Dump'
    if(status === 'clearUserInfo') barText = 'Dumping User Info'
    if(status === 'clearUserInfoSuccess') barText = 'User Info Dumped'
    if(status === 'initClearUserQuestions') barText = 'Initializing User Questions Dump'
    if(status === 'clearUserQuestions') barText = 'Dumping User Questions'
    if(status === 'clearUserQuestionsSuccess') barText = 'User Questions Dumped'
    if(status === 'initClearQuestionTotals') barText = 'Initialzing Question Totals Dump'
    if(status === 'clearQuestionTotals') barText = 'Dumping Question Totals'
    if(status === 'clearQuestionTotalsSuccess') barText = 'Question Totals Dumped'
    if(status === 'initClearAuthCreds') barText = 'Dumping User Credentials'
    if(status === 'authFinalizeLogOut') barText = 'Dumping Local Storage'
    if(status === 'clearAuthTypeSuccess') barText = 'Dumping Local Authentication'
    if(status === 'initClearLocalStorage') barText = 'Finalizing Log Out'
    if(status === 'clearLocalStorageSuccess') barText = 'Finalized Log Out'
  }

  if(barType === 'authDeleteUser'){
    if(status === 'authUserGoogleSuccess') barText = 'Google Authentication Success'
    if(status === 'initDeleteAuthUser') barText = 'Initializing Google Auth Deletion'
    if(status === 'deleteAuthUserSuccess') barText = 'Google Auth Deletion Successful'
    if(status === 'initLocalDeleteUser') barText = 'Initializing Local User Deletion'
    if(status === 'deleteLocalUserSuccess') barText = 'Local User Deletion Successful'
    if(status === 'clearUserInfo') barText = 'Dumping User Info'
    if(status === 'clearUserInfoSuccess') barText = 'User Info Dumped'
    if(status === 'initClearUserQuestions') barText = 'Initializing User Questions Dump'
    if(status === 'clearUserQuestions') barText = 'Dumping User Questions'
    if(status === 'clearUserQuestionsSuccess') barText = 'User Questions Dumped'
    if(status === 'initClearQuestionTotals') barText = 'Initialzing Question Totals Dump'
    if(status === 'clearQuestionTotals') barText = 'Dumping Question Totals'
    if(status === 'clearQuestionTotalsSuccess') barText = 'Question Totals Dumped'
    if(status === 'initClearAuthCreds') barText = 'Initialzing User Credentials Dump'
    if(status === 'authFinalizeDeleteUser') barText = 'User Credentials Dumped'
    if(status === 'initClearLocalStorage') barText = 'Local Storage Dumped'
    if(status === 'clearLocalStorageSuccess') barText = 'Account Deletion Finalized'
  }

  if(barType === 'loadQuestion'){
    if(status === 'initGame') barText = 'Initialzing Game Sequence'
    if(status === 'setGameModeSuccess') barText = 'Setting Game Mode'
    if(status === 'setQuestionSuccess') barText = 'Setting Question'
    if(status === 'displayQuestion') barText = 'Question Load Complete'
  }

  if(barType === 'loadResults'){
    if(status === 'setAnswerSuccess') barText = 'Validating User Answer'
    if(status === 'answered') barText = 'Fetching Local Results'
    if(status === 'setResultsSuccess') barText = 'Parsing Question Results'
    if(status === 'updateQuestionSuccess') barText = 'Updated Question Results'
    if(status === 'updateQuestionTotalsSuccess') barText = 'Updating Question Totals'
    if(status === 'updateUserQuestionsSuccess') barText = 'Revising User Question Totals'
    if(status === 'setAllResultsSuccess') barText = 'Question Results Validated'
  }

  if(barType === 'questionVote'){
    if(status === 'initVote') barText = 'Validating User Vote'
    if(status === 'sentVote') barText = 'Fetching Local Votes'
    if(status === 'voteSuccess') barText = 'Updating Vote Tables'
  }

  if(barType === 'questionComment'){
    if(status === 'initComment') barText = 'Validating User Comment'
    if(status === 'sentComment') barText = 'Fetching Local Comments'
    if(status === 'commentSuccess') barText = 'Updating Comment Tables'
  }

  return barText
}
