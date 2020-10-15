import * as actionTypes from '../actions/actionTypes'

const initialState = {
  all: null,
  totals: null
}

const storeAchievements = (currentState, action) => {
  return {
    ...currentState,
    all: action.all,
    totals: action.totals
  }
}

const clearAchievements = (currentState, action) => {
  return {
    ...currentState,
    all: action.all,
    totals: action.totals
  }
}

const achievementReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_ACHIEVEMENTS: return storeAchievements(currentState, action);
    case actionTypes.CLEAR_ACHIEVEMENTS: return clearAchievements(currentState, action);
    default: return currentState;
  }
}

export default achievementReducer