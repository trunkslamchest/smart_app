export var loadingBarClassSwitch = function(barType, status) {
  let barClass = ''

  // console.log('barType', barType)
  // console.log('status', status)

  if(!status) barClass = 'loading_bar_0'

  if(barType === 'refresh' || barType === 'authLogIn'){
    if(status === 'initAuth') barClass = 'loading_bar_1'
    if(status === 'authRefreshSuccess') barClass = 'loading_bar_2'
    if(status === 'authLogInSuccess') barClass = 'loading_bar_2'
    if(status === 'authSignUpSuccess') barClass = 'loading_bar_2'
    if(status === 'createAuthUserSuccess') barClass = 'loading_bar_3'
    if(status === 'updateAuthDisplayNameSuccess') barClass = 'loading_bar_5'
    if(status === 'authEditUser') barClass = 'loading_bar_7'
    if(status === 'getSmarts') barClass = 'loading_bar_7'
    if(status === 'storeUserInfo') barClass = 'loading_bar_9'
    if(status === 'storeAchievements') barClass = 'loading_bar_11'
    if(status === 'storeQuestionTotals') barClass = 'loading_bar_13'
    if(status === 'authSuccess') barClass = 'loading_bar_15'
    if(status === 'authCleanup') barClass = 'loading_bar_17'
  }

  if(barType === 'editProfile' || barType === 'editProfileModal'){
    if(status === 'initAuth') barClass = 'loading_bar_1'
    if(status === 'reAuthWithCredsSuccess') barClass = 'loading_bar_3'
    if(status === 'skipAuthUpdate') barClass = 'loading_bar_5'
    if(status === 'authEditUser') barClass = 'loading_bar_7'
    if(status === 'updateAuthEmailSuccess') barClass = 'loading_bar_9'
    if(status === 'updateAuthDisplayNameSuccess' ) barClass = 'loading_bar_11'
    if(status === 'updateUser') barClass = 'loading_bar_13'
    if(status === 'updateUserSuccess') barClass = 'loading_bar_15'
    if(status === 'authSuccess') barClass = 'loading_bar_17'
  }

  if(barType === 'deleteProfile'){
    if(status === 'initAuth') barClass = 'loading_bar_1'
    if(status === 'reAuthWithCredsSuccess') barClass = 'loading_bar_2'
    if(status === 'deleteAuthUserSuccess') barClass = 'loading_bar_4'
    if(status === 'deleteLocalUserSuccess') barClass = 'loading_bar_6'
    if(status === 'clearUserInfo') barClass = 'loading_bar_8'
    if(status === 'clearUserQuestions') barClass = 'loading_bar_9'
    if(status === 'clearUserSettings') barClass = 'loading_bar_10'
    if(status === 'clearQuestionTotals') barClass = 'loading_bar_11'
    if(status === 'clearAchievements') barClass = 'loading_bar_12'
    if(status === 'clearAuthCreds') barClass = 'loading_bar_13'
    if(status === 'clearLocalStorage') barClass = 'loading_bar_14'
    if(status === 'authSuccess') barClass = 'loading_bar_15'

  }

  if(barType === 'userProfile') {
    if(status === 'initUserProfile') barClass = 'loading_bar_1'
    if(status === 'getSmarts') barClass = 'loading_bar_3'
    if(status === 'storeUserData') barClass = 'loading_bar_6'
    if(status === 'storeQuestionTotals') barClass = 'loading_bar_10'
    if(status === 'storeAchievements') barClass = 'loading_bar_15'
    if(status === 'displayProfile') barClass = 'loading_bar_final'
  }

  if(status === 'authUser') barClass = 'loading_bar_6'
  if(status === 'authValid') barClass = 'loading_bar_final'

  if(barType === 'leaderBoards') {
    if(status === 'initLeaderBoards') barClass = 'loading_bar_1'
    if(status === 'getOverallLeaderBoards') barClass = 'loading_bar_5'
    if(status === 'getCatLeaderBoards') barClass = 'loading_bar_10'
    if(status === 'displayLeaderBoards') barClass = 'loading_bar_final'
  }

  if(barType === 'loadQuestion'){
    if(status === 'initGame') barClass = 'loading_bar_3'
    if(status === 'selectGameMode') barClass = 'loading_bar_5'
    if(status === 'setGameModeSuccess') barClass = 'loading_bar_7'
    if(status === 'setQuickPlay') barClass = 'loading_bar_9'
    if(status === 'setQset') barClass = 'loading_bar_10'
    if(status === 'setQsetSuccess') barClass = 'loading_bar_11'
    if(status === 'setByDiff') barClass = 'loading_bar_13'
    if(status === 'setByCat') barClass = 'loading_bar_15'
    if(status === 'setQuestionSuccess') barClass = 'loading_bar_17'
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
    if(status === 'sentComment' || status === 'updateStaticQuestionComment') barClass = 'loading_bar_10'
    if(status === 'commentSuccess') barClass = 'loading_bar_final'
  }

  return barClass
}