export var loadingBarClassSwitch = function(barType, status) {
  let barClass = ''

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

  return barClass
}