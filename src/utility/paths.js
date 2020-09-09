export const fetch = {
  get: {
    user: `${process.env.REACT_APP_LOCAL_GET_USER}`,
    // user: `${process.env.REACT_APP_DEPLOY_GET_USER}`,
    users: `${process.env.REACT_APP_LOCAL_GET_USERS}`,
    // users: `${process.env.REACT_APP_DEPLOY_GET_USERS}`,
    questions: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS}`,
    // questions: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS}`,
    questionsTotals: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS_TOTALS}`,
    // questionsTotals: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS_TOTALS}`,
    quickQuestion: `${process.env.REACT_APP_LOCAL_GET_QUICK_QUESTION}`,
    // quickQuestion: `${process.env.REACT_APP_DEPLOY_GET_QUICK_QUESTION}`,
    questionResults: `${process.env.REACT_APP_LOCAL_GET_QUESTION_RESULTS}`
    // questionResults: `${process.env.REACT_APP_DEPLOY_GET_QUESTION_RESULTS}`
  },
  post: {
    user: `${process.env.REACT_APP_LOCAL_ADD_USER}`
    // user: `${process.env.REACT_APP_DEPLOY_ADD_USER}`
  },
  patch: {
    user: `${process.env.REACT_APP_LOCAL_UPDATE_USER}`,
    // user: `${process.env.REACT_APP_DEPLOY_UPDATE_USER}`,
    questionVote: `${process.env.REACT_APP_LOCAL_PATCH_QUESTION_VOTE}`
    // questionVote: `${process.env.REACT_APP_DEPLOY_PATCH_QUESTION_VOTE}`
  },
  delete: {
    user: `${process.env.REACT_APP_LOCAL_DELETE_USER}`
    // user: `${process.env.REACT_APP_DEPLOY_DELETE_USER}`
  }
}

export const auth = {
  signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
  signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
  delete: `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
  refreshToken: `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
}

export const routes = {
  root: '/',
  home: '/testSub',
  dashboard: '/testSub/dashboard',
  dashboard_profile: '/testSub/dashboard/profile',
  dashboard_profile_edit: '/testSub/dashboard/profile/edit',
  dashboard_stats: '/testSub/dashboard/stats',
  dashboard_votes: '/testSub/dashboard/votes',
  dashboard_comments: '/testSub/dashboard/comments',
  dashboard_test: '/testSub/dashboard/test',
  play: '/testSub/play',
  quick_play: '/testSub/play/quick',
  quick_question: '/testSub/play/quick/question',
  by_diff: '/testSub/play/difficulties',
  by_cat: '/testSub/play/categories',
  tos: '/testSub/terms_of_service',
  privacy: '/testSub/privacy',
  disclaimer: '/testSub/disclamier',
  devTest: '/testSub/devTest'
  // home: '/smartapp',
  // dashboard: '/smartapp/dashboard',
  // dashboard_profile: '/smartapp/dashboard/profile',
  // dashboard_profile_edit: '/smartapp/dashboard/profile/edit',
  // dashboard_stats: '/smartapp/dashboard/stats',
  // dashboard_votes: '/smartapp/dashboard/votes',
  // dashboard_comments: '/smartapp/dashboard/comments',
  // dashboard_test: '/smartapp/dashboard/test',
  // play: '/smartapp/play',
  // quick_play: '/smartapp/play/quick_play',
  // quick_question: '/smartapp/play/quick/question',
  // by_diff: '/smartapp/play/difficulties',
  // by_cat: '/smartapp/play/categories',
  // tos: '/smartapp/terms_of_service',
  // privacy: '/smartapp/privacy',
  // disclaimer: '/smartapp/disclamier',
  // devTest: '/smartapp/devTest'
}