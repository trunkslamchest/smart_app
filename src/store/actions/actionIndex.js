export {
  login,
  logout,
  signup,
  deleteProfile,
  showModal,
} from './modalActions'

export {
  authUser,
  authStart,
  authSuccess,
  authFail,
  authSignUp,
  authLogIn,
  authLogOut,
  authRefresh,
  authDelete,
  authTimeout,
  authCert,
  authClearState,
  authClearCreds,
  authValid
  // setAuthRedirectPath,
  // checkAuthState,
  // checkAuthTimeout,
} from './authActions'

export {
  storeUserInfo,
  clearUserInfo,
  storeUserQuestions,
  clearUserQuestions,
  updateUserInfo,
  updateUserQuestions,
  updateUserQuestionIdsFromPlayController,
  updateUserQuestionsFromPlayController,
  updateUserQuestionTotalsFromPlayController,
  updateUserVotesFromPlayController,

  deleteUser
} from './userActions'

export {
  getQuestionTotals,
  clearQuestionTotals,
  storeQuestionTotals,
  updateQuestionTotalsFromPlayController,
  getQuickQuestion,
  getDiffQuestion,
  getCatQuestion
} from './questionsActions'

export {
  setGameMode,
  resetGameMode,
  setGameState,
  resetGameState,
  setGameQset,
  resetGameQset,
  setQuestion,
  updateQuestion,
  resetQuestion,
  setAnswer,
  resetAnswer,
  getResults,
  setResults,
  resetResults,
  setVote,
  resetVote,
  setComment,
  resetComment
} from './playActions'