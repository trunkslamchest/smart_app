import * as actionTypes from './actionTypes'

// import { fetch } from '../../utility/paths'

// import achievementFunctions from '../../utility/achievementFunctions'

// export const getAchievements = () => {
//   console.log('test')
//   return dispatch => {
//     achievementFunctions('get', fetch.get.achievements)
//     .then(res => {
//       dispatch(storeAchievements(res))
//     })
//   }
// }

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