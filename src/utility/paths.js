// export const fetch = {
//   get: {
//     achievements: `${process.env.REACT_APP_LOCAL_GET_ACHIEVEMENTS}`,
//     catQuestion: `${process.env.REACT_APP_LOCAL_GET_CAT_QUESTION}`,
//     catLeaderBoards: `${process.env.REACT_APP_LOCAL_GET_CAT_LEADERBOARDS}`,
//     diffQuestion: `${process.env.REACT_APP_LOCAL_GET_DIFF_QUESTION}`,
//     overallLeaderBoards: `${process.env.REACT_APP_LOCAL_GET_OVERALL_LEADERBOARDS}`,
//     questionResults: `${process.env.REACT_APP_LOCAL_GET_QUESTION_RESULTS}`,
//     questions: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS}`,
//     questionsTotals: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS_TOTALS}`,
//     quickQuestion: `${process.env.REACT_APP_LOCAL_GET_QUICK_QUESTION}`,
//     smarts: `${process.env.REACT_APP_LOCAL_GET_SMARTS}`,
//     staticQuestion: `${process.env.REACT_APP_LOCAL_GET_STATIC_QUESTION}`,
//     user: `${process.env.REACT_APP_LOCAL_GET_USER}`,
//     users: `${process.env.REACT_APP_LOCAL_GET_USERS}`
//   },
//   post: {
//     user: `${process.env.REACT_APP_LOCAL_ADD_USER}`,
//     userProfile: `${process.env.REACT_APP_LOCAL_GET_USER_PROFILE}`
//   },
//   patch: {
//     editQuestionComment: `${process.env.REACT_APP_LOCAL_EDIT_QUESTION_COMMENT}`,
//     editUserComment: `${process.env.REACT_APP_LOCAL_EDIT_USER_COMMENT}`,
//     questionComment: `${process.env.REACT_APP_LOCAL_PATCH_QUESTION_COMMENT}`,
//     questionVote: `${process.env.REACT_APP_LOCAL_PATCH_QUESTION_VOTE}`,
//     user: `${process.env.REACT_APP_LOCAL_UPDATE_USER}`,
//     userSettings: `${process.env.REACT_APP_LOCAL_UPDATE_USER_SETTINGS}`,
//     userLoginTime: `${process.env.REACT_APP_LOCAL_UPDATE_USER_LOGIN_TIME}`
//   },
//   delete: {
//     questionComment: `${process.env.REACT_APP_LOCAL_DELETE_QUESTION_COMMENT}`,
//     user: `${process.env.REACT_APP_LOCAL_DELETE_USER}`,
//     userComment: `${process.env.REACT_APP_LOCAL_DELETE_USER_COMMENT}`
//   }
// }

// export const check = {
//   email: `${process.env.REACT_APP_LOCAL_CHECK_EMAIL}`,
//   user_name: `${process.env.REACT_APP_LOCAL_CHECK_USER_NAME}`
// }

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const fetch = {
  get: {
    achievements: `${process.env.REACT_APP_DEPLOY_GET_ACHIEVEMENTS}`,
    catLeaderBoards: `${process.env.REACT_APP_DEPLOY_GET_CAT_LEADERBOARDS}`,
    catQuestion: `${process.env.REACT_APP_DEPLOY_GET_CAT_QUESTION}`,
    diffQuestion: `${process.env.REACT_APP_DEPLOY_GET_DIFF_QUESTION}`,
    overallLeaderBoards: `${process.env.REACT_APP_DEPLOY_GET_OVERALL_LEADERBOARDS}`,
    questions: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS}`,
    questionResults: `${process.env.REACT_APP_DEPLOY_GET_QUESTION_RESULTS}`,
    questionsTotals: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS_TOTALS}`,
    quickQuestion: `${process.env.REACT_APP_DEPLOY_GET_QUICK_QUESTION}`,
    smarts: `${process.env.REACT_APP_DEPLOY_GET_SMARTS}`,
    staticQuestion: `${process.env.REACT_APP_DEPLOY_GET_STATIC_QUESTION}`,
    user: `${process.env.REACT_APP_DEPLOY_GET_USER}`,
    users: `${process.env.REACT_APP_DEPLOY_GET_USERS}`

  },
  post: {
    user: `${process.env.REACT_APP_DEPLOY_ADD_USER}`,
    userProfile: `${process.env.REACT_APP_DEPLOY_GET_USER_PROFILE}`
  },
  patch: {
    editQuestionComment: `${process.env.REACT_APP_DEPLOY_EDIT_QUESTION_COMMENT}`,
    editUserComment: `${process.env.REACT_APP_DEPLOY_EDIT_USER_COMMENT}`,
    questionComment: `${process.env.REACT_APP_DEPLOY_PATCH_QUESTION_COMMENT}`,
    questionVote: `${process.env.REACT_APP_DEPLOY_PATCH_QUESTION_VOTE}`,
    user: `${process.env.REACT_APP_DEPLOY_UPDATE_USER}`,
    userLoginTime: `${process.env.REACT_APP_DEPLOY_UPDATE_USER_LOGIN_TIME}`,
    userSettings: `${process.env.REACT_APP_DEPLOY_UPDATE_USER_SETTINGS}`
  },
  delete: {
    questionComment: `${process.env.REACT_APP_DEPLOY_DELETE_QUESTION_COMMENT}`,
    user: `${process.env.REACT_APP_DEPLOY_DELETE_USER}`,
    userComment: `${process.env.REACT_APP_DEPLOY_DELETE_USER_COMMENT}`
  }
}

