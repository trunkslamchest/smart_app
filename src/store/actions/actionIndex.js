export {
  increment,
  decrement,
  add,
  subtract,
  reset
} from './devTestActions'

export {
  save,
  remove
} from './storeActions'

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
  authLoading,
  authSuccess,
  authFail,
  authLogIn,
  authLogOut,
  authRefresh,
  authDelete,
  authTimeout,
  authCert,
  // setAuthRedirectPath,
  // checkAuthState,
  // checkAuthTimeout,
} from './authActions'

export {
  logInUser,
  // logOut,
  // logoutSuccess,
} from './logInActions'

export {
  signUpUser
} from './signUpActions'

export {
  storeUserInfo,
  clearUserInfo,
  storeUserQuestions,
  clearUserQuestions,
  updateUserInfo,
  updateUserQuestions,
  updateUserQuestionIds,
  deleteUser
  // updateUser
} from './userActions'

export {
  getQuestionTotals,
  storeQuestionTotals,
  getQuickQuestion,
  getDiffQuestion,
  getCatQuestion,

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