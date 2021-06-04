import * as actionTypes from './actionTypes'

export const storeAchievements = (obj) => {
  return {
    type: actionTypes.STORE_ACHIEVEMENTS,
    all: obj.list,
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
    all: obj.all,
    totals: obj.totals
  }
}