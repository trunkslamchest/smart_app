export const fetch = {
  get: {
    users: 'http://localhost:5001/smartapp-b3d27/us-east1/users',
    // users: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/users',
    questions: 'http://localhost:5002/smartapp-b3d27/us-east1/questions'
    // questions: 'https://us-east1-smartapp-b3d27.cloudfunctions.net/questions'
  }
}

export const auth = {
  signUp: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSKeC86vFuphU91Ylbrdf9RMDO8SGam5E',
  signIn: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSKeC86vFuphU91Ylbrdf9RMDO8SGam5E'
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