export const check = {
  email: `${process.env.REACT_APP_DEPLOY_CHECK_EMAIL}`,
  user_name: `${process.env.REACT_APP_DEPLOY_CHECK_USER_NAME}`
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export const routes = {
  root: '/',
  home: '/testSub',

  dashboard: '/testSub/dashboard',
  dashboard_achievements: '/testSub/dashboard/achievements',
  dashboard_answers: '/testSub/dashboard/answers',
  dashboard_comments: '/testSub/dashboard/comments',
  dashboard_profile: '/testSub/dashboard/profile',
  dashboard_profile_edit: '/testSub/dashboard/profile/edit',
  dashboard_settings: '/testSub/dashboard/settings',
  dashboard_stats: '/testSub/dashboard/stats',
  dashboard_test: '/testSub/dashboard/test',
  dashboard_votes: '/testSub/dashboard/votes',

  leader_boards: '/testSub/leaderBoards',
  static_results: '/testSub/results',
  user_profile: '/testSub/users',

  play: '/testSub/play',
  quick_play: '/testSub/play/quick',
  quick_question: '/testSub/play/quick/question',
  by_diff: '/testSub/play/difficulty',
  by_diff_select: '/testSub/play/difficulty/select',
  by_diff_question: '/testSub/play/difficulty/question',
  by_cat: '/testSub/play/category',
  by_cat_select: '/testSub/play/category/select',
  by_cat_question: '/testSub/play/category/question',

  disclaimer: '/testSub/disclaimer',
  license: '/testSub/license',
  privacy: '/testSub/privacy',
  tos: '/testSub/terms_of_service'
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// export const routes = {
  // root: '/',
  // home: '/smartapp',

  // dashboard: '/smartapp/dashboard',
  // dashboard_achievements: '/smartapp/dashboard/achievements',
  // dashboard_answers: '/smartapp/dashboard/answers',
  // dashboard_comments: '/smartapp/dashboard/comments',
  // dashboard_profile: '/smartapp/dashboard/profile',
  // dashboard_profile_edit: '/smartapp/dashboard/profile/edit',
  // dashboard_settings: '/smartapp/dashboard/settings',
  // dashboard_stats: '/smartapp/dashboard/stats',
  // dashboard_test: '/smartapp/dashboard/test',
  // dashboard_votes: '/smartapp/dashboard/votes',

  // leader_boards: '/smartapp/leaderBoards',
  // static_results: '/smartapp/results',
  // user_profile: '/smartapp/users',

  // play: '/smartapp/play',
  // quick_play: '/smartapp/play/quick',
  // quick_question: '/smartapp/play/quick/question',
  // by_diff: '/smartapp/play/difficulty',
  // by_diff_select: '/smartapp/play/difficulty/select',
  // by_diff_question: '/smartapp/play/difficulty/question',
  // by_cat: '/smartapp/play/category',
  // by_cat_select: '/smartapp/play/category/select',
  // by_cat_question: '/smartapp/play/category/question',

  // disclaimer: '/smartapp/disclamier',
  // license: '/smartapp/license',
  // privacy: '/smartapp/privacy',
  // tos: '/smartapp/terms_of_service'
// }