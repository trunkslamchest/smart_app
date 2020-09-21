export var loadingBarTextSwitch = function(barType, status) {
  let barText = ''

  if(barType === 'authRefresh'){
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
    if(status === 'clearAuthTypeSuccess') barText = 'Authentication Validated'
  }

  return barText
}
