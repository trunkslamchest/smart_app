export const fetch = {
  get: {
    user: `${process.env.REACT_APP_LOCAL_GET_USER}`,
    users: `${process.env.REACT_APP_LOCAL_GET_USERS}`,
    questions: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS}`,
    questionsTotals: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS_TOTALS}`,
    quickQuestion: `${process.env.REACT_APP_LOCAL_GET_QUICK_QUESTION}`,
    diffQuestion: `${process.env.REACT_APP_LOCAL_GET_DIFF_QUESTION}`,
    catQuestion: `${process.env.REACT_APP_LOCAL_GET_CAT_QUESTION}`,
    staticQuestion: `${process.env.REACT_APP_LOCAL_GET_STATIC_QUESTION}`,
    questionResults: `${process.env.REACT_APP_LOCAL_GET_QUESTION_RESULTS}`,
    achievements: `${process.env.REACT_APP_LOCAL_GET_ACHIEVEMENTS}`,
    overallLeaderBoards: `${process.env.REACT_APP_LOCAL_GET_OVERALL_LEADERBOARDS}`,
    catLeaderBoards: `${process.env.REACT_APP_LOCAL_GET_CAT_LEADERBOARDS}`
  },
  post: {
    user: `${process.env.REACT_APP_LOCAL_ADD_USER}`,
    userProfile: `${process.env.REACT_APP_LOCAL_GET_USER_PROFILE}`,

  },
  patch: {
    user: `${process.env.REACT_APP_LOCAL_UPDATE_USER}`,
    userSettings: `${process.env.REACT_APP_LOCAL_UPDATE_USER_SETTINGS}`,
    userLoginTime: `${process.env.REACT_APP_LOCAL_UPDATE_USER_LOGIN_TIME}`,
    editUserComment: `${process.env.REACT_APP_LOCAL_EDIT_USER_COMMENT}`,
    editQuestionComment: `${process.env.REACT_APP_LOCAL_EDIT_QUESTION_COMMENT}`,
    questionVote: `${process.env.REACT_APP_LOCAL_PATCH_QUESTION_VOTE}`,
    questionComment: `${process.env.REACT_APP_LOCAL_PATCH_QUESTION_COMMENT}`,
  },
  delete: {
    user: `${process.env.REACT_APP_LOCAL_DELETE_USER}`,
    userComment: `${process.env.REACT_APP_LOCAL_DELETE_USER_COMMENT}`,
    questionComment: `${process.env.REACT_APP_LOCAL_DELETE_QUESTION_COMMENT}`
  }
}

export const check = {
  user_name: `${process.env.REACT_APP_LOCAL_CHECK_USER_NAME}`,
  email: `${process.env.REACT_APP_LOCAL_CHECK_EMAIL}`
}

// export const fetch = {
//   get: {
//     user: `${process.env.REACT_APP_DEPLOY_GET_USER}`,
//     users: `${process.env.REACT_APP_DEPLOY_GET_USERS}`,
//     questions: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS}`,
//     questionsTotals: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS_TOTALS}`,
//     quickQuestion: `${process.env.REACT_APP_DEPLOY_GET_QUICK_QUESTION}`,
//     diffQuestion: `${process.env.REACT_APP_DEPLOY_GET_DIFF_QUESTION}`,
//     catQuestion: `${process.env.REACT_APP_DEPLOY_GET_CAT_QUESTION}`,
//     staticQuestion: `${process.env.REACT_APP_DEPLOY_GET_STATIC_QUESTION}`,
//     questionResults: `${process.env.REACT_APP_DEPLOY_GET_QUESTION_RESULTS}`,
//     achievements: `${process.env.REACT_APP_DEPLOY_GET_ACHIEVEMENTS}`,
//     overallLeaderBoards: `${process.env.REACT_APP_DEPLOY_GET_OVERALL_LEADERBOARDS}`,
//     catLeaderBoards: `${process.env.REACT_APP_DEPLOY_GET_CAT_LEADERBOARDS}`

