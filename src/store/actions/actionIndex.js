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
  authSuccess,
  authFail,
  authLogOut,
  authRefresh,
  authDelete,
  authTimeout,
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
  deleteUser
  // updateUser
} from './userActions'

export {
  getQuestionTotals,
  storeQuestionTotals

} from './questionsActions'