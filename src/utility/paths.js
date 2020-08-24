export const fetch = {
  get: {
    user: `${process.env.REACT_APP_LOCAL_GET_USER}`,
    // user: `${process.env.REACT_APP_DEPLOY_GET_USER}`,
    users: `${process.env.REACT_APP_LOCAL_GET_USERS}`,
    // users: `${process.env.REACT_APP_DEPLOY_GET_USERS}`,
    questions: `${process.env.REACT_APP_LOCAL_GET_QUESTIONS}`
    // questions: `${process.env.REACT_APP_DEPLOY_GET_QUESTIONS}`
  },
  post: {
    user: `${process.env.REACT_APP_LOCAL_ADD_USER}`
    // user: `${process.env.REACT_APP_DEPLOY_ADD_USER}`
  }
}

export const auth = {
  signIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
  signUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
  refreshToken: `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_API_KEY}`
}

export const routes = {
  root: '/',
  home: '/testSub',
  dashboard: '/testSub/dashboard',
  dashboard_profile: '/testSub/dashboard/profile',
  dashboard_profile_edit: '/testSub/dashboard/profile/edit',
  dashboard_profile_delete: '/testSub/dashboard/profile/delete',
  dashboard_test: '/testSub/dashboard/test',
  tos: '/testSub/terms_of_service',
  privacy: '/testSub/privacy',
  disclaimer: '/testSub/disclamier',
  devTest: '/testSub/devTest'
  // home: '/smartapp',
  // dashboard: '/smartapp/dashboard',
  // dashboard_profile: '/smartapp/dashboard/profile',
  // dashboard_profile_edit: '/smartapp/dashboard/profile/edit',
  // dashboard_profile_delete: '/smartapp/dashboard/profile/delete',
  // dashboard_test: '/smartapp/dashboard/test',
  // tos: '/smartapp/terms_of_service',
  // privacy: '/smartapp/privacy',
  // disclaimer: '/smartapp/disclamier',
  // devTest: '/smartapp/devTest'
}