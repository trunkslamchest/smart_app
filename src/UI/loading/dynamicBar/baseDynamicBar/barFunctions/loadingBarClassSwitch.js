export var loadingBarClassSwitch = function(barType, status) {
  let barClass = ''

  // console.log('bar class', barType)
  // console.log('bar class', status)

  if(!status) barClass = 'loading_bar_0'
  if(status === 'authGoogle') barClass = 'loading_bar_1'
  if(status === 'authUser') barClass = 'loading_bar_3'
  if(status === 'storeUserInfo') barClass = 'loading_bar_5'
  if(status === 'storeUserQuestions') barClass = 'loading_bar_7'
  if(status === 'storeAchievements') barClass = 'loading_bar_9'
  if(status === 'storeQuestionTotals') barClass = 'loading_bar_11'
  if(status === 'authSuccess') barClass = 'loading_bar_13'
  if(status === 'authValid') barClass = 'loading_bar_final'
  if(status === 'initUserEdit') barClass = 'loading_bar_1'
  if(status === 'updateUserSuccess') barClass = 'loading_bar_5'
  if(status === 'deleteAuthUserSuccess') barClass = 'loading_bar_3'
  if(status === 'deleteLocalUserSuccess') barClass = 'loading_bar_5'
  if(status === 'clearUserInfo') barClass = 'loading_bar_7'
  if(status === 'clearUserQuestions') barClass = 'loading_bar_9'
  if(status === 'clearUserSettings') barClass = 'loading_bar_11'
  if(status === 'clearQuestionTotals') barClass = 'loading_bar_13'
  if(status === 'clearAchievements') barClass = 'loading_bar_15'
  if(status === 'clearAuthCreds') barClass = 'loading_bar_final'

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