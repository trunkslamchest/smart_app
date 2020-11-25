export var loadingBarTextSwitch = function(barType, status) {
  let barText = ''

  // console.log(barType, status)

  if(!status) barText = 'Allocating Resources'
  if(status === 'authGoogle') barText = 'Initializing Google Authentication'
  if(status === 'authUser') barText = 'Authenticating with Local Server'
  if(status === 'storeUserInfo') barText = 'Storing User Information to Redux'
  if(status === 'storeUserQuestions') barText = 'Caching User Questions'
  if(status === 'storeAchievements') barText = 'Fetching SmartApp™ Achievements'
  if(status === 'storeQuestionTotals') barText = 'Fetching SmartApp™ Totals'
  if(status === 'authSuccess') barText = 'Cleaning Up Auth Routines'
  if(status === 'authValid') barText = 'Success'
  if(status === 'initUserEdit') barText = 'Initializing User Update'
  if(status === 'updateUserSuccess') barText = 'Revising User Info'
  if(status === 'deleteAuthUserSuccess') barText = 'Removed Google Authentication'
  if(status === 'deleteLocalUserSuccess') barText = 'Removed Local User Records'
  if(status === 'clearUserInfo') barText = 'Dumping User Info'
  if(status === 'clearUserQuestions') barText = 'Purging User Questions'
  if(status === 'clearUserSettings') barText = 'Reverting User Settings'
  if(status === 'clearQuestionTotals') barText = 'Restoring Question Totals'
  if(status === 'clearAchievements') barText = 'Unachieving Question Achievements'
  if(status === 'clearAuthCreds') barText = 'Removing Authentication Credentials'
  if(status === 'clearLocalStorage') barText = 'Profile Deletion Success'

  if(barType === 'authLogOut') {
    if(status === 'authSuccess') barText = 'Log Out Success'

  }

  if(barType === 'deleteProfile') {
    if(status === 'authSuccess') barText = 'Profile Delection Success :('
  }


  if(barType === 'loadQuestion'){
    if(status === 'initGame') barText = 'Initialzing Game Sequence'
    if(status === 'setGameModeSuccess') barText = 'Setting Game Mode'
    if(status === 'setQuickPlay') barText = 'Initializing Quick Play'
    if(status === 'setQset') barText = 'Retrieving Question Set'
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
