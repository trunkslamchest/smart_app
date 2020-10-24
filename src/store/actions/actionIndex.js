export {
  loading,
  login,
  logout,
  signup,
  deleteProfile,
  showModal
} from './modalActions'

export {
  authUpdateLoadingStatus,
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
  updateUserInfo,
  clearUserInfo,
  storeUserSettings,
  updateUserSettings,
  clearUserSettings,
  storeUserQuestions,
  updateUserQuestions,
  clearUserQuestions,
  updateUserPerformanceFromPlayController,
  updateUserExperienceFromPlayController,
  updateUserAchievementsFromPlayController,
  updateUserQuestionIdsFromPlayController,
  updateUserQuestionsFromPlayController,
  updateUserQuestionTotalsFromPlayController,
  updateUserVotesFromPlayController,
  updateUserCommentsFromPlayController,
  editUserComment,
  deleteUserComment,
  deleteUser,
} from './userActions'

export {
  getQuestionTotals,
  clearQuestionTotals,
  storeQuestionTotals,
  updateQuestionTotalsFromPlayController,
  getQuickQuestion,
  getDiffQuestion,
  getCatQuestion,
  getStaticQuestion,
  clearStaticQuestion,
  setStaticUserQuestion,
  clearStaticUserQuestion,
  updateQuestionStatus,
  clearQuestionStatus,
  updateStaticQuestionVotes,
  updateStaticQuestionVoteStatus,
  clearStaticQuestionVoteStatus,
  updateStaticUserVote,
  clearStaticUserVote,
  updateStaticQuestionComments,
  clearStaticUserComment,
  updateStaticQuestionCommentStatus,
  clearStaticQuestionCommentStatus,
  voteLoading,
  commentLoading,
  // clearStaticQuestionVotes
} from './questionsActions'

export {
  updateGameStatus,
  updateVoteStatus,
  updateCommentStatus,
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
  resetComment,
  editQuestionComment,
  deleteQuestionComment
} from './playActions'

export {
  storeAchievements,
  clearAchievements,
  updateAchievements
} from './achievementActions'

export {
  getUserProfile,
  clearUserProfile,
  updateUserProfileStatus,
  updateUserProfileLoadingStatus
} from './profileActions'