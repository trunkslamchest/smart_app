export {
  login,
  logout,
  signup,
  deleteProfile,
  showModal,
} from './modalActions'

export {
  authUpdateStatus,
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
  authValid,
  authClearState,
  clearAuthCreds,
  clearAuthType,
  clearAuthStatus,
  clearAuthErrors,
  setAuthType
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
  updateUserCommentsFromPlayController,
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