//   },
//   post: {
//     user: `${process.env.REACT_APP_DEPLOY_ADD_USER}`,
//     userProfile: `${process.env.REACT_APP_DEPLOY_GET_USER_PROFILE}`,
//   },
//   patch: {
//     user: `${process.env.REACT_APP_DEPLOY_UPDATE_USER}`,
//     userSettings: `${process.env.REACT_APP_DEPLOY_UPDATE_USER_SETTINGS}`,
//     userLoginTime: `${process.env.REACT_APP_DEPLOY_UPDATE_USER_LOGIN_TIME}`,
//     editUserComment: `${process.env.REACT_APP_DEPLOY_EDIT_USER_COMMENT}`,
//     editQuestionComment: `${process.env.REACT_APP_DEPLOY_EDIT_QUESTION_COMMENT}`,
//     questionVote: `${process.env.REACT_APP_DEPLOY_PATCH_QUESTION_VOTE}`,
//     questionComment: `${process.env.REACT_APP_DEPLOY_PATCH_QUESTION_COMMENT}`
//   },
//   delete: {
//     user: `${process.env.REACT_APP_DEPLOY_DELETE_USER}`,
//     userComment: `${process.env.REACT_APP_DEPLOY_DELETE_USER_COMMENT}`,
//     questionComment: `${process.env.REACT_APP_DEPLOY_DELETE_QUESTION_COMMENT}`
//   }
// }

// export const check = {
//   user_name: `${process.env.REACT_APP_DEPLOY_CHECK_USER_NAME}`,
//   email: `${process.env.REACT_APP_DEPLOY_CHECK_EMAIL}`
// }

export const routes = {
  root: '/',
  home: '/testSub',

  dashboard: '/testSub/dashboard',
  dashboard_profile: '/testSub/dashboard/profile',
  dashboard_profile_edit: '/testSub/dashboard/profile/edit',
  dashboard_stats: '/testSub/dashboard/stats',
  dashboard_votes: '/testSub/dashboard/votes',
  dashboard_comments: '/testSub/dashboard/comments',
  dashboard_answers: '/testSub/dashboard/answers',
  dashboard_achievements: '/testSub/dashboard/achievements',
  dashboard_settings: '/testSub/dashboard/settings',
  dashboard_test: '/testSub/dashboard/test',

  user_profile: '/testSub/users',
  static_results: '/testSub/results',
  leader_boards: '/testSub/leaderBoards',

  play: '/testSub/play',
  quick_play: '/testSub/play/quick',
  quick_question: '/testSub/play/quick/question',
  by_diff: '/testSub/play/difficulty',
  by_diff_select: '/testSub/play/difficulty/select',
  by_diff_question: '/testSub/play/difficulty/question',
  by_cat: '/testSub/play/category',
  by_cat_select: '/testSub/play/category/select',
  by_cat_question: '/testSub/play/category/question',

  tos: '/testSub/terms_of_service',
  privacy: '/testSub/privacy',
  disclaimer: '/testSub/disclaimer',
  license: '/testSub/license'

}

// export const routes = {
  // root: '/',
  // home: '/smartapp',

  // dashboard: '/smartapp/dashboard',
  // dashboard_profile: '/smartapp/dashboard/profile',
  // dashboard_profile_edit: '/smartapp/dashboard/profile/edit',
  // dashboard_stats: '/smartapp/dashboard/stats',
  // dashboard_votes: '/smartapp/dashboard/votes',
  // dashboard_comments: '/smartapp/dashboard/comments',
  // dashboard_test: '/smartapp/dashboard/test',
  // dashboard_answers: '/smartapp/dashboard/answers',
  // dashboard_achievements: '/smartapp/dashboard/achievements',
  // dashboard_settings: '/smartapp/dashboard/settings',

  // user_profile: '/smartapp/users',
  // static_results: '/smartapp/results',
  // leader_boards: '/smartapp/leaderBoards',

  // play: '/smartapp/play',
  // quick_play: '/smartapp/play/quick',
  // quick_question: '/smartapp/play/quick/question',
  // by_diff: '/smartapp/play/difficulty',
  // by_diff_select: '/smartapp/play/difficulty/select',
  // by_diff_question: '/smartapp/play/difficulty/question',
  // by_cat: '/smartapp/play/category',
  // by_cat_select: '/smartapp/play/category/select',
  // by_cat_question: '/smartapp/play/category/question',

  // tos: '/smartapp/terms_of_service',
  // privacy: '/smartapp/privacy',
  // disclaimer: '/smartapp/disclamier',
  // license: '/smartapp/license'
// }