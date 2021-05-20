export var loadingBarTextSwitch = function(barType, status) {
  let barText = ''

  // console.log('bar text', barType)
  // console.log('bar text', status)

  if(!status) barText = 'Allocating Resources'

  if(barType === 'refresh' || barType === 'authLogIn'){
    if(status === 'initAuth') barText = 'Initializing Firebase Authentication'
    if(status === 'authRefreshSuccess') barText = 'Authentication Renewal Success'
    if(status === 'authLogInSuccess') barText = 'Authentication Init Success'
    if(status === 'authSignUpSuccess') barText = 'Authentication SignUp Success'
    if(status === 'createAuthUserSuccess') barText = 'Firebase Credentials Recorded'
    if(status === 'updateAuthDisplayNameSuccess') barText = 'Firebase DisplayName Update Success'
    if(status === 'authEditUser') barText = 'Updating Firebase Auth Credentials'
    if(status === 'getSmarts') barText = 'Fetching SmartCache'
    if(status === 'storeUserInfo') barText = 'Distributing User Information'
    if(status === 'storeAchievements') barText = 'Unloading Achievements'
    if(status === 'storeQuestionTotals') barText = 'Storing Question Totals'
    if(status === 'authSuccess') barText = 'This Was A Triumph'
    if(status === 'authCleanup') barText = 'Cleaning Up Auth Routines'
  }

  if(barType === 'editProfile'){
    if(status === 'initAuth') barText = 'Initializing Firebase Authentication'
    if(status === 'reAuthWithCredsSuccess') barText = 'Renewing Firebase Credentials'
    if(status === 'skipAuthUpdate') barText = 'Skipping Auth Update'
    if(status === 'authEditUser') barText = 'Updating Firebase Auth Credentials'
    if(status === 'updateAuthEmailSuccess') barText = 'Firebase Email Update Success'
    if(status === 'updateAuthDisplayNameSuccess' ) barText = 'Firebase Display Name Update Success'
    if(status === 'updateUser') barText = 'Revising Local User Info'
    if(status === 'updateUserSuccess') barText = 'User Info Revisions Achieved'
    if(status === 'authSuccess') barText = 'This Was A Triumph'
  }

  if(barType === 'deleteProfile' || barType === 'authLogOut'){
    if(status === 'initAuth') barText = 'Initializing Firebase Authentication'
    if(status === 'reAuthWithCredsSuccess') barText = 'Renewing Firebase Credentials'
    if(status === 'deleteAuthUserSuccess') barText = 'Revoking Firebase Authentication'
    if(status === 'deleteLocalUserSuccess') barText = 'Deauthorizing Local Privileges'
    if(status === 'clearUserInfo') barText = 'Dumping User Info'
    if(status === 'clearUserQuestions') barText = 'Purging User Questions'
    if(status === 'clearUserSettings') barText = 'Reverting User Settings'
    if(status === 'clearQuestionTotals') barText = 'Restoring Question Totals'
    if(status === 'clearAchievements') barText = 'Unachieving Question Achievements'
    if(status === 'clearAuthCreds') barText = 'Removing Authentication Credentials'
    if(status === 'clearLocalStorage') barText = 'Profile Deletion Success :('
    if(status === 'authSuccess') barText = 'Profile Delection Success :('
  }

  if(barType === 'userProfile') {
    if(status === 'initUserProfile') barText = 'Initializing SmartApp™ Profile'
    if(status === 'getSmarts') barText = 'Fetching SmartCache'
    if(status === 'storeUserData') barText = 'Requesting User Data'
    if(status === 'storeQuestionTotals') barText = 'Storing Question Totals'
    if(status === 'storeAchievements') barText = 'Unloading Achievements'
    if(status === 'displayProfile') barText = 'This Was A Triumph'
  }

  if(barType === 'authLogOut') { if(status === 'authSuccess') barText = 'See You Soon :D' }
  if(status === 'authUser') barText = 'Authenticating with Local Server'
  if(status === 'authValid') barText = 'Authentication Validated'

  if(barType === 'leaderBoards') {
    if(status === 'initLeaderBoards') barText = 'Initializing SmartApp™ Leaderboards'
    if(status === 'getOverallLeaderBoards') barText = 'Fetching International Leaderboards'
    if(status === 'getCatLeaderBoards') barText = 'Fetching Category Leaderboards'
    if(status === 'displayLeaderBoards') barText = 'SmartApp™ Leaderboards Mounted'
  }

  if(barType === 'loadQuestion'){
    if(status === 'initGame') barText = 'Initialzing Game Sequence'
    if(status === 'selectGameMode') barText = 'Setting Game Mode'
    if(status === 'setGameModeSuccess') barText = 'Routing Question Functions'
    if(status === 'setQuickPlay') barText = 'Starting Quick Play'
    if(status === 'setQset') barText = 'Starting Question Set'
    if(status === 'setQsetSuccess') barText = 'Question Set Successful'
    if(status === 'setByDiff') barText = 'Starting Diff Question Set'
    if(status === 'setByCat') barText = 'Starting Cat Question Set'
    if(status === 'setQuestionSuccess') barText = 'Question Load Complete'
    if(status === 'displayQuestion') barText = 'Asking Question'
  }

  if(barType === 'loadResults'){
    if(status === 'setAnswerSuccess') barText = 'Validating User Answer'
    if(status === 'answered') barText = 'Fetching Local Results'
    if(status === 'setResultsSuccess') barText = 'Parsing Question Results'
    if(status === 'updateQuestionSuccess') barText = 'Updated Question Results'
    if(status === 'updateQuestionTotalsSuccess') barText = 'Updating Question Totals'
    if(status === 'updateUserQuestionsSuccess') barText = 'Revising User Question Totals'
    if(status === 'setAllResultsSuccess') barText = 'Finalizing Question Results'
    if(status === 'displayResults') barText = 'Question Results Finalized'

  }

  if(barType === 'questionVote'){
    if(status === 'initVote') barText = 'Validating User Vote'
    if(status === 'sentVote') barText = 'Fetching Local Votes'
    if(status === 'voteSuccess') barText = 'Updating Vote Tables'
  }

  if(barType === 'questionComment'){
    if(status === 'initComment') barText = 'Validating User Comment'
    if(status === 'sentComment' || status === 'updateStaticQuestionComment') barText = 'Fetching Local Comments'
    if(status === 'commentSuccess') barText = 'Updated Comment Tables'
  }

  return barText
}
