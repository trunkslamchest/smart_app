import * as actionTypes from './actionTypes'

import { fetch } from '../../utility/paths'

// import {
//   authUpdateStatus
// } from './authActions'

import achievementFunctions from '../../utility/achievementFunctions'

export const storeAchievements = () => {
  return dispatch => {
    achievementFunctions('get', fetch.get.achievements)
    .then(res => {
      // dispatch(authUpdateStatus('storeAchievementsSuccess', true))
      dispatch(initStoreAchievements(res))
    })
  }
}

const initStoreAchievements = (obj) => {
  return {
    type: actionTypes.STORE_ACHIEVEMENTS,
    all: obj.achievements,
    totals: obj.totals
  }
}

export const clearAchievements = () => {
  return {
    type: actionTypes.CLEAR_ACHIEVEMENTS,
    all: null,
    totals: null
  }
}

export const updateAchievements = (obj) => {
  return {
    type: actionTypes.UPDATE_ACHIEVEMENTS,
    res: obj
  }